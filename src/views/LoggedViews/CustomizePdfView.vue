<script setup lang="ts">
import PdfLoadingOverlay from '@/components/PdfLoadingOverlay.vue'
import ActiveFields from '@/components/ActiveFields.vue'
import SearchFilter from '@/components/SearchFilter.vue'
import StyleOptions from '@/components/StyleOptions.vue'
import ImageUploader from '@/components/ImageUploader.vue'
import LivePreview from '@/components/LivePreview.vue'
import BackButton from '@/components/BackButton.vue'
import { CustomizePdf } from '../../composable/CustomizePdf'
import { ref } from 'vue'

const activeCard = ref<string | null>(null)

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
</script>

<template>
  <PdfLoadingOverlay v-if="loading || generating" :generating="generating" :loading="loading" />

  <div class="min-h-screen bg-gradient-to-b from-gray-100 to-white p-6 mt-4 overflow-y-auto">
    <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center" style="margin: 1em 0 2em 0">
      Customize {{ templateName }} Catalog
    </h1>

    <div v-if="error" class="text-center text-red-500">Error loading data.</div>

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
        </div>

        <button
          @click="sendToBackend"
          class="w-full bg-[#4f46e5] text-white px-6 py-3 rounded-xl shadow-md transition-colors duration-300 hover:bg-[#1e2939] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Generate PDF
        </button>
      </div>

      <LivePreview
        :coverUrl="coverUrl"
        :secondUrl="secondUrl"
        :headerUrl="headerUrl"
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
      />
    </div>

    <div class="mt-12">
      <BackButton class="fixed bottom-6 left-6 bg-gray-800 text-white px-4 py-2 rounded-lg shadow transition-all duration-300 ease-in-out hover:px-6" />
    </div>
  </div>
</template>
