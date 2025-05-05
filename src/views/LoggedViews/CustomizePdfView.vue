<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import draggable from 'vuedraggable';
import axios from 'axios';

const route = useRoute();
const catalogName = route.params.catalogName as string;

const fields = ref<{ name: string; active: boolean }[]>([]);
const loading = ref(true);
const error = ref(false);

const colors = ref({
  background: '#ffffff',
  text: '#000000',
});

const portada = ref<File | null>(null);
const intermedia = ref<File | null>(null);
const final = ref<File | null>(null);

const getXsrfToken = (): string | null => {
  return document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1] || null;
};

const fetchTemplateData = async () => {
  try {
    const response = await axios.get(`https://api-catalogos.twistic.app/api/Templates/${catalogName}/data`, {
      withCredentials: true,
    });
    fields.value = response.data.fields.map((f: string) => ({ name: f, active: true }));
  } catch (err) {
    console.error('Error fetching template data:', err);
    error.value = true;
  } finally {
    loading.value = false;
  }
};

onMounted(fetchTemplateData);

const handleFileChange = (event: Event, target: 'portada' | 'intermedia' | 'final') => {
  const file = (event.target as HTMLInputElement).files?.[0] || null;
  if (target === 'portada') portada.value = file;
  if (target === 'intermedia') intermedia.value = file;
  if (target === 'final') final.value = file;
};

const generatePdf = async () => {
  const xsrfToken = getXsrfToken();
  if (!xsrfToken) return alert('No CSRF token');

  const formData = new FormData();
  formData.append('catalog_name', catalogName);
  formData.append('fields', JSON.stringify(
    fields.value.filter(f => f.active).map((f, i) => ({ name: f.name, order: i }))
  ));
  formData.append('colors', JSON.stringify(colors.value));

  if (portada.value) formData.append('portada', portada.value);
  if (intermedia.value) formData.append('intermedia', intermedia.value);
  if (final.value) formData.append('final', final.value);

  try {
    await axios.post('https://api-catalogos.twistic.app/api/Pdf', formData, {
      headers: {
        'X-XSRF-TOKEN': decodeURIComponent(xsrfToken),
        'Accept': 'application/json',
      },
      withCredentials: true,
      responseType: 'blob',
    }).then(res => {
      const blob = new Blob([res.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  } catch (err) {
    console.error('Error generating PDF:', err);
    alert('Error generating PDF');
  }
};
</script>

<template>
  <div class="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md mt-6">
    <h1 class="text-2xl font-bold mb-4">Customize PDF for {{ catalogName }}</h1>

    <div v-if="loading" class="text-gray-500">Loading fields...</div>
    <div v-if="error" class="text-red-500">Failed to load template data.</div>

    <div v-else>
      <h2 class="text-lg font-semibold mb-2">Fields</h2>
      <draggable v-model="fields" item-key="name" class="space-y-2">
        <template #item="{ element, index }">
          <div class="flex items-center justify-between bg-gray-100 p-2 rounded">
            <span>{{ index + 1 }}. {{ element.name }}</span>
            <input type="checkbox" v-model="element.active" />
          </div>
        </template>
      </draggable>

      <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block font-medium text-gray-700">Background Color</label>
          <input type="color" v-model="colors.background" class="w-full" />
        </div>
        <div>
          <label class="block font-medium text-gray-700">Text Color</label>
          <input type="color" v-model="colors.text" class="w-full" />
        </div>
      </div>

      <div class="mt-6">
        <label class="block font-medium text-gray-700 mb-1">Cover Image</label>
        <input type="file" @change="e => handleFileChange(e, 'portada')" class="w-full" />
      </div>
      <div class="mt-4">
        <label class="block font-medium text-gray-700 mb-1">Middle Image</label>
        <input type="file" @change="e => handleFileChange(e, 'intermedia')" class="w-full" />
      </div>
      <div class="mt-4">
        <label class="block font-medium text-gray-700 mb-1">Final Image</label>
        <input type="file" @change="e => handleFileChange(e, 'final')" class="w-full" />
      </div>

      <div class="mt-6 text-right">
        <button @click="generatePdf" class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Generate PDF
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
