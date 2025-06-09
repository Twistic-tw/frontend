<template>
  <div>
    <!-- Modal fullscreen -->
    <transition name="fade-scale">
      <div
        v-if="showFullscreen"
        class="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center"
      >
        <div
          class="bg-white w-screen h-screen p-6 overflow-auto relative rounded-lg shadow-xl"
          :style="{
            marginTop: '8em',
            maxWidth: '794px',
            maxHeight: 'calc(100vh - 4rem)',
            width: '100%',
            height: 'auto',
          }"
        >
          <!-- Vista completa del catálogo -->
          <div id="pdf-content" class="origin-top-left w-full h-fit-content bg-gray-100 no-padding">
            <!-- Portada -->
            <div v-if="coverUrl" class="a4-page no-padding">
              <img
                :src="coverUrl"
                alt="Cover Image"
                class="a4-image-content no-radius w-full h-full object-cover"
              />
            </div>

            <!-- Segunda portada -->
            <div v-if="secondUrl" class="a4-page no-padding">
              <img
                :src="secondUrl"
                alt="Second Cover"
                class="a4-image-content no-radius w-full h-full object-contain"
              />
            </div>

            <!-- Páginas con contenido estructurado -->
            <div
              v-for="(chunk, pageIndex) in previewRows"
              :key="'page-' + pageIndex"
              class="a4-page"
              :style="{
                position: 'relative',
                padding: '1rem',
                backgroundImage: backgroundUrl ? `url(${backgroundUrl})` : 'none',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
              }"
            >
              <!-- Cabecera -->
              <div v-if="headerUrl" class="header-image-container">
                <img :src="headerUrl" alt="Header Image" class="header-image" />
              </div>

              <!-- Título catálogo -->
              <div
                class="catalog-title-section"
                :style="{ backgroundColor: titleBackground, color: titleText }"
              >
                <h1
                  :style="{ fontFamily: titleSettings.font, textAlign: titleSettings.align }"
                  class="catalog-title"
                >
                  {{ templateName }}
                </h1>
              </div>

              <!-- Descripción corta -->
              <div v-if="descriptions.short" class="short-description">
                <p :style="{ color: shortDescriptionColor || '#000' }">{{ descriptions.short || "Vacio"}}</p>
              </div>

              <!-- Contenedor con tabla a la izquierda y imágenes a la derecha -->
              <div class="content-main">
                <!-- Tabla -->
                <div class="data-table-container" :style="{ fontSize: fontSizeForChunk(chunk) }">
                  <div
                    class="table-header"
                    :style="[headerStyle, { fontSize: fontSizeForChunk(chunk) }]"
                  >
                    <div
                      v-for="(key, i) in activeFieldNames"
                      :key="'header-' + i"
                      class="table-header-cell"
                      :style="[
                        cellStyle,
                        {
                          maxWidth: '250px',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          fontSize: fontSizeForChunk(chunk),
                        },
                      ]"
                    >
                      {{ key }}
                    </div>
                  </div>

                  <div
                    v-for="(row, ri) in chunk"
                    :key="'row-' + pageIndex + '-' + ri"
                    class="table-row"
                    :style="[rowStyle(ri), { fontSize: fontSizeForChunk(chunk) }]"
                  >
                    <div
                      v-for="(key, i) in activeFieldNames"
                      :key="'cell-' + pageIndex + '-' + ri + '-' + i"
                      class="table-cell"
                      :style="[cellStyle, { fontSize: fontSizeForChunk(chunk) }]"
                    >
                      {{ row[key] }}
                    </div>
                  </div>
                </div>

                <!-- Imágenes destacadas -->
                <div class="featured-images">
                  <div
                    v-for="(key, index) in ['image_one', 'image_two', 'image_three', 'image_four']"
                    :key="key"
                    class="featured-image-item placeholder"
                  >
                    <div class="image-placeholder">
                      {{ $t('featured', { number: index + 1 }) }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Descripción larga -->
              <div v-if="descriptions.long" class="long-description">
                <p :style="{ color: longDescriptionColor || '#000' }">{{ descriptions.long  || "Vacio"}}</p>
              </div>

              <!-- Footer y número de página -->
              <div class="footer-bar" :style="footerStyle">
                <div class="footer-text">{{ descriptions.footer  || "Vacio"}}</div>
                <div class="page-number">{{ pageIndex + 1 }}</div>
              </div>
            </div>
          </div>

          <!-- Botón flotante abajo -->
          <div class="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
            <button
              @click="$emit('close')"
              class="bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-900 transition"
              title="Cerrar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">

import { ref, watch } from 'vue'

const props = defineProps<{
  previewRows: Record<string, string>[][],
  activeFieldNames: string[],
  headerStyle: Record<string, string>,
  templateName: string,
  shortDescriptionStyle: Record<string, string>
  longDescriptionStyle: Record<string, string>
  footerStyle: Record<string, string>,
  rowsPerPage: number,
  rowStyle: (index: number) => Record<string, string>,
  cellStyle: Record<string, string>,
  headerUrl?: string,
  footerUrl?: string,
  coverUrl?: string,
  secondUrl?: string,
  backgroundUrl?: string,
  show: boolean,
  featuredImages: {
    image_one: File | null,
    image_two: File | null,
    image_three: File | null,
    image_four: File | null
  },
  featuredDescriptions: {
    desc_one: string,
    desc_two: string,
    desc_three: string,
    desc_four: string
  },
  titleBackground: string,
  titleText: string,
  titleSettings: {
    font: string,
    align: 'left' | 'center' | 'right',
    size: string,
    fieldFont: string,
    fieldSize: string,
    fieldAlign: 'left' | 'center' | 'right'
  },
  descriptions: {
    short: string,
    long: string,
    footer: string
  },
  shortDescriptionColor?: string,
  longDescriptionColor?: string
}>()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emit = defineEmits<{
  (e: 'close'): void
}>()

const showFullscreen = ref(false)

watch(
  () => props.show,
  (value) => {
    showFullscreen.value = value
  }
)

const fontSizeForChunk = (chunk: Record<string, string>[]) => {
  const baseSize = 8
  const maxRows = 18
  const rowCount = chunk.length
  if (rowCount <= maxRows) return `${baseSize}px`
  return `${Math.max(8, baseSize - (rowCount - maxRows) * 0.5)}px`
}
</script>

<style scoped>
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.25s ease;
}
.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
.fade-scale-enter-to,
.fade-scale-leave-from {
  opacity: 1;
  transform: scale(1);
}

