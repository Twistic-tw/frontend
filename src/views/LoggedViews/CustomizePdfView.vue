<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
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

const colors = ref({
  background: '#ffffff',
  text: '#000000',
  title: '#1f2937',
  header: '#4f46e5',
  rowAlternate: '#f9fafb'
});

const titleSettings = ref<{
  size: string;
  align: 'left' | 'center' | 'right';
  font: string;
}>({
  size: '2rem',
  align: 'center',
  font: 'Arial'
});

const images = ref({
  cover: null as File | null,
  second: null as File | null,
  footer: null as File | null
});

const coverUrl = computed(() => images.value.cover ? URL.createObjectURL(images.value.cover) : '');
const secondUrl = computed(() => images.value.second ? URL.createObjectURL(images.value.second) : '');
const footerUrl = computed(() => images.value.footer ? URL.createObjectURL(images.value.footer) : '');

const excelData = ref<Record<string, string>[]>([]);

const activeFieldNames = computed(() =>
  fields.value.filter(f => f.active).map(f => f.name)
);

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

const handleImageUpload = (e: Event, type: 'cover' | 'second' | 'footer') => {
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
  <div class="min-h-screen bg-gradient-to-b from-gray-100 to-white p-6  mt-4">
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

      <!-- Colors -->
      <div>
        <h2 class="text-xl font-semibold text-gray-800 mb-3">Colors</h2>
        <div class="flex flex-wrap gap-6">
          <label>Background <input type="color" v-model="colors.background" class="w-10 h-10" /></label>
          <label>Text <input type="color" v-model="colors.text" class="w-10 h-10" /></label>
          <label>Title <input type="color" v-model="colors.title" class="w-10 h-10" /></label>
          <label>Header <input type="color" v-model="colors.header" class="w-10 h-10" /></label>
          <label>Alternate Row <input type="color" v-model="colors.rowAlternate" class="w-10 h-10" /></label>
        </div>
      </div>

      <!-- Title Settings -->
      <div>
        <h2 class="text-xl font-semibold text-gray-800 mb-3">Title Style</h2>
        <div class="flex flex-wrap gap-6 items-center">
          <label>Font Size
            <input type="range" min="1" max="4" step="0.1" v-model="titleSettings.size" class="w-40" />
          </label>
          <label>Alignment
            <select v-model="titleSettings.align" class="border rounded px-2 py-1">
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
          </label>
          <label>Font Family
            <select v-model="titleSettings.font" class="border rounded px-2 py-1">
              <option value="Arial">Arial</option>
              <option value="Georgia">Georgia</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Courier New">Courier New</option>
              <option value="Tahoma">Tahoma</option>
            </select>
          </label>
        </div>
      </div>

      <!-- Images -->
      <div>
        <h2 class="text-xl font-semibold text-gray-800 mb-3">Images</h2>
        <label class="block mb-2 text-sm font-medium text-gray-700">Main Cover</label>
        <input type="file" @change="e => handleImageUpload(e, 'cover')" class="file-input" />
        <label class="block mt-4 mb-2 text-sm font-medium text-gray-700">Second Cover (optional)</label>
        <input type="file" @change="e => handleImageUpload(e, 'second')" class="file-input" />
        <label class="block mt-4 mb-2 text-sm font-medium text-gray-700">Footer Image (optional)</label>
        <input type="file" @change="e => handleImageUpload(e, 'footer')" class="file-input" />

        <!-- Generate PDF Button -->
        <button @click="generatePdf"
          class="mt-6 bg-indigo-600 text-white px-6 py-3 rounded shadow hover:bg-indigo-700 hover:scale-105 transition">
          Generate PDF
        </button>
      </div>

      <!-- Preview -->
      <div id="pdf-content" class="bg-white rounded shadow p-6">
        <!-- Title Page -->
        <section class="text-center mb-4">
          <h1
            class="font-bold"
            :style="{
              color: colors.title,
              fontSize: titleSettings.size,
              textAlign: titleSettings.align,
              fontFamily: titleSettings.font
            }"
          >
            {{ templateName }} Catalog
          </h1>
        </section>

        <!-- Cover Images -->
        <section v-if="images.cover" class="mb-4">
          <img v-if="coverUrl" :src="coverUrl" alt="Cover Image" class="w-full h-auto mb-4 rounded" />
        </section>

        <section v-if="images.second" class="mb-4">
          <img v-if="secondUrl" :src="secondUrl" alt="Second Cover Image" class="w-full h-auto mb-4 rounded" />
        </section>

        <!-- Simulated Table -->
        <section>
          <div class="w-full text-sm border rounded overflow-auto border-gray-300 shadow-sm">
            <!-- Header -->
            <div
              class="grid text-white font-medium"
              :style="{
                backgroundColor: colors.header,
                gridTemplateColumns: `repeat(${activeFieldNames.length}, minmax(0, 1fr))`
              }"
            >
              <div
                v-for="(key, i) in activeFieldNames"
                :key="'header-' + i"
                class="px-4 py-2 text-left border-r border-indigo-500 last:border-r-0"
              >
                {{ key }}
              </div>
            </div>

            <!-- Rows -->
            <div
              v-for="(row, ri) in excelData"
              :key="'row-' + ri"
              class="grid"
              :style="{
                gridTemplateColumns: `repeat(${activeFieldNames.length}, minmax(0, 1fr))`,
                backgroundColor: ri % 2 === 0 ? colors.background : colors.rowAlternate,
                color: colors.text
              }"
            >
              <div
                v-for="(key, i) in activeFieldNames"
                :key="'cell-' + ri + '-' + i"
                class="px-4 py-2 border-r border-gray-200 last:border-r-0"
              >
                {{ row[key] }}
              </div>
            </div>
          </div>
        </section>

        <!-- Footer Image -->
        <section v-if="images.footer" class="mt-10">
          <img :src="footerUrl" alt="Footer Image" class="w-full h-auto rounded" />
        </section>
      </div>
    </div>

    <!-- Back Button -->
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
</style>
