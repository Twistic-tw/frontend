<script setup lang="ts">
import { type Ref, ref } from 'vue'
import LivePreviewModal from './LivePreviewModal.vue'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps<{
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
</script>

<template>
  <div
    class="h-auto w-full bg-white rounded-2xl shadow-lg p-6 border border-gray-200"
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
      :footerStyle="footerStyle"
      :headerUrl="headerUrl"
      :footerUrl="footerUrl"
      :coverUrl="coverUrl"
      :secondUrl="secondUrl"
      :backgroundUrl="backgroundUrl"
      :featuredImages="featuredImages"
      :featuredDescriptions="featuredDescriptions"
      :model="model"
      @close="showFullscreen = false"
    />

    <div id="pdf-content" ref="previewRef" class="pdf-page">
      <!-- Portada -->
      <div v-if="images.cover" class="cover-section">
        <img :src="coverUrl" alt="Cover Image" class="cover-image" />
      </div>

      <!-- Segunda portada -->
      <div v-if="images.second" class="second-cover-section">
        <img :src="secondUrl" alt="Second Cover" class="second-cover-image" />
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

      <!-- Contenedor principal con tabla y imágenes destacadas -->
      <div class="main-content">
        <!-- Descripción corta -->
        <div v-if="model.short" class="short-description">
          <p>{{ model.short }}</p>
        </div>

        <!-- Tabla de datos -->
        <div class="data-table-container">
          <div class="table-header" :style="headerStyle">
            <div
              v-for="(key, i) in activeFieldNames"
              :key="'header-' + i"
              class="table-header-cell"
              :style="[
                cellStyle,
                { maxWidth: '250px', overflow: 'hidden', textOverflow: 'ellipsis' },
              ]"
            >
              {{ key }}
            </div>
          </div>

          <div
            v-for="(row, ri) in previewRows.flat()"
            :key="'row-' + ri"
            class="table-row"
            :style="rowStyle(ri)"
          >
            <div
              v-for="(key, i) in activeFieldNames"
              :key="'cell-' + ri + '-' + i"
              class="table-cell"
              :style="cellStyle"
            >
              {{ row[key] }}
            </div>
          </div>
        </div>

        <!-- Imágenes destacadas a la derecha (solo hueco reservado) -->
        <div class="featured-images">
          <div
            v-for="(key, index) in ['image_one', 'image_two', 'image_three', 'image_four']"
            :key="key"
            class="featured-image-item placeholder"
          >
            <div class="image-placeholder">
              {{ $t('featured_image_placeholder', { number: index + 1 }) }}
            </div>
          </div>
        </div>

        <!-- Descripción larga -->
        <div v-if="model.long" class="long-description">
          <p style="white-space: pre-wrap">{{ model.long }}</p>
        </div>

        <!-- Footer y número de página -->
        <div class="footer-bar" :style="footerStyle">
          <div class="footer-text">{{ model.footer }}</div>
          <div class="page-number">1</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pdf-page {
  height: 1123px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  position: relative;
  font-size: clamp(10px, 1vw, 14px);
  overflow: hidden;
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
  font-size: clamp(18px, 2vw, 24px);
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
  max-height: 400px;
  display: flex;
  flex-direction: column;
}

.table-header {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  font-weight: bold;
  background-color: #5c6ac4;
  color: white;
  padding: 0.3rem;
  border-radius: 0.3rem 0.3rem 0 0;
  font-size: clamp(10px, 1vw, 14px);
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
  font-size: clamp(10px, 1vw, 14px);
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
  gap: 1rem;
  overflow-y: auto;
  max-height: 400px;
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
  font-size: clamp(10px, 1vw, 14px);
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

