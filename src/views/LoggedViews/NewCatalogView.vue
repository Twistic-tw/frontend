<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import draggable from 'vuedraggable';
import BackButton from '@/components/BackButton.vue';

const step = ref(1);
const loading = ref(false);
const excelHeaders = ref<string[]>([]);
const userId = ref<number | null>(null);

// Formulario reactivo
const form = ref({
  catalog_name: '',
  excel_file: null as File | null,
  selected_headers: [] as { name: string, active: boolean }[],
  message: '',
});

// Cambiar paso
const nextStep = () => step.value++;
const prevStep = () => step.value--;

// Subir archivo
const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    form.value.excel_file = target.files[0];
  }
};

// Obtener token XSRF
const getXsrfToken = (): string | null => {
  return document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1] || null;
};

// Obtener usuario autenticado
const fetchUserId = async () => {
  const xsrfToken = getXsrfToken();
  if (!xsrfToken) return null;

  try {
    const response = await axios.get(`${import.meta.env.VITE_URL}/user`, {
      headers: {
        'X-XSRF-TOKEN': decodeURIComponent(xsrfToken),
        'Accept': 'application/json',
      },
      withCredentials: true,
    });
    userId.value = response.data.user.id;
  } catch (error) {
    console.error('Error fetching user ID:', error);
    userId.value = null;
  }
};

// Analizar Excel
const analyzeExcel = async () => {
  loading.value = true;

  const xsrfToken = getXsrfToken();
  if (!xsrfToken || !form.value.excel_file) {
    alert('CSRF token or file missing.');
    loading.value = false;
    return;
  }

  const formData = new FormData();
  formData.append('file', form.value.excel_file);

  try {
    const response = await axios.post(`${import.meta.env.VITE_URL}/excelscan`, formData, {
      headers: {
        'X-XSRF-TOKEN': decodeURIComponent(xsrfToken),
        'Accept': 'application/json'
      },
      withCredentials: true
    });

    excelHeaders.value = response.data.fields;
    form.value.selected_headers = excelHeaders.value.map(field => ({ name: field, active: false }));
    nextStep();
  } catch (error) {
    console.error('Error analyzing the file:', error);
    alert('Error analyzing the file.');
  } finally {
    loading.value = false;
  }
};

// Enviar Formulario
const submitForm = async () => {
  loading.value = true;

  if (!userId.value) {
    await fetchUserId();
    if (!userId.value) {
      alert('User ID could not be fetched.');
      loading.value = false;
      return;
    }
  }

  const xsrfToken = getXsrfToken();
  if (!xsrfToken || !form.value.excel_file) {
    alert('Session expired or file missing.');
    loading.value = false;
    return;
  }

  const formData = new FormData();
  formData.append('file', form.value.excel_file);
  formData.append('template_name', form.value.catalog_name);
  formData.append('id_user', String(userId.value));
  formData.append('fields', JSON.stringify(
    form.value.selected_headers
      .filter(fieldObj => fieldObj.active)
      .map((fieldObj, index) => ({
        field: fieldObj.name,
        active: true,
        order: index
      }))
  ));
  formData.append('message', form.value.message);

  try {
    console.log('Submitting with:', {
  userId: userId.value,
  catalog_name: form.value.catalog_name,
  fields: form.value.selected_headers,
  file: form.value.excel_file
});

    const response = await axios.post(`${import.meta.env.VITE_URL}/CreateTemplate`, formData, {
      headers: {
        'X-XSRF-TOKEN': decodeURIComponent(xsrfToken),
        'Accept': 'application/json'
      },
      withCredentials: true
    });
    if (response.status === 200) {
      console.log('Template created successfully:', response.data);
      step.value = 6;
    }

  } catch (error) {
    alert('Error creating the template. Contact support.');
    console.error('Error creating the template:', error);
  } finally {
    loading.value = false;
  }
};


// Reiniciar formulario
const resetForm = () => {
  form.value = {
    catalog_name: '',
    excel_file: null,
    selected_headers: [],
    message: '',
  };
  excelHeaders.value = [];
  step.value = 1;
};

// Redirigir
const goToDashboard = () => {
  window.location.href = '/dashboard'; // o router push si usas Vue Router
};

// Obtener usuario al cargar
onMounted(fetchUserId);
</script>


