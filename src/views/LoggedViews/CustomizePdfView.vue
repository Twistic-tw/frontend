<script setup lang="ts">
import BackButton from '@/components/BackButton.vue'
import { CustomizePdf } from '../../composable/CustomizePdf'
import draggable from 'vuedraggable'

const {
  templateName,
  fields,
  colors,
  titleSettings,
  images,
  activeFieldNames,
  loading,
  error,
  generating,
  coverUrl,
  secondUrl,
  headerUrl,
  backgroundUrl,
  footerUrl,
  paginatedRows,
  limitedChunk,
  showBackground,
  headerStyle,
  rowStyle,
  cellStyle,
  footerStyle,
  sendToBackend,
  handleImageUpload
} = CustomizePdf()
</script>



<template>
  <!-- Overlay spinner centrado -->
  <div
    v-if="generating"
    class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
  >
    <div class="text-white text-lg font-semibold flex items-center gap-3">
      <svg
        class="animate-spin h-6 w-6 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
      </svg>
      Creating your PDF...
    </div>
  </div>

  <div class="min-h-screen bg-gradient-to-b from-gray-100 to-white p-6 mt-4 overflow-y-auto">
    <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">
      Customize {{ templateName }} Catalog
    </h1>

    <div v-if="loading" class="text-center text-gray-600">Loading template...</div>
    <div v-else-if="error" class="text-center text-red-500">Error loading data.</div>

    <!-- Overlay spinner centrado -->
  <!-- Editor y Preview en grid -->
