<script setup lang="ts">
import PdfLoadingOverlay from '@/components/PdfLoadingOverlay.vue'
import ActiveFields from '@/components/ActiveFields.vue'
import SearchFilter from '@/components/SearchFilter.vue'
import StyleOptions from '@/components/StyleOptions.vue'
import ImageUploader from '@/components/ImageUploader.vue'
import FeaturedImages from '@/components/FeaturedImages.vue'
import FeaturedImagesModal from '@/components/FeaturedImagesModal.vue'
import TextOptions from '@/components/TextOptions.vue'
import TextOptionsModal from '@/components/TextOptionsModal.vue'
import LivePreview from '@/components/LivePreview.vue'
import LivePreviewModal from '@/components/LivePreviewModal.vue'
import BackButton from '@/components/BackButton.vue'
import { CustomizePdf } from '../../composable/CustomizePdf'
import StylePresets from '@/components/StylePresets.vue'
import StylePresetsModal from '@/components/StylePresetsModal.vue'
import SaveStyleModal from '@/components/SaveStyleModal.vue'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const activeCard = ref<string | null>(null)

// Estado para el modal de texto y destacado
const showTextModal = ref(false)
const showFeaturedModal = ref(false)
const showStyleModal = ref(false)

// Estado para el modal de guardar estilo
const showSaveStyleModal = ref(false)
const newStyleName = ref('')

// Props del catálogo
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
  searchField,
  searchValue,
  searchActive,
  filteredRows,
  selectedRows,
  previewRows,
  featuredImages,
  filterRows,
  excelData,
  selectAllFiltered,
  deselectAllFiltered,
  toggleRow,
  clearSearch,
  showBackground,
  headerStyle,
  titleBackgroundRgba,
  rowStyle,
  cellStyle,
  footerStyle,
  sendToBackend,
  handleImageUpload,
  toggleFullscreen,
  handleSaveStyle,
  fetchStylePresets,
  applyStylePreset,
  deleteStylePreset,
  textOptions
} = CustomizePdf()

// Nuevo: gestión reactiva de las descripciones de imágenes destacadas
const featuredDescriptions = ref({
  desc_one: '',
  desc_two: '',
  desc_three: '',
  desc_four: ''
})

// Add missing shortDescription and longDescription refs for v-model usage
const shortDescription = ref('')
const longDescription = ref('')

// Estilos guardados
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stylePresets = ref<any[]>([])

// Add rowsPerPage with a default value, e.g., 10
const { rowsPerPage } = CustomizePdf()

onMounted(async () => {
  stylePresets.value = await fetchStylePresets()
})
</script>