<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center">
    <div class="w-full max-w-3xl bg-white p-8 rounded-2xl shadow-xl relative">

      <!-- Progress Bar -->
      <div class="mb-6" v-if="step <= 6">
        <div class="flex justify-between mb-2">
          <span>Step {{ step }} of 6</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div class="bg-blue-500 h-2 rounded-full" :style="{ width: (step / 6 * 100) + '%' }"></div>
        </div>
      </div>

      <!-- Transition for steps -->
      <transition name="fade-slide" mode="out-in">
        <div :key="step">
          <!-- Step 1: Catalog Name -->
          <div v-if="step === 1">
            <h2 class="text-3xl font-bold mb-4 flex items-center">
              <svg class="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"></path></svg>
              Catalog Name
            </h2>
            <input v-model="form.catalog_name" class="w-full p-3 border rounded-xl" placeholder="e.g. Wine Catalog">
            <div class="flex justify-end mt-6">
             <button
              @click="nextStep"
              :disabled="!form.catalog_name.trim()"
              class="bg-blue-500 text-white px-6 py-2 rounded-xl shadow hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Next
              </button>
            </div>
          </div>

          <!-- Step 2: Upload Excel -->
          <div v-else-if="step === 2">
            <h2 class="text-3xl font-bold mb-4 flex items-center">
              <svg class="w-6 h-6 mr-2 text-green-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 7h18M3 12h18M3 17h18"></path></svg>
              Upload Excel File
            </h2>
            <input type="file" @change="handleFileUpload" class="w-full p-3 border rounded-xl">
            <div class="flex justify-between mt-6">
              <button @click="prevStep" class="bg-gray-400 text-white px-6 py-2 rounded-xl shadow hover:bg-gray-500 transition">Back</button>
              <button @click="analyzeExcel" :disabled="!form.excel_file" class="bg-blue-500 text-white px-6 py-2 rounded-xl shadow hover:bg-blue-600 transition">Analyze</button>
            </div>
          </div>

          <!-- Step 3: Order Headers -->
          <div v-else-if="step === 3" class="bg-white p-6 rounded shadow">
            <h3 class="text-lg font-bold mb-4 text-center">Reorder and select Fields</h3>
            <draggable
              v-model="form.selected_headers"
              item-key="name"
              class="bg-gray-50 p-4 rounded shadow space-y-2"
              animation="200"
              ghost-class="ghost"
              chosen-class="chosen"
              drag-class="drag"
            >
              <template #item="{ element, index }">
                <div class="p-3 bg-gray-100 rounded cursor-move flex items-center justify-between transition-all duration-200">
                  <div class="flex items-center">
                    <span class="font-semibold text-gray-700 mr-2">{{ index + 1 }}.</span>
                    <span class="text-gray-900">{{ element.name }}</span>
                  </div>
                  <input type="checkbox" v-model="element.active" class="form-checkbox h-5 w-5 text-blue-600">
                </div>
              </template>
            </draggable>
            <div class="flex justify-between mt-6">
              <button @click="prevStep" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Back</button>
              <button @click="nextStep" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Next</button>
            </div>
          </div>

          <!-- Step 4: Request Message -->
          <div v-if="step === 4">
            <h2 class="text-3xl font-bold mb-4 flex items-center">
              <svg class="w-6 h-6 mr-2 text-pink-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M8 10h.01M12 10h.01M16 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Request Message
            </h2>
            <textarea v-model="form.message" class="w-full p-3 border rounded-xl" rows="3" placeholder="Type your message..."></textarea>
            <div class="flex justify-between mt-6">
              <button @click="prevStep" class="bg-gray-400 text-white px-6 py-2 rounded-xl shadow hover:bg-gray-500 transition">Back</button>
              <button @click="nextStep" class="bg-blue-500 text-white px-6 py-2 rounded-xl shadow hover:bg-blue-600 transition">Next</button>
            </div>
          </div>

          <!-- Step 5: Review Summary -->
          <div v-else-if="step === 5">
            <h2 class="text-3xl font-bold mb-4 flex items-center">
              <svg class="w-6 h-6 mr-2 text-indigo-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4"></path></svg>
              Review Summary
            </h2>

            <div class="mb-4">
              <p><strong>Catalog Name:</strong> {{ form.catalog_name }}</p>
              <p><strong>Selected Headers:</strong></p>
              <ul class="list-disc list-inside ml-4">
                <li v-for="header in form.selected_headers.filter(h => h.active)" :key="header.name">
                  {{ header.name }}</li>
              </ul>
              <p class="mt-2"><strong>Message:</strong> {{ form.message }}</p>
            </div>

            <div class="flex justify-between mt-6">
              <button @click="prevStep" class="bg-gray-400 text-white px-6 py-2 rounded-xl shadow hover:bg-gray-500 transition">Back</button>
              <button @click="submitForm" class="bg-green-500 text-white px-6 py-2 rounded-xl shadow hover:bg-green-600 transition">Confirm</button>
            </div>
          </div>

          <!-- Step 6: Confirmation -->
          <div v-else-if="step === 6">
            <h2 class="text-3xl font-bold mb-4 text-green-600">Notification Created!</h2>
            <p class="mb-6">Your request has been created successfully. We will review it shortly, and you will be able to create your catalog.</p>
            <div class="flex justify-center space-x-4">
              <button @click="resetForm" class="bg-blue-500 text-white px-6 py-2 rounded-xl shadow hover:bg-blue-600 transition">Create Another</button>
              <button @click="goToDashboard" class="bg-gray-600 text-white px-6 py-2 rounded-xl shadow hover:bg-gray-700 transition">Go to Dashboard</button>
            </div>
          </div>
          <div v-if="loading" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-20 w-20"></div>
          </div>
        </div>
      </transition>
    </div>
    <div class="mt-12">
      <BackButton
        class="fixed bottom-6 left-6 bg-gray-800 text-white px-4 py-2 rounded-lg shadow transition-all duration-300 ease-in-out hover:px-6"
      />
    </div>
  </div>
</template>

<style scoped>
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.5s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
.loader {
  border-top-color: #3498db;
  animation: spin 1s infinite linear;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
.ghost {
  opacity: 0.4;
}

.chosen {
  background: #cbd5e1;
}

.drag {
  transition: all 0.2s ease;
  transform: scale(1.05);
}
</style>
