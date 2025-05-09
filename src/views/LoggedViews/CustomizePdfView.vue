<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import draggable from 'vuedraggable';
import * as XLSX from 'xlsx';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import html2pdf from 'html2pdf.js';
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
const filteredData = ref<unknown[][]>([]);

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

    updateFilteredData();
  } catch (err) {
    console.error('Error loading data:', err);
    error.value = true;
  } finally {
    loading.value = false;
  }
};

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
      filename: `${templateName.value}_catalogo.pdf`,
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
      Personaliza tu Catálogo <span class="text-indigo-900">{{ templateName }}</span>
    </h1>

    <div v-if="loading" class="text-center text-gray-600">Cargando plantilla...</div>
    <div v-else-if="error" class="text-center text-red-500">Error al cargar los datos.</div>

    <div v-else class="space-y-8">
      <div>
        <h2 class="text-xl font-semibold text-gray-800 mb-3">Campos activos</h2>
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
        <h2 class="text-xl font-semibold text-gray-800 mb-3">Colores</h2>
        <div class="flex flex-wrap gap-6">
          <label>Fondo <input type="color" v-model="colors.background" class="w-10 h-10" /></label>
          <label>Texto <input type="color" v-model="colors.text" class="w-10 h-10" /></label>
          <label>Título <input type="color" v-model="colors.title" class="w-10 h-10" /></label>
        </div>
      </div>

      <div>
        <h2 class="text-xl font-semibold text-gray-800 mb-3">Imágenes de portada</h2>
        <input type="file" @change="e => handleImageUpload(e, 'cover')" class="file-input" />
        <input type="file" @change="e => handleImageUpload(e, 'second')" class="file-input" />
      </div>

      <div id="pdf-content" class="bg-white rounded shadow p-6">
        <section v-if="images.cover" class="mb-4">
          <img v-if="coverUrl" :src="coverUrl" alt="Portada" class="w-full h-auto mb-4 rounded" />
        </section>

        <section v-if="images.second" class="mb-4">
          <img v-if="secondUrl" :src="secondUrl" alt="Segunda portada" class="w-full h-auto mb-4 rounded" />
        </section>

        <section>
          <h2 class="text-2xl font-bold mb-4" :style="{ color: colors.title }">Catálogo</h2>
          <div class="space-y-2 text-sm" :style="{ backgroundColor: colors.background, color: colors.text }">
            <div class="flex font-semibold bg-gray-100 sticky top-0 border">
              <div
                v-for="(h, i) in filteredData[0]"
                :key="'header-' + i"
                class="flex-1 px-3 py-2 border"
              >
                {{ h }}
              </div>
            </div>
            <div
              v-for="(row, ri) in filteredData.slice(1)"
              :key="'row-' + ri"
              class="flex border-t"
            >
              <div
                v-for="(cell, ci) in row"
                :key="'cell-' + ci"
                class="flex-1 px-3 py-1 border"
              >
                {{ cell }}
              </div>
            </div>
          </div>
        </section>
      </div>

      <button @click="generatePdf"
        class="bg-indigo-600 text-white px-6 py-3 rounded shadow hover:bg-indigo-700 hover:scale-105 transition mx-auto block">
        Generar PDF
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
