<script setup lang="ts">
import BackButton from '@/components/BackButton.vue'
import { CustomizePdf } from '../../composable/CustomizePdf'
import draggable from 'vuedraggable'
import { computed } from 'vue'

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
  allRows,
  searchField,
  searchValue,
  searchActive,
  selectedRows,
  previewRows,
  filterRows,
  selectAllFiltered,
  deselectAllFiltered,
  toggleRow,
  clearSearch,
  showBackground,
  headerStyle,
  rowStyle,
  cellStyle,
  footerStyle,
  sendToBackend,
  handleImageUpload,
  toggleFullscreen
} = CustomizePdf()

const filteredRows = computed(() =>
  searchActive
    ? allRows.value.filter((_, index) => selectedRows.value.has(index))
    : []
)

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
    <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center" style="margin:1em 0 2em 0">
      Customize {{ templateName }} Catalog
    </h1>

    <!-- Pantalla oscurecida al cargar -->
    <div
      v-if="loading"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 text-white text-xl font-semibold"
    >
      <div class="flex items-center gap-4">
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
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
        Loading template...
      </div>
    </div>

    <div v-else-if="error" class="text-center text-red-500">Error loading data.</div>

    <!-- Overlay spinner centrado -->
  <!-- Editor y Preview en grid -->
<div class="flex flex-col md:flex-row gap-6 w-full max-w-[1600px] mx-auto px-4">
  <!-- Columna izquierda: Campos, Estilos e Imágenes -->
  <div class="h-auto md:w-[50%] space-y-8">
    <!-- Card de Campos Activos compacto y ordenado -->
    <div class="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
      <h2 class="text-2xl font-bold text-gray-800 mb-4 pb-2">Active Fields</h2>

      <draggable v-model="fields" item-key="name" class="grid grid-cols-2 md:grid-cols-3 gap-3">
        <template #item="{ element }">
          <div class="flex justify-between items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 shadow-sm hover:shadow-md transition text-sm">
            <span class="text-gray-700 truncate">{{ element.name }}</span>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" v-model="element.active" class="sr-only peer" />
              <div class="w-9 h-5 bg-gray-300 rounded-full peer peer-checked:bg-[#1e2939] transition-all"></div>
              <div class="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow transform peer-checked:translate-x-full transition-all"></div>
            </label>
          </div>
        </template>
      </draggable>
    </div>

    <!-- Filtro de búsqueda de datos -->
<div class="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
  <h2 class="text-2xl font-bold text-gray-800 mb-4">Search & Filter Data</h2>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Search by field</label>
      <select v-model="searchField" class="w-full p-2 border rounded">
        <option disabled value="">Select field</option>
        <option v-for="field in fields" :key="field.name" :value="field.name">
          {{ field.name }}
        </option>
      </select>
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Search by value</label>
      <input
        v-model="searchValue"
        @input="filterRows"
        placeholder="Enter value to filter"
        class="w-full p-2 border rounded"
      />
    </div>
    <div class="flex items-end">
      <button
        @click="clearSearch"
        class="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
      >
        Clear Filter
      </button>
    </div>
  </div>

  <!-- Tabla de solo valores + botones de acción -->
<div v-if="searchActive && filteredRows.length" class="overflow-auto max-h-[300px] border rounded">
  <div class="flex justify-between items-center px-4 py-2 bg-gray-100 border-b">
    <span class="text-sm text-gray-700">{{ selectedRows.size }} of {{ filteredRows.length }} selected</span>
    <div class="flex gap-2">
      <button
        @click="selectAllFiltered"
        class="text-xs bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
      >
        Show all
      </button>
      <button
        @click="deselectAllFiltered"
        class="text-xs bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
      >
        Hide all
      </button>
    </div>
  </div>

  <table class="table-auto w-full text-sm">
    <tbody>
      <tr
        v-for="(row, index) in filteredRows"
        :key="'row-' + index"
        class="hover:bg-gray-50 text-sm"
      >
        <!-- Checkbox para mostrar/ocultar fila -->
        <td class="px-3 py-1 text-center align-middle">
          <label class="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              :checked="selectedRows.has(index)"
              @change="toggleRow(index)"
              class="sr-only peer"
            />
            <div class="w-10 h-5 bg-gray-300 rounded-full peer peer-checked:bg-[#1e2939] transition-all"></div>
            <div class="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow transform peer-checked:translate-x-full transition-all"></div>
          </label>
        </td>

        <!-- Solo el campo buscado -->
        <td class="px-3 py-1 border-t align-middle">
          {{ row[searchField] }}
        </td>
      </tr>
    </tbody>
  </table>
</div>


  <div v-else class="text-sm text-gray-500 mt-2">
    No results found. Try another value.
  </div>

</div>


    <!-- Estilos e Imágenes -->
    <div class="grid grid-cols-2 gap-6">
      <!-- Estilos -->
      <div class="h-auto bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
        <h2 class="text-2xl font-bold text-gray-800 mb-3">Customize Style</h2>
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
        </div>
      </div>

      <!-- Imágenes -->
      <div class="bg-white rounded-2xl shadow-lg p-6 border border-gray-200" style="height: fit-content;">
        <h2 class="text-2xl font-bold text-gray-800 mb-3">Images</h2>
        <div class="h-auto flex flex-col gap-4">
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
      <div
        class="h-auto lg:w-1/2 bg-white rounded-2xl shadow-lg p-6 border border-gray-200"
        style="position: sticky; top: 100px; height: fit-content;"
      >
        <h2 class="text-2xl font-semibold text-gray-800 mb-3">Live Preview</h2>
        <!-- Botón de pantalla completa -->
        <div class="flex justify-end mb-2 relative">
          <button
            @click="toggleFullscreen"
            class="absolute top-0 right-0 p-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition z-10"
            title="Fullscreen"
          >
            <!-- Icono de pantalla completa SVG -->
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
                v-for="(row, ri) in previewRows"
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
  min-height: 1123px;
  background-color: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  margin: 0 auto 2rem;
  page-break-after: always;
  overflow: hidden;
  z-index: 1;
  height: fit-content;
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
