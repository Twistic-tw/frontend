<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import draggable from 'vuedraggable';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import html2pdf from 'html2pdf.js';
import BackButton from '@/components/BackButton.vue';

const route = useRoute();
const templateId = route.params.id as string;

const templateName = ref('');
const fields = ref<{ name: string; active: boolean }[]>([]);
const loading = ref(true);
const error = ref(false);
const headerHeight = ref(100);
const windowWidth = ref(window.innerWidth);

const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener('resize', updateWindowWidth);
  updateWindowWidth();
});

onUnmounted(() => {
  window.removeEventListener('resize', updateWindowWidth);
});

const colors = ref({
  background: '#ffffff',
  rowAlternate: '#f9fafb',
  text: '#000000',
  title: '#1f2937',
  header: '#4f46e5',
  headerText: '#ffffff'
});

const titleSettings = ref({
  size: '2rem',
  align: 'center' as 'left' | 'center' | 'right',
  font: 'Arial',
  fieldFont: 'Arial',
  fieldSize: '1rem',
  fieldAlign: 'left' as 'left' | 'center' | 'right'
});

const images = ref({
  cover: null as File | null,
  header: null as File | null,
  second: null as File | null,
  footer: null as File | null
});

const coverUrl = computed(() => images.value.cover ? URL.createObjectURL(images.value.cover) : '');
const headerUrl = computed(() => images.value.header ? URL.createObjectURL(images.value.header) : '');
const secondUrl = computed(() => images.value.second ? URL.createObjectURL(images.value.second) : '');
const footerUrl = computed(() => images.value.footer ? URL.createObjectURL(images.value.footer) : '');

const excelData = ref<Record<string, string>[]>([]);
const rowsPerPage = 25;
const paginatedRows = computed(() => {
  const chunks = [];
  for (let i = 0; i < excelData.value.length; i += rowsPerPage) {
    chunks.push(excelData.value.slice(i, i + rowsPerPage));
  }
  return chunks;
});

const activeFieldNames = computed(() =>
  fields.value.filter(f => f.active).map(f => f.name)
);

const headerStyle = computed<Record<string, string>>(() => ({
  backgroundColor: colors.value.header,
  color: colors.value.headerText,
  gridTemplateColumns: `repeat(${activeFieldNames.value.length}, minmax(0, 1fr))`
}));

const rowStyle = (ri: number): Record<string, string> => ({
  gridTemplateColumns: `repeat(${activeFieldNames.value.length}, minmax(0, 1fr))`,
  backgroundColor: ri % 2 === 0 ? colors.value.background : colors.value.rowAlternate,
  color: colors.value.text,
  fontFamily: titleSettings.value.fieldFont,
  fontSize: titleSettings.value.fieldSize,
  textAlign: titleSettings.value.fieldAlign
});

const fetchTemplate = async () => {
  try {
    const xsrfToken = document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1];
    const res = await axios.get(`${import.meta.env.VITE_URL}/Templates/${templateId}/data`, {
      withCredentials: true,
      headers: {
        'X-XSRF-TOKEN': decodeURIComponent(xsrfToken),
        'Accept': 'application/json'
      }
    });
    templateName.value = res.data.template.name;
    fields.value = (res.data.fields || []).map((f: string) => ({ name: f, active: true }));
    excelData.value = res.data.excel_data || [];
  } catch (err) {
    console.error('Error loading data:', err);
    error.value = true;
  } finally {
    loading.value = false;
  }
};

const handleImageUpload = (e: Event, type: 'cover' | 'header' | 'second' | 'footer') => {
  const file = (e.target as HTMLInputElement).files?.[0] || null;
  images.value[type] = file;
};