.a4-page {
  height: 1123px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-sizing: border-box;
  margin-bottom: 2rem;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 0 !important;
}

.no-padding {
  padding: 0 !important;
}

.a4-image-content {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.no-radius {
  border-radius: 0;
}

.catalog-title-section {
  width: 100%;
  text-align: center;
  margin-bottom: 1rem;
}

.catalog-title {
  font-size: 24px;
  padding: 0.2rem 0 0.2rem 1em;
  font-weight: bold;
}

.header-image-container {
  height: 120px;
  overflow: hidden;
}

.header-image {
  width: 100%;
  height: 120px;
  object-fit: cover;
}

.content-main {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.short-description {
  margin-bottom: 1rem;
  padding: 0.5rem 0.5rem 0.5rem 1rem;
  width: 100%;
  font-size: 12px;
}

.data-table-container {
  flex: 3;
  padding: 0.5rem;
  max-height: 700px;
  display: flex;
  flex-direction: column;
}

.table-header {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  font-weight: bold;
  text-align: center;
  background-color: #5c6ac4;
  color: white;
  padding: 0.3rem;
  border-radius: 0.3rem 0.3rem 0 0;
}

.table-header-cell {
  padding: 0.5rem;
  border-right: 1px solid rgba(255, 255, 255, 0.5);
}

.table-header-cell:last-child {
  border-right: none;
}

.table-row {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
}

.table-cell {
  padding: 0.4rem;
  text-align: center;
  word-wrap: break-word;
  white-space: normal;
}

.table-cell:last-child {
  border-right: none;
}

.featured-images {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  max-height: 700px;
}

.featured-image-item.placeholder {
  border: 1px solid #ccc;
  border-radius: 0.3rem;
  margin: 2rem 0;
  text-align: center;
  color: #999;
  font-style: italic;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-placeholder {
  user-select: none;
}

.long-description {
  padding: 0.5rem;
  margin-bottom: 1rem;
  max-height: 100px;
  white-space: pre-wrap;
  font-size: 12px;
}

.footer-bar {
  display: flex;
  justify-content: space-between;
  padding-top: 0.5rem;
  font-size: 0.8rem;
  color: #666;
}

.footer-text {
  flex-grow: 1;
  text-align: left;
}

.page-number {
  flex-shrink: 0;
  text-align: right;
}
</style>
