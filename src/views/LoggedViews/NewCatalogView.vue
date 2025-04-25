<script lang="ts">
import axios from 'axios';
import draggable from 'vuedraggable';

export default {
  components: { draggable },
  data() {
    return {
      step: 1,
      loading: false,
      form: {
        catalog_name: '',
        excel_file: null,
        selected_headers: [],
        message: '',
      },
      excelHeaders: [],
    };
  },
  methods: {
    nextStep() {
      this.step++;
    },
    prevStep() {
      this.step--;
    },
    handleFileUpload(event: Event) {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        this.form.excel_file = target.files[0];
      }
    },
    async analyzeExcel() {
      this.loading = true;
      const formData = new FormData();
      formData.append('file', this.form.excel_file);

      const xsrfToken = document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1];
      if (!xsrfToken) {
        alert('CSRF token not found.');
        this.loading = false;
        return;
      }

      try {
        const response = await axios.post('https://api-catalogos.twistic.app/api/Import', formData, {
          headers: {
            'X-XSRF-TOKEN': decodeURIComponent(xsrfToken),
            'Accept': 'application/json'
          },
          withCredentials: true
        });

        this.excelHeaders = response.data.fields;
        this.form.selected_headers = [...this.excelHeaders];
        this.nextStep();
      } catch (error) {
        console.error('Error analyzing file:', error);
        alert('Error analyzing the file.');
      } finally {
        this.loading = false;
      }
    },
    async submitForm() {
      this.loading = true;
      const formData = new FormData();
      formData.append('file', this.form.excel_file);
      formData.append('template_name', this.form.catalog_name);
      formData.append('fields', JSON.stringify(
        this.form.selected_headers.map((field, index) => ({
          field: field,
          active: true,
          order: index
        }))
      ));
      formData.append('message', this.form.message);

      const xsrfToken = document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1];
      if (!xsrfToken) {
        alert('CSRF token not found.');
        this.loading = false;
        return;
      }

      try {
        await axios.post('https://api-catalogos.twistic.app/api/CreateTemplate', formData, {
          headers: {
            'X-XSRF-TOKEN': decodeURIComponent(xsrfToken),
            'Accept': 'application/json'
          },
          withCredentials: true
        });

        this.step = 5;
      } catch (error) {
        console.error('Error creating template:', error);
        alert('Error creating the template.');
      } finally {
        this.loading = false;
      }
    },
    goToDashboard() {
      this.$router.push('/dashboard');
    }
  }
};
</script>

<template>
  <div class="max-w-2xl mx-auto mt-8">
    <!-- Stepper / Progreso -->
    <div class="mb-6 text-center">
      <h2 class="text-xl font-bold mb-2">Step {{ step }} of 6</h2>
    </div>

    <!-- Paso 1: Nombre del Catálogo -->
    <div v-if="step === 1" class="bg-white p-6 rounded shadow">
      <h3 class="text-lg font-bold mb-4">Catalog Name</h3>
      <input v-model="form.catalog_name" type="text" class="w-full border p-2 rounded mb-4" placeholder="Enter catalog name">
      <div class="flex justify-end">
        <button @click="nextStep" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Next</button>
      </div>
    </div>

    <!-- Paso 2: Subir Excel -->
    <div v-if="step === 2" class="bg-white p-6 rounded shadow">
      <h3 class="text-lg font-bold mb-4">Upload Excel File</h3>
      <input type="file" @change="handleFileUpload" class="w-full border p-2 rounded mb-4">
      <div class="flex justify-between">
        <button @click="prevStep" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Back</button>
        <button @click="analyzeExcel" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Analyze</button>
      </div>
    </div>

    <!-- Paso 3: Ordenar Encabezados -->
    <div v-if="step === 3" class="bg-white p-6 rounded shadow">
      <h3 class="text-lg font-bold mb-4 text-center">Reorder Fields</h3>
      <draggable v-model="form.selected_headers" class="bg-gray-50 p-4 rounded shadow space-y-2" item-key="field" animation="200">
        <template #item="{ element, index }">
          <div class="p-3 bg-gray-100 rounded cursor-move flex items-center">
            <span class="font-semibold text-gray-700 mr-2">{{ index + 1 }}.</span>
            <span class="text-gray-900">{{ element }}</span>
          </div>
        </template>
      </draggable>
      <div class="flex justify-between mt-6">
        <button @click="prevStep" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Back</button>
        <button @click="nextStep" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Next</button>
      </div>
    </div>

    <!-- Paso 4: Mensaje Adicional -->
    <div v-if="step === 4" class="bg-white p-6 rounded shadow">
      <h3 class="text-lg font-bold mb-4">Additional Message</h3>
      <textarea v-model="form.message" class="w-full border p-2 rounded mb-4" placeholder="Enter message"></textarea>
      <div class="flex justify-between">
        <button @click="prevStep" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Back</button>
        <button @click="submitForm" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Submit</button>
      </div>
    </div>

    <!-- Paso 5: Confirmación -->
    <div v-if="step === 5" class="bg-white p-6 rounded shadow text-center">
      <h3 class="text-xl font-bold text-green-600 mb-4">Notification Created!</h3>
      <p class="mb-4">Your request has been created successfully.</p>
      <button @click="goToDashboard" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Go to Dashboard</button>
    </div>

    <!-- Loader -->
    <div v-if="loading" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-20 w-20"></div>
    </div>
  </div>
</template>

<style scoped>
.fade-slide-enter-active, .fade-slide-leave-active {
  transition: all 0.5s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(50px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}
.loader {
  border-top-color: #3498db;
  animation: spin 1s infinite linear;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