<div class="flex flex-col md:flex-row gap-6 w-full max-w-[1600px] mx-auto px-4">
  <!-- Columna izquierda: Campos, Estilos e Imágenes -->
  <div class="w-full md:w-[50%] space-y-8">
    <!-- Card de Campos Activos -->
    <div class="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
      <h2 class="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Active Fields</h2>

      <draggable v-model="fields" item-key="name" class="space-y-3">
        <template #item="{ element }">
          <div class="flex justify-between items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 shadow-sm hover:shadow-md transition">
            <span class="text-gray-700 font-medium">{{ element.name }}</span>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="element.active" class="sr-only peer" />
              <div class="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-[#1e2939] transition-all"></div>
              <div class="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow transform peer-checked:translate-x-full transition-all"></div>
            </label>
          </div>
        </template>
      </draggable>
      <!-- Text Customization Card -->
        <div class="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <h2 class="text-xl font-semibold text-gray-800 mb-3">Text Options</h2>
          <div class="flex flex-col gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Header Text</label>
              <input type="color" v-model="colors.headerText" class="w-full h-8 border rounded" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Content Text</label>
              <input type="color" v-model="colors.text" class="w-full h-8 border rounded" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Footer Text</label>
              <input type="color" v-model="colors.footerText" class="w-full h-8 border rounded" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Field Font</label>
              <select v-model="titleSettings.fieldFont" class="w-full p-2 border rounded">
                <option value="Arial">Arial</option>
                <option value="Helvetica">Helvetica</option>
                <option value="Times New Roman">Times New Roman</option>
                <option value="Georgia">Georgia</option>
                <option value="Courier New">Courier New</option>
              </select>
            </div>
          </div>
        </div>
    </div>

    <!-- Estilos e Imágenes -->
    <div class="grid grid-cols-2 gap-6">
      <!-- Estilos -->
      <div class="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <h2 class="text-xl font-semibold text-gray-800 mb-3">Customize Style</h2>
        <div class="flex flex-col gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">PDF Background</label>
            <input type="color" v-model="colors.backgroundColor" class="w-full h-8 border rounded mb-1" />
            <input type="range" min="0" max="1" step="0.01" v-model.number="colors.backgroundAlpha" class="w-full bg-[#1e2939]"/>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Primary Row</label>
            <input type="color" v-model="colors.rowPrimaryColor" class="w-full h-8 border rounded mb-1" />
            <input type="range" min="0" max="1" step="0.01" v-model.number="colors.rowPrimaryAlpha" class="w-full bg-[#1e2939]"/>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Alternate Row</label>
            <input type="color" v-model="colors.rowAlternateColor" class="w-full h-8 border rounded mb-1" />
            <input type="range" min="0" max="1" step="0.01" v-model.number="colors.rowAlternateAlpha" class="w-full bg-[#1e2939]"/>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Header Background</label>
            <input type="color" v-model="colors.headerColor" class="w-full h-8 border rounded mb-1" />
            <input type="range" min="0" max="1" step="0.01" v-model.number="colors.headerAlpha" class="w-full bg-[#1e2939]"/>
          </div>
          <!--
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Header Text</label>
            <input type="color" v-model="colors.headerText" class="w-full h-8 border rounded" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Content Text</label>
            <input type="color" v-model="colors.text" class="w-full h-8 border rounded" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Footer Background</label>
            <input type="color" v-model="colors.footerColor" class="w-full h-8 border rounded mb-1" />
            <input type="range" min="0" max="1" step="0.01" v-model.number="colors.footerAlpha" class="w-full bg-[#1e2939]"/>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Footer Text</label>
            <input type="color" v-model="colors.footerText" class="w-full h-8 border rounded" />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Show Table Borders</label>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="colors.showBorders" class="sr-only peer" />
              <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#1e2939] transition-all"></div>
              <div class="absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full shadow transform peer-checked:translate-x-full transition-all"></div>
            </label>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Field Font</label>
            <select v-model="titleSettings.fieldFont" class="w-full p-2 border rounded">
              <option value="Arial">Arial</option>
              <option value="Helvetica">Helvetica</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Georgia">Georgia</option>
              <option value="Courier New">Courier New</option>
            </select>
          </div>
          -->
        </div>

      </div>

      <!-- Imágenes -->
      <div class="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <h2 class="text-xl font-semibold text-gray-800 mb-3">Images</h2>
        <div class="flex flex-col gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Cover (Required)</label>
            <input type="file" @change="(e) => handleImageUpload(e, 'cover')" class="file-input w-full" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Second Cover (Optional)</label>
            <input type="file" @change="(e) => handleImageUpload(e, 'second')" class="file-input w-full" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Header (Required)</label>
            <input type="file" @change="(e) => handleImageUpload(e, 'header')" class="file-input w-full" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Footer (Optional)</label>
            <input type="file" @change="(e) => handleImageUpload(e, 'footer')" class="file-input w-full" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Background (Optional)</label>
            <input type="file" @change="(e) => handleImageUpload(e, 'background')" class="file-input w-full" />
          </div>
        </div>
      </div>
    </div>

    <!-- Botón de generación -->
    <button
      @click="sendToBackend"
      class="w-full bg-[#4f46e5] text-white px-6 py-3 rounded-xl shadow-md transition-colors duration-300 hover:bg-[#1e2939] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Generate PDF
    </button>
  </div>

      <!-- DERECHA: Vista previa -->
      <div class="w-full lg:w-1/2 bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <h2 class="text-xl font-semibold text-gray-800 mb-3">Live Preview</h2>
        <div
          id="pdf-content"
          class="overflow-y-auto overflow-x-hidden max-w-full origin-top-left w-full"
          style="aspect-ratio: 794/1123; transform: scale(1)"
        >
          <!-- Portada -->
          <div v-if="images.cover" class="a4-page">
            <img
              :src="coverUrl"
              alt="Cover Image"
              class="a4-image-content no-radius w-full h-full object-cover"
            />
          </div>

          <!-- Segunda portada -->
          <div v-if="images.second" class="a4-page">
            <img
              :src="secondUrl"
              alt="Second Cover"
              class="a4-image-content no-radius w-full h-full object-contain"
            />
          </div>

          <!-- Páginas de contenido -->
          <div
            v-for="(chunk, index) in paginatedRows"
            :key="'page-' + index"
            class="a4-page"
            :style="{
              backgroundImage: showBackground(index) ? `url(${backgroundUrl})` : 'none',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
            }"
          >
            <!-- Cabecera -->
            <div v-if="images.header" class="mb-4" style="height: 120px; overflow: hidden">
              <img
                :src="headerUrl"
                alt="Header Image"
                class="w-full object-cover rounded-b-lg"
                style="height: 120px"
              />
            </div>

            <!-- Tabla -->
            <div
              class="w-full text-sm border border-transparent rounded-[8px] shadow-sm p-6 table-preview-shadow"
            >
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
                v-for="(row, ri) in limitedChunk"
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

            <!-- Pie de página -->
            <div
              v-if="index === paginatedRows.length - 1 && images.footer"
              class="a4-image full-a4"
            >
              <img :src="footerUrl" alt="Footer Image" class="a4-image-content no-radius" />
            </div>
            <div class="footer-bar" :style="footerStyle">{{ index + 1 }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-12">
      <BackButton
        class="fixed bottom-6 left-6 bg-gray-800 text-white px-4 py-2 rounded-lg shadow transition-all duration-300 ease-in-out hover:px-6"
      />
    </div>
    </div>
</template>

<style scoped>
.file-input {
  display: block;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  width: 100%;
  max-width: 400px;
}

.a4-page {
  position: relative;
  width: 100%;
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
