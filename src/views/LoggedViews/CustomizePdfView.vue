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

const activeFieldNames = computed(() =>
  fields.value.filter(f => f.active).map(f => f.name)
);

// 🧠 ESTILOS COMPUTADOS TIPADOS
const titleStyle = computed<Record<string, string>>(() => ({
  color: colors.value.title,
  fontSize: titleSettings.value.size,
  textAlign: titleSettings.value.align,
  fontFamily: titleSettings.value.font
}));

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
  <div class="min-h-screen bg-gradient-to-b from-gray-100 to-white p-6 mt-4">
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

      <!-- Images -->
      <div>
        <h2 class="text-xl font-semibold text-gray-800 mb-3">Images</h2>
        <label class="block mb-2 text-sm font-medium text-gray-700">Cover Image (shown once)</label>
        <input type="file" @change="e => handleImageUpload(e, 'cover')" class="file-input" />
        <label class="block mt-4 mb-2 text-sm font-medium text-gray-700">Second Cover (optional)</label>
        <input type="file" @change="e => handleImageUpload(e, 'second')" class="file-input" />
        <label class="block mt-4 mb-2 text-sm font-medium text-gray-700">Header Image (repeated on every page)</label>
        <input type="file" @change="e => handleImageUpload(e, 'header')" class="file-input" />
        <label class="block mt-2 mb-2 text-sm font-medium text-gray-700">Header Height (px)</label>
        <input type="number" v-model="headerHeight" class="file-input" />
        <label class="block mt-4 mb-2 text-sm font-medium text-gray-700">Footer Image (optional)</label>
        <input type="file" @change="e => handleImageUpload(e, 'footer')" class="file-input" />

        <button @click="generatePdf"
          class="mt-6 bg-indigo-600 text-white px-6 py-3 rounded shadow hover:bg-indigo-700 hover:scale-105 transition">
          Generate PDF
        </button>
      </div>

      <!-- Styles -->
      <div>
        <h2 class="text-xl font-semibold text-gray-800 mb-3">Styles</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><label class="block mb-1 font-medium">PDF Background</label><input type="color" v-model="colors.background" class="w-full h-10 p-1 border rounded" /></div>
          <div><label class="block mb-1 font-medium">Alternate Row Background</label><input type="color" v-model="colors.rowAlternate" class="w-full h-10 p-1 border rounded" /></div>
          <div><label class="block mb-1 font-medium">Header Background</label><input type="color" v-model="colors.header" class="w-full h-10 p-1 border rounded" /></div>
          <div><label class="block mb-1 font-medium">Header Text Color</label><input type="color" v-model="colors.headerText" class="w-full h-10 p-1 border rounded" /></div>
          <div><label class="block mb-1 font-medium">Title Color</label><input type="color" v-model="colors.title" class="w-full h-10 p-1 border rounded" /></div>
          <div><label class="block mb-1 font-medium">Text Color</label><input type="color" v-model="colors.text" class="w-full h-10 p-1 border rounded" /></div>
          <div><label class="block mb-1 font-medium">Title Font Size</label><input type="text" v-model="titleSettings.size" class="w-full border p-2 rounded" /></div>
          <div><label class="block mb-1 font-medium">Field Font Size</label><input type="text" v-model="titleSettings.fieldSize" class="w-full border p-2 rounded" /></div>
          <div><label class="block mb-1 font-medium">Field Font</label><input type="text" v-model="titleSettings.fieldFont" class="w-full border p-2 rounded" /></div>
        </div>
      </div>

      <!-- Preview -->
      <div class="mt-10">
        <div
          id="pdf-content"
          class="mx-auto rounded shadow border overflow-auto bg-white"
          :style="{
            width: windowWidth < 850 ? '100%' : '794px',
            height: '1123px',
            padding: '2rem'
          }"
        >
          <div v-if="images.cover" class="mb-4">
            <img :src="coverUrl" alt="Cover Image" class="w-full h-auto mb-2 rounded" />
          </div>

          <div v-if="images.header" class="mb-4">
            <img :src="headerUrl" alt="Header Image" :style="{ height: headerHeight + 'px' }" class="w-full object-cover rounded" />
          </div>

          <h1 class="font-bold mb-6" :style="titleStyle">
            {{ templateName }} Catalog
          </h1>

          <div v-if="images.second" class="mb-4">
            <img :src="secondUrl" alt="Second Cover" class="w-full h-auto rounded" />
          </div>

          <div class="w-full text-sm border rounded overflow-auto border-gray-300 shadow-sm">
            <!-- Header -->
            <div class="grid font-medium" :style="headerStyle">
              <div v-for="(key, i) in activeFieldNames" :key="'header-' + i"
                   class="px-4 py-2 text-left border-r border-indigo-500 last:border-r-0">
                {{ key }}
              </div>
            </div>

            <!-- Rows -->
            <div v-for="(row, ri) in excelData" :key="'row-' + ri" class="grid" :style="rowStyle(ri)">
              <div v-for="(key, i) in activeFieldNames" :key="'cell-' + ri + '-' + i"
                   class="px-4 py-2 border-r border-gray-200 last:border-r-0">
                {{ row[key] }}
              </div>
            </div>
          </div>

          <div v-if="images.footer" class="mt-4">
            <img :src="footerUrl" alt="Footer Image" class="w-full h-auto rounded" />
          </div>
        </div>
      </div>
    </div>

    <div class="mt-12">
      <BackButton class="fixed bottom-6 left-6 bg-gray-800 text-white px-4 py-2 rounded-lg shadow transition-all duration-300 ease-in-out hover:px-6" />
    </div>
  </div>
</template>
