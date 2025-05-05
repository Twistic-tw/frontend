<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
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

const preview = ref({
  fields: [] as string[],
  background: '',
  text: ''
});

const getXsrfToken = (): string | null => {
  return document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1] || null;
};

const fetchTemplate = async () => {
  try {
    const res = await axios.get(`https://api-catalogos.twistic.app/api/Templates/${templateId}/data`, {
      withCredentials: true
    });

    // ✅ Corrección: el template viene como res.data.template
    templateName.value = res.data.template.name;

    // ✅ Corrección: los campos son strings planos
    fields.value = (res.data.fields || []).map((f: string) => ({
      name: f,
      active: true
    }));
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

// Vista previa reactiva
watch([fields, colors], () => {
  preview.value.fields = fields.value.filter(f => f.active).map(f => f.name);
  preview.value.background = colors.value.background;
  preview.value.text = colors.value.text;
}, { deep: true });

onMounted(fetchTemplate);
</script>

<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-100 to-white p-6 transition-all duration-500 ease-in-out">
    <h1 class="text-3xl font-bold text-center text-indigo-700 mb-8 animate-fade-in">Customize PDF for <span class="text-indigo-900">{{ templateName }}</span></h1>

    <div v-if="loading" class="text-center text-gray-600">Loading template...</div>
    <div v-if="error" class="text-center text-red-500">Failed to load template data.</div>

    <div v-if="!loading && !error" class="space-y-10">
      <!-- Campo arrastrable -->
      <div>
        <h2 class="text-xl font-semibold text-gray-800 mb-3">Reorder and select fields</h2>
        <draggable v-model="fields" item-key="name" class="space-y-2">
          <template #item="{ element }">
            <div class="flex justify-between items-center bg-white border rounded shadow p-3 transition-transform hover:scale-[1.01]">
              <span class="font-medium text-gray-700">{{ element.name }}</span>
              <input type="checkbox" v-model="element.active" />
            </div>
          </template>
        </draggable>
      </div>

      <!-- Selector de color -->
      <div>
        <h2 class="text-xl font-semibold text-gray-800 mb-3">Choose Colors</h2>
        <div class="flex gap-6">
          <div>
            <label class="block text-sm text-gray-600 mb-1">Background</label>
            <input type="color" v-model="colors.background" class="w-10 h-10 border rounded" />
          </div>
          <div>
            <label class="block text-sm text-gray-600 mb-1">Text</label>
            <input type="color" v-model="colors.text" class="w-10 h-10 border rounded" />
          </div>
        </div>
      </div>

      <!-- Subida de imágenes -->
      <div>
        <h2 class="text-xl font-semibold text-gray-800 mb-3">Upload Images</h2>
        <div class="space-y-3">
          <input type="file" @change="e => handleImageUpload(e, 'cover')" class="file-input" />
          <input type="file" @change="e => handleImageUpload(e, 'middle')" class="file-input" />
          <input type="file" @change="e => handleImageUpload(e, 'end')" class="file-input" />
        </div>
      </div>

      <!-- Vista previa -->
      <div class="bg-white border rounded shadow p-4">
        <h2 class="text-lg font-bold mb-2 text-gray-700">Live Preview</h2>
        <div :style="{ backgroundColor: preview.background, color: preview.text }" class="rounded p-4 transition-all">
          <p class="font-semibold">Fields:</p>
          <ul class="list-disc pl-5">
            <li v-for="f in preview.fields" :key="f">{{ f }}</li>
          </ul>
        </div>
      </div>

      <button @click="generatePdf" class="block w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow transition-transform hover:scale-105 mx-auto">
        Generate PDF
      </button>
    </div>
  </div>
</template>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.5s ease-out;
}
.file-input {
  display: block;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  width: 100%;
  max-width: 400px;
}
</style>
