<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import draggable from 'vuedraggable';

const route = useRoute();
const templateId = route.params.id as string;

const templateName = ref('');
const fields = ref<{ name: string; active: boolean }[]>([]);
const loading = ref(true);
const error = ref(false);

const colors = ref({
  background: '#ffffff',
  text: '#000000',
});

const images = ref({
  cover: null as File | null,
  middle: null as File | null,
  end: null as File | null,
});

const getXsrfToken = (): string | null => {
  return document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1] || null;
};

const xsrfToken = getXsrfToken();

const fetchTemplate = async () => {
  try {
    const res = await axios.get(`https://api-catalogos.twistic.app/api/Templates/${templateId}/data`, {
      headers: {
          'X-XSRF-TOKEN': decodeURIComponent(xsrfToken),
          'Accept': 'application/json'
        },
      withCredentials: true
    });
    templateName.value = res.data.template.catalog_name;
    fields.value = res.data.fields.map((f: string) => ({ name: f, active: true }));
  } catch (err) {
    console.error('Error fetching template data:', err);
    error.value = true;
  } finally {
    loading.value = false;
  }
};

const handleImageUpload = (event: Event, type: 'cover' | 'middle' | 'end') => {
  const file = (event.target as HTMLInputElement).files?.[0] || null;
  images.value[type] = file;
};

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
    alert('PDF generated successfully');
  } catch (err) {
    console.error('Error generating PDF:', err);
    alert('Failed to generate PDF');
  }
};

onMounted(fetchTemplate);
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-100 to-white p-6">
    <h1 class="text-2xl font-bold mb-4">Customize PDF for <span class="text-indigo-600">{{ templateName }}</span></h1>

    <div v-if="loading" class="text-center text-gray-600">Loading template...</div>
    <div v-if="error" class="text-center text-red-500">Failed to load template data.</div>

    <div v-if="!loading && !error" class="space-y-6">
      <div>
        <h2 class="text-lg font-semibold mb-2">Reorder and select fields</h2>
        <draggable v-model="fields" item-key="name" class="space-y-2">
          <template #item="{ element }">
            <div class="flex justify-between items-center p-2 bg-white border rounded shadow">
              <span>{{ element.name }}</span>
              <input type="checkbox" v-model="element.active" />
            </div>
          </template>
        </draggable>
      </div>

      <div>
        <h2 class="text-lg font-semibold mb-2">Colors</h2>
        <label class="block mb-2">Background Color:</label>
        <input type="color" v-model="colors.background" class="mb-4" />
        <label class="block mb-2">Text Color:</label>
        <input type="color" v-model="colors.text" />
      </div>

      <div>
        <h2 class="text-lg font-semibold mb-2">Upload Images</h2>
        <label class="block mb-2">Cover Image:</label>
        <input type="file" @change="e => handleImageUpload(e, 'cover')" />
        <label class="block mb-2 mt-4">Middle Image:</label>
        <input type="file" @change="e => handleImageUpload(e, 'middle')" />
        <label class="block mb-2 mt-4">End Image:</label>
        <input type="file" @change="e => handleImageUpload(e, 'end')" />
      </div>

      <button @click="generatePdf" class="mt-6 bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700">
        Generate PDF
      </button>
    </div>
  </div>
</template>

<style scoped>
.draggable-list .ghost {
  opacity: 0.4;
}
</style>