const generatePdf = async () => {
  const content = document.getElementById('pdf-content');
  if (!content) return;

  html2pdf()
    .from(content)
    .set({
      margin: 10,
      filename: `${templateName.value}_catalog.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    })
    .save();
};

onMounted(fetchTemplate);
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-100 to-white p-6 mt-4 overflow-y-auto">
    <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">
      Customize {{ templateName }} Catalog
    </h1>

    <div v-if="loading" class="text-center text-gray-600">Loading template...</div>
    <div v-else-if="error" class="text-center text-red-500">Error loading data.</div>

    <div v-else class="space-y-8">
      <!-- Fields -->
      <div>
        <h2 class="text-xl font-semibold text-gray-800 mb-3">Active Fields</h2>
        <draggable v-model="fields" item-key="name" class="space-y-2">
          <template #item="{ element }">
            <div class="flex justify-between items-center bg-white border rounded shadow p-3">
              <span>{{ element.name }}</span>
              <input type="checkbox" v-model="element.active" />
            </div>
          </template>
        </draggable>
      </div>

      <!-- Editor y Preview en grid -->
      <div class="flex flex-col md:flex-row gap-6">

        <!-- Estilos -->
        <div class="w-full md:w-[20%]">
          <h2 class="text-xl font-semibold text-gray-800 mb-3">Customize Style</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">PDF Background Color</label>
              <input type="color" v-model="colors.background" class="w-32 h-8 border rounded" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Alternate Row Color</label>
              <input type="color" v-model="colors.rowAlternate" class="w-32 h-8 border rounded" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Header Background</label>
              <input type="color" v-model="colors.header" class="w-32 h-8 border rounded" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Header Text Color</label>
              <input type="color" v-model="colors.headerText" class="w-32 h-8 border rounded" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Title Color</label>
              <input type="color" v-model="colors.title" class="w-32 h-8 border rounded" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Text Color</label>
              <input type="color" v-model="colors.text" class="w-32 h-8 border rounded" />
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

          <button @click="generatePdf"
            class="mt-6 w-full bg-indigo-600 text-white px-6 py-3 rounded shadow hover:bg-indigo-700 hover:scale-105 transition">
            Generate PDF
          </button>
        </div>

        <!-- Images -->
        <div class="w-full md:w-[30%]">
          <h2 class="text-xl font-semibold text-gray-800 mb-3">Images</h2>

          <label class="block mb-2 text-sm font-medium text-gray-700">Cover Image (shown once)</label>
          <input type="file" @change="(e) => handleImageUpload(e, 'cover')" class="file-input w-64" />

          <label class="block mt-4 mb-2 text-sm font-medium text-gray-700">Second Cover (optional)</label>
          <input type="file" @change="(e) => handleImageUpload(e, 'second')" class="file-input w-64" />

          <label class="block mt-4 mb-2 text-sm font-medium text-gray-700">Header Image (repeated on every page)</label>
          <input type="file" @change="(e) => handleImageUpload(e, 'header')" class="file-input w-64" />

          <label class="block mt-2 mb-2 text-sm font-medium text-gray-700">Header Height (px)</label>
          <input type="number" v-model="headerHeight" class="file-input w-64" />

          <label class="block mt-4 mb-2 text-sm font-medium text-gray-700">Footer Image (optional)</label>
          <input type="file" @change="(e) => handleImageUpload(e, 'footer')" class="file-input w-64" />
        </div>

        <!-- Preview -->
        <div class="w-full md:w-[50%]">
          <h2 class="text-xl font-semibold text-gray-800 mb-3">Live Preview</h2>
          <div id="pdf-content" class="overflow-y-auto" style="height: 1123px;">
            <div
              v-for="(chunk, index) in paginatedRows"
              :key="'page-' + index"
              class="a4-page"
            >
              <div v-if="index === 0 && images.cover" class="a4-image full-a4">
                <img :src="coverUrl" alt="Cover Image" class="a4-image-content no-radius" />
              </div>

              <div v-if="images.header" class="mb-4 px-8">
                <img :src="headerUrl" alt="Header Image" :style="{ height: headerHeight + 'px' }" class="w-full object-cover rounded-b-lg" />
              </div>

              <div v-if="index === 0 && images.second" class="mb-4">
                <img :src="secondUrl" alt="Second Cover" class="w-full h-auto rounded" />
              </div>

              <div class="w-full text-sm border rounded overflow-auto border-gray-300 shadow-sm">
                <div class="grid font-medium" :style="headerStyle">
                  <div v-for="(key, i) in activeFieldNames" :key="'header-' + i"
                       class="px-4 py-2 text-left border-r border-indigo-500 last:border-r-0">
                    {{ key }}
                  </div>
                </div>

                <div v-for="(row, ri) in chunk" :key="'row-' + index + '-' + ri" class="grid" :style="rowStyle(ri)">
                  <div v-for="(key, i) in activeFieldNames" :key="'cell-' + index + '-' + ri + '-' + i"
                       class="px-4 py-2 border-r border-gray-200 last:border-r-0">
                    {{ row[key] }}
                  </div>
                </div>
              </div>

              <div v-if="index === paginatedRows.length - 1 && images.footer" class="a4-image full-a4">
                <img :src="footerUrl" alt="Footer Image" class="a4-image-content no-radius" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-12">
      <BackButton class="fixed bottom-6 left-6 bg-gray-800 text-white px-4 py-2 rounded-lg shadow transition-all duration-300 ease-in-out hover:px-6" />
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
  width: 794px;
  height: 1123px;
  background-color: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  margin: 0 auto 2rem;
  padding: 2rem;
  page-break-after: always;
  overflow: hidden;
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
</style>