<template>
  <PdfLoadingOverlay v-if="loading || generating" :generating="generating" :loading="loading" />

  <div class="min-h-screen bg-gradient-to-b from-gray-100 to-white p-6 mt-4 overflow-y-auto">
    <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center" style="margin: 1em 0 2em 0">
      {{ t('customize_title', { catalogName: templateName }) }}
    </h1>

    <div v-if="error" class="text-center text-red-500">
      {{ t('customize_error') }}
    </div>

    <div class="flex flex-col md:flex-row gap-6 w-full max-w-[1600px] mx-auto px-4">
      <div class="h-auto md:w-[50%] space-y-8">
        <ActiveFields
          v-model:fields="fields"
          :activeCard="activeCard"
          cardId="activeFields"
          @toggle="(id) => activeCard = activeCard === id ? null : id"
        />
        <SearchFilter
          v-model:searchField="searchField"
          v-model:searchValue="searchValue"
          :fields="fields"
          :allRows="excelData"
          :filteredRows="filteredRows"
          :selectedRows="selectedRows"
          :searchActive="searchActive"
          @filter="filterRows"
          @clear="clearSearch"
          @selectAll="selectAllFiltered"
          @deselectAll="deselectAllFiltered"
          @toggleRow="toggleRow"
          :activeCard="activeCard"
          cardId="searchField"
          @toggle="(id) => activeCard = activeCard === id ? null : id"
        />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StyleOptions
            v-model:colors="colors"
            v-model:titleSettings="titleSettings"
            v-model:shortDescription="shortDescription"
            v-model:longDescription="longDescription"
            :activeCard="activeCard"
            cardId="styleOptions"
            @toggle="(id) => activeCard = activeCard === id ? null : id"
          />

          <ImageUploader
            v-model:images="images"
            :coverUrl="coverUrl"
            :secondUrl="secondUrl"
            :headerUrl="headerUrl"
            :backgroundUrl="backgroundUrl"
            :footerUrl="footerUrl"
            :handleImageUpload="handleImageUpload"
            :activeCard="activeCard"
            cardId="imageUploader"
            @toggle="(id) => activeCard = activeCard === id ? null : id"
          />

          <TextOptions
            :activeCard="activeCard"
            cardId="textOptions"
            @toggle="() => showTextModal = true"
          />

          <TextOptionsModal
            v-model="textOptions"
            :show="showTextModal"
            @close="showTextModal = false"
          />


          <FeaturedImages
            :activeCard="activeCard"
            cardId="featuredImages"
            @toggle="() => showFeaturedModal = true"
          />

          <FeaturedImagesModal
            v-model="featuredImages"
            v-model:descriptions="featuredDescriptions"
            :show="showFeaturedModal"
            @close="showFeaturedModal = false"
          />

          <!-- Card de Estilos personalizados -->
          <StylePresets
            :is-active="showStyleModal"
            :title-settings="titleSettings"
            :header-style="headerStyle"
            :row-style="rowStyle"
            :cell-style="cellStyle"
            :footer-style="footerStyle"
            :colors="colors"
            :presets="stylePresets"
            @open="showStyleModal = true"
            @close="showStyleModal = false"
          />

          <StylePresetsModal
            :show="showStyleModal"
            :presets="stylePresets"
            :title-settings="titleSettings"
            :header-style="headerStyle"
            :row-style="rowStyle"
            :cell-style="cellStyle"
            :footer-style="footerStyle"
            :colors="colors"
            @close="showStyleModal = false"
            @apply="applyStylePreset"
            @delete="deleteStylePreset"
          />
        </div>

        <SaveStyleModal
          :show="showSaveStyleModal"
          :existing-names="stylePresets.map(p => p.name)"
          v-model="newStyleName"
          @close="showSaveStyleModal = false"
          @save="handleSaveStyle"
        />

        <button
          @click="sendToBackend"
          class="w-full bg-[#4f46e5] text-white px-6 py-3 rounded-xl shadow-md transition-colors duration-300 hover:bg-[#1e2939] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {{ t('customize_generate') }}
        </button>
        <div class="flex justify-end mb-4">
          <button
            @click="showSaveStyleModal = true"
            class="w-full bg-[#4f46e5] text-white px-6 py-3 rounded-xl shadow-md transition-colors duration-300 hover:bg-[#1e2939] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {{ $t('save_current_style') }}
          </button>
        </div>
      </div>

      <LivePreview
        :coverUrl="coverUrl"
        :secondUrl="secondUrl"
        :headerUrl="headerUrl"
        :templateName="templateName"
        :backgroundUrl="backgroundUrl"
        :footerUrl="footerUrl"
        :images="images"
        :previewRows="previewRows"
        :activeFieldNames="activeFieldNames"
        :headerStyle="headerStyle"
        :rowStyle="rowStyle"
        :cellStyle="cellStyle"
        :footerStyle="footerStyle"
        :showBackground="showBackground"
        :toggleFullscreen="toggleFullscreen"
        :titleBackground="titleBackgroundRgba"
        :titleText="colors.titleText"
        :titleSettings="titleSettings"
        :descriptions="textOptions"
        :shortDescriptionColor="colors.shortDescriptionColor"
        :longDescriptionColor="colors.longDescriptionColor"
        :featuredImages="featuredImages"
        :featuredDescriptions="featuredDescriptions"
      />

      <LivePreviewModal
        :previewRows="previewRows"
        :activeFieldNames="activeFieldNames"
        :headerStyle="headerStyle"
        :templateName="templateName"
        :rowStyle="rowStyle"
        :rowsPerPage = "rowsPerPage"
        :images="images"
        :headerUrl="headerUrl"
        :footerUrl="footerUrl"
        :backgroundUrl="backgroundUrl"
        :coverUrl="coverUrl"
        :secondUrl="secondUrl"
        :footerStyle="footerStyle"
        :titleBackground="titleBackgroundRgba"
        :titleText="colors.titleText"
        :descriptions="textOptions"
        :shortDescriptionColor="colors.shortDescriptionColor"
        :longDescriptionColor="colors.longDescriptionColor"
        :titleSettings="titleSettings"
        :featuredImages="featuredImages"
        :featuredDescriptions="featuredDescriptions"
      />
    </div>

    <div class="mt-12">
      <BackButton class="fixed bottom-6 left-6 bg-gray-800 text-white px-4 py-2 rounded-lg shadow transition-all duration-300 ease-in-out hover:px-6" />
    </div>
  </div>
</template>
