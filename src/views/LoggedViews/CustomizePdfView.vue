<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import draggable from 'vuedraggable';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import html2pdf from 'html2pdf.js';
import * as XLSX from 'xlsx';
import BackButton from '@/components/BackButton.vue';

const route = useRoute();
const templateId = route.params.id as string;

const templateName = ref('');
const fields = ref<{ name: string; active: boolean }[]>([]);
const loading = ref(true);
const error = ref(false);

const colors = ref({ background: '#ffffff', text: '#000000', title: '#1f2937' });
const images = ref({ cover: null as File | null, second: null as File | null });
const coverUrl = computed(() => images.value.cover ? URL.createObjectURL(images.value.cover) : '');
const secondUrl = computed(() => images.value.second ? URL.createObjectURL(images.value.second) : '');

const tableData = ref<unknown[][]>([]);

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

    const excelUrl = res.data.excel_path;
    const blob = await (await fetch(excelUrl, { credentials: 'include' })).blob();
    const buffer = await blob.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: 'array' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    tableData.value = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  } catch (err) {
    console.error('Error loading data:', err);
    error.value = true;
  } finally {
    loading.value = false;
  }
};

const handleImageUpload = (e: Event, type: 'cover' | 'second') => {
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
  <div class="min-h-screen bg-gradient-to-b from-gray-100 to-white p-6">
    <h1 class="text-3xl font-bold text-gray-800 mb-6 text-center">
      Customize Your Catalog <span class="text-indigo-900">{{ templateName }}</span>
    </h1>

    <div v-if="loading" class="text-center text-gray-600">Loading template...</div>
    <div v-else-if="error" class="text-center text-red-500">Error loading data.</div>

    <div v-else class="space-y-8">
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

      <div>
        <h2 class="text-xl font-semibold text-gray-800 mb-3">Colors</h2>
        <div class="flex flex-wrap gap-6">
          <label>Background <input type="color" v-model="colors.background" class="w-10 h-10" /></label>
          <label>Text <input type="color" v-model="colors.text" class="w-10 h-10" /></label>
          <label>Title <input type="color" v-model="colors.title" class="w-10 h-10" /></label>
        </div>
      </div>

      <div>
        <h2 class="text-xl font-semibold text-gray-800 mb-3">Cover Images</h2>
        <label class="block mb-2 text-sm font-medium text-gray-700">Main Cover</label>
        <input type="file" @change="e => handleImageUpload(e, 'cover')" class="file-input" />
        <label class="block mt-4 mb-2 text-sm font-medium text-gray-700">Second Cover (optional)</label>
        <input type="file" @change="e => handleImageUpload(e, 'second')" class="file-input" />
      </div>

      <div id="pdf-content" class="bg-white rounded shadow p-6">
        <section v-if="images.cover" class="mb-4">
          <img v-if="coverUrl" :src="coverUrl" alt="Cover Image" class="w-full h-auto mb-4 rounded" />
        </section>

        <section v-if="images.second" class="mb-4">
          <img v-if="secondUrl" :src="secondUrl" alt="Second Cover Image" class="w-full h-auto mb-4 rounded" />
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4" :style="{ color: colors.title }">Catalog Preview</h2>
          <ul class="space-y-4">
            <li
              v-for="(row, ri) in tableData.slice(1)"
              :key="'row-' + ri"
              class="p-4 border rounded bg-gray-50"
              :style="{ backgroundColor: colors.background, color: colors.text }"
            >
              <div v-for="(cell, ci) in row" :key="'cell-' + ci" class="text-sm">
                <strong class="text-gray-700">{{ tableData[0][ci] }}:</strong> {{ cell }}
              </div>
            </li>
          </ul>
        </section>
      </div>

      <button @click="generatePdf"
        class="bg-indigo-600 text-white px-6 py-3 rounded shadow hover:bg-indigo-700 hover:scale-105 transition mx-auto block">
        Generate PDF
      </button>
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
</style>
