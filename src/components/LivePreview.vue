<script setup lang="ts">
import { type Ref, ref } from 'vue'
import LivePreviewModal from './LivePreviewModal.vue'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
  rowsPerPage: number
  previewRef: Ref<HTMLElement | null>
  toggleFullscreen: () => void
  images: {
    cover: File | null
    second: File | null
    header: File | null
    background: File | null
    footer: File | null
  }
  featuredImages: {
    image_one: File | null
    image_two: File | null
    image_three: File | null
    image_four: File | null
  }
  featuredDescriptions: {
    desc_one: string
    desc_two: string
    desc_three: string
    desc_four: string
  }
  coverUrl: string
  secondUrl: string
  headerUrl: string
  templateName: string
  backgroundUrl: string
  footerUrl: string
  previewRows: Record<string, string>[][]
  showBackground: (index: number) => boolean
  activeFieldNames: string[]
  headerStyle: Record<string, string>
  rowStyle: (index: number) => Record<string, string>
  cellStyle: Record<string, string>
  shortDescriptionStyle: Record<string, string>
  longDescriptionStyle: Record<string, string>
  footerStyle: Record<string, string>
  titleBackground: string
  titleText: string
  titleSettings: {
    font: string
    align: 'left' | 'center' | 'right'
    size: string
    fieldFont: string
    fieldSize: string
    fieldAlign: 'left' | 'center' | 'right'
  }
  model: {
    short: string
    long: string
    footer: string
  }
}>()

const showFullscreen = ref(false)

// Computed para tamaño de fuente basado en filas del chunk actual
const fontSizeForChunk = (chunk: Record<string, string>[]) => {
  const baseSize = 8 // px base
  const maxRows = 18
  const rowCount = chunk.length
  if (rowCount <= maxRows) return `${baseSize}px`
  // Reducir tamaño hasta un mínimo de 8px
  const size = Math.max(8, baseSize - (rowCount - maxRows) * 0.5)
  return `${size}px`
}
</script>

