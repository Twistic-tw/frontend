<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import draggable from 'vuedraggable';
import * as XLSX from 'xlsx';

const route = useRoute();
const templateId = route.params.id as string;

const templateName = ref('');
const fields = ref<{ name: string; active: boolean }[]>([]);
const loading = ref(true);
const error = ref(false);

const colors = ref({ background: '#ffffff', text: '#000000' });
const images = ref({ cover: null, middle: null, end: null });
const tableData = ref<unknown[][]>([]);
const filteredData = ref<unknown[][]>([]);

// CSRF
const getXsrfToken = () => document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1] || null;

// Fetch template and load Excel
const fetchTemplate = async () => {
  try {
    const res = await axios.get(`https://api-catalogos.twistic.app/api/Templates/${templateId}/data`, {
      withCredentials: true
    });

    templateName.value = res.data.template.name;
    fields.value = (res.data.fields || []).map((f: string) => ({ name: f, active: true }));

    const excelUrl = res.data.excel_path;
    const blob = await (await fetch(excelUrl)).blob();
    const text = await blob.text();
    console.log('📄 Excel preview:', text.slice(0, 200));
    const buffer = await blob.arrayBuffer();

    const workbook = XLSX.read(buffer, { type: 'array' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    tableData.value = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    updateFilteredData();
  } catch (err) {
    console.error('Error loading data:', err);
    error.value = true;
  } finally {
    loading.value = false;
  }
};

// Filter table based on active fields
const updateFilteredData = () => {
  if (tableData.value.length === 0) return;

  const headers = tableData.value[0] as string[];
  const rows = tableData.value.slice(1);
  const actives = fields.value.filter(f => f.active).map(f => f.name);

  const indexes = headers.map((h, i) => actives.includes(h) ? i : -1).filter(i => i !== -1);
  filteredData.value = [
    indexes.map(i => headers[i]),
    ...rows.map(row => indexes.map(i => row[i]))
  ];
};

// Image upload
const handleImageUpload = (e: Event, type: 'cover' | 'middle' | 'end') => {
  const file = (e.target as HTMLInputElement).files?.[0] || null;
  images.value[type] = file;
};

// Submit PDF
const generatePdf = async () => {
  const activeFields = fields.value.filter(f => f.active).map(f => f.name);
  const formData = new FormData();
  formData.append('template_id', templateId);
  formData.append('fields', JSON.stringify(activeFields));
  formData.append('colors', JSON.stringify(colors.value));
  if (images.value.cover) formData.append('cover', images.value.cover);
  if (images.value.middle) formData.append('middle', images.value.middle);
  if (images.value.end) formData.append('end', images.value.end);

  try {
    const xsrf = getXsrfToken();
    await axios.post('https://api-catalogos.twistic.app/api/Pdf', formData, {
      headers: {
        'X-XSRF-TOKEN': decodeURIComponent(xsrf!),
        'Accept': 'application/json'
      },
      withCredentials: true
    });
    alert('✅ PDF successfully generated');
  } catch (err) {
    console.error('Error generating PDF:', err);
    alert('Error generating PDF');
  }
};

watch(fields, updateFilteredData, { deep: true });
onMounted(fetchTemplate);
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-100 to-white p-6">
    <h1 class="text-3xl font-bold text-center text-indigo-700 mb-8">
      Customize PDF for <span class="text-indigo-900">{{ templateName }}</span>
    </h1>

    <div v-if="loading" class="text-center text-gray-600">Loading template...</div>
    <div v-else-if="error" class="text-center text-red-500">Failed to load data.</div>

    <div v-else class="space-y-10">
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
        <div class="flex gap-6">
          <label>
            Background <input type="color" v-model="colors.background" class="w-10 h-10" />
          </label>
          <label>
            Text <input type="color" v-model="colors.text" class="w-10 h-10" />
          </label>
        </div>
      </div>

      <!-- Images -->
      <div>
        <h2 class="text-xl font-semibold text-gray-800 mb-3">Images (optional)</h2>
        <input type="file" @change="e => handleImageUpload(e, 'cover')" class="file-input" />
        <input type="file" @change="e => handleImageUpload(e, 'middle')" class="file-input" />
        <input type="file" @change="e => handleImageUpload(e, 'end')" class="file-input" />
      </div>

      <!-- Preview -->
      <div class="bg-white rounded shadow p-4">
        <h2 class="text-lg font-bold text-gray-700 mb-2">Excel Preview</h2>
        <div class="overflow-auto max-h-[400px]">
          <table class="w-full border-collapse text-sm" :style="{ backgroundColor: colors.background, color: colors.text }">
            <thead class="bg-gray-100 sticky top-0">
              <tr>
                <th v-for="(h, i) in filteredData[0]" :key="i" class="border px-3 py-2">{{ h }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, ri) in filteredData.slice(1)" :key="ri">
                <td v-for="(cell, ci) in row" :key="ci" class="border px-3 py-1">{{ cell }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Button -->
      <button @click="generatePdf"
        class="bg-indigo-600 text-white px-6 py-3 rounded shadow hover:bg-indigo-700 hover:scale-105 transition mx-auto block">
        Generate PDF
      </button>
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
