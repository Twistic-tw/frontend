<script setup lang="ts">
import type { Ref, CSSProperties } from 'vue'

const {
  previewRef,
  toggleFullscreen,
  images,
  coverUrl,
  secondUrl,
  headerUrl,
  backgroundUrl,
  footerUrl,
  previewRows,
  showBackground,
  activeFieldNames,
  headerStyle,
  rowStyle,
  cellStyle,
  footerStyle
} = defineProps<{
  previewRef: Ref<HTMLElement | null>,
  toggleFullscreen: () => void,
  images: {
    cover: File | null,
    second: File | null,
    header: File | null,
    background: File | null,
    footer: File | null
  },
  coverUrl: string,
  secondUrl: string,
  headerUrl: string,
  backgroundUrl: string,
  footerUrl: string,
  previewRows: Record<string, string>[][],
  showBackground: (index: number) => boolean,
  activeFieldNames: string[],
  headerStyle: Record<string, string>,
  rowStyle: (index: number) => Record<string, string>,
  cellStyle: Record<string, string>,
  footerStyle: CSSProperties
}>()
</script>

<template>
  <div
    class="h-auto w-full bg-white rounded-2xl shadow-lg p-6 border border-gray-200"
    style="position: sticky; top: 100px; height: fit-content"
  >
    <h2 class="text-2xl font-semibold text-gray-800 mb-3">Live Preview</h2>

    <div class="flex justify-end mb-2 relative">
      <button
        @click="toggleFullscreen"
        class="absolute top-0 right-0 p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition z-10"
        title="Fullscreen"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M8 3H5a2 2 0 00-2 2v3m0 8v3a2 2 0 002 2h3m8-18h3a2 2 0 012 2v3m0 8v3a2 2 0 01-2 2h-3" />
        </svg>
      </button>
    </div>

    <div
      id="pdf-content"
      ref="previewRef"
      class="overflow-y-auto overflow-x-hidden max-w-full origin-top-left w-full h-fit-content"
      style="aspect-ratio: 794/1123; transform: scale(1)"
    >
      <!-- Portada -->
      <div v-if="images.cover" class="a4-page">
        <img :src="coverUrl" alt="Cover Image" class="a4-image-content no-radius w-full h-full object-cover" />
      </div>

      <!-- Segunda portada -->
      <div v-if="images.second" class="a4-page">
        <img :src="secondUrl" alt="Second Cover" class="a4-image-content no-radius w-full h-full object-contain" />
      </div>

      <!-- Páginas de contenido -->
      <div
        v-for="(chunk, index) in previewRows"
        :key="'page-' + index"
        class="a4-page"
        :style="{
          backgroundImage: showBackground(index) ? `url(${backgroundUrl})` : 'none',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }"
      >
        <div v-if="images.header" class="mb-4" style="height: 120px; overflow: hidden">
          <img :src="headerUrl" alt="Header Image" class="w-full object-cover rounded-b-lg" style="height: 120px" />
        </div>

        <div class="w-full text-sm border border-transparent rounded-[8px] shadow-sm p-6 table-preview-shadow">
          <div class="grid font-medium" :style="headerStyle">
            <div
              v-for="(key, i) in activeFieldNames"
              :key="'header-' + i"
              class="px-4 py-2 text-left border-r border-indigo-500 last:border-r-0"
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
              :style="cellStyle"
            >
              {{ row[key] }}
            </div>
          </div>
        </div>
        <div class="footer-bar" :style="footerStyle">{{ index + 1 }}</div>
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
.a4-page {
  position: relative;
  height: 1123px;
  background-color: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  margin: 0 auto 2rem;
  page-break-after: always;
  overflow: hidden;
  z-index: 1;
}
.a4-page > *:not(.absolute) {
  position: relative;
  z-index: 10;
}
.a4-image.full-a4 {
  width: 794px;
  height: 1123px;
  overflow: hidden;
  margin: 0 auto;
  padding: 0;
}
.a4-image-content {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.5rem;
}
.no-radius {
  border-radius: 0;
}
.table-preview-shadow {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  margin-bottom: 40px;
  width: 100%;
}
</style>