<template>
  <div
    class="w-full bg-white rounded-2xl shadow-lg p-6 border border-gray-200 sticky top-[100px] h-[1123px] overflow-y-scroll"
    style="position: sticky; top: 100px; height: fit-content"
  >
    <h2 class="text-2xl font-semibold text-gray-800 mb-3">
      {{ $t('title_livepreview') }}
      <button
        @click="showFullscreen = true"
        class="absolute top-0 right-0 p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition z-10"
        title="Fullscreen"
        style="margin: 0.5em"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8 3H5a2 2 0 00-2 2v3m0 8v3a2 2 0 002 2h3m8-18h3a2 2 0 012 2v3m0 8v3a2 2 0 01-2 2h-3"
          />
        </svg>
      </button>
    </h2>

    <LivePreviewModal
      :show="showFullscreen"
      :previewRows="previewRows"
      :activeFieldNames="activeFieldNames"
      :headerStyle="headerStyle"
      :templateName="templateName"
      :titleBackground="titleBackground"
      :titleText="titleText"
      :titleSettings="titleSettings"
      :rowStyle="rowStyle"
      :cellStyle="cellStyle"
      :shortDescriptionStyle="shortDescriptionStyle"
      :longDescriptionStyle="longDescriptionStyle"
      :footerStyle="footerStyle"
      :headerUrl="headerUrl"
      :footerUrl="footerUrl"
      :coverUrl="coverUrl"
      :secondUrl="secondUrl"
      :backgroundUrl="backgroundUrl"
      :featuredImages="featuredImages"
      :featuredDescriptions="featuredDescriptions"
      :model="model"
      :rowsPerPage="rowsPerPage"
      @close="showFullscreen = false"
    />

    <div id="pdf-content" ref="previewRef" class="pdf-container">
      <!-- Portada -->
      <div v-if="images.cover" class="a4-page">
        <img :src="coverUrl" alt="Cover Image" class="a4-image-content no-radius" />
      </div>

      <!-- Segunda portada -->
      <div v-if="images.second" class="a4-page">
        <img :src="secondUrl" alt="Second Cover" class="a4-image-content no-radius" />
      </div>

      <!-- Descripción corta -->
      <div v-if="model.short" class="a4-page p-6" :style="shortDescriptionStyle">
        <p>{{ model.short }}</p>
      </div>

      <!-- Descripción larga -->
      <div v-if="model.long" class="a4-page p-6" :style="longDescriptionStyle">
        <p style="white-space: pre-wrap">{{ model.long }}</p>
      </div>

      <!-- Páginas de contenido con tabla e imágenes destacadas a la derecha -->
      <div
        v-for="(chunk, index) in previewRows"
        :key="'page-' + index"
        class="a4-page flex"
        :style="{
          backgroundImage: showBackground(index) ? `url(${backgroundUrl})` : 'none',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }"
      >
        <div class="content-left flex-grow flex flex-col">
          <!-- Cabecera -->
          <div v-if="images.header" style="height: 120px; overflow: hidden">
            <img
              :src="headerUrl"
              alt="Header Image"
              class="w-full object-cover rounded-t-lg"
              style="height: 120px"
            />
          </div>
          <div
            class="text-center mb-4 py-2 px-4"
            :style="{
              backgroundColor: titleBackground,
              color: titleText,
            }"
          >
            <h1
              class="text-2xl font-bold tracking-wide"
              :style="{
                fontFamily: titleSettings.font,
                textAlign: titleSettings.align,
                paddingLeft: '1em',
              }"
            >
              {{ templateName }}
            </h1>
          </div>

          <!-- Tabla con padding para dejar espacio al footer -->
          <div
            class="w-full h-full text-sm border border-transparent rounded-[8px] shadow-sm p-6 table-preview-shadow overflow-auto"
            style="padding-bottom: 60px"
          >
            <div
              class="grid font-medium"
              :style="[headerStyle, { fontSize: fontSizeForChunk(chunk) }]"
            >
              <div
                v-for="(key, i) in activeFieldNames"
                :key="'header-' + i"
                class="px-4 py-2 text-left border-r border-indigo-500 last:border-r-0"
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
              :key="'row-' + index + '-' + ri"
              class="grid"
              :style="rowStyle(ri)"
            >
              <div
                v-for="(key, i) in activeFieldNames"
                :key="'cell-' + index + '-' + ri + '-' + i"
                class="px-4 py-2 last:border-r-0"
                :style="[cellStyle, { fontSize: fontSizeForChunk(chunk) }]"
              >
                {{ row[key] }}
              </div>
            </div>
          </div>

          <!-- Footer fijo en cada página -->
          <div class="footer-bar" :style="footerStyle">
            <div>{{ index + 1 }}</div>
            <div>{{ model.footer }}</div>
          </div>
        </div>

        <!-- Imágenes destacadas a la derecha (solo hueco reservado) -->
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

      <!-- Página extra solo con footer -->
      <div v-if="images.footer" class="a4-page">
        <div class="a4-image full-a4">
          <img :src="footerUrl" alt="Footer Image" class="a4-image-content no-radius" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pdf-page {
  width: 794px;
  height: 1123px;
  background-color: white;
  padding: 1.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  position: relative;
  font-size: 12px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.cover-section,
.second-cover-section {
  width: 100%;
  height: 150px;
  margin-bottom: 0.5rem;
}

.cover-image,
.second-cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.5rem;
}

.catalog-title-section {
  width: 100%;
  text-align: center;
  margin-bottom: 1rem;
}

.catalog-title {
  font-size: 24px;
  font-weight: bold;
}

.main-content {
  display: flex;
  flex-grow: 1;
  gap: 1rem;
  margin-bottom: 1rem;
}

.short-description {
  flex-basis: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
}

.data-table-container {
  flex: 3;
  overflow-y: auto;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  padding: 0.5rem;
  max-height: 400px; /* para controlar altura si hace falta */
  display: flex;
  flex-direction: column;
}

.table-header {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  font-weight: bold;
  background-color: #5c6ac4; /* ejemplo color */
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
  border-bottom: 1px solid #ddd;
}

.table-cell {
  padding: 0.4rem;
  border-right: 1px solid #eee;
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

.featured-image-item {
  border: 1px solid #ccc;
  border-radius: 0.3rem;
  padding: 0.5rem;
  text-align: center;
}

.featured-image-item img {
  max-width: 100%;
  border-radius: 0.3rem;
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

.featured-image-desc {
  margin-top: 0.3rem;
  font-size: 0.85rem;
}

.long-description {
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  max-height: 100px;
  overflow-y: auto;
  white-space: pre-wrap;
}

.footer-bar {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #ccc;
  padding-top: 0.5rem;
  font-size: 0.8rem;
  color: #666;
}

.footer-text {
  flex-grow: 1;
}

.page-number {
  flex-shrink: 0;
}
</style>
