<script lang="ts">
export default {
  data() {
    return {
      step: 1,
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
    handleFileUpload(event) {
      this.form.excel_file = event.target.files[0];
    },
    analyzeExcel() {
      // Aquí simulas o haces una petición real al backend
      // Simulación de encabezados:
      this.excelHeaders = ['Código', 'Variedad', 'Origen', 'Precio', 'Stock'];
      this.nextStep();
    },
    async submitForm() {
      // Aquí haces la petición al backend para guardar en la tabla notifications
      const formData = new FormData();
      formData.append('catalog_name', this.form.catalog_name);
      formData.append('excel_file', this.form.excel_file);
      formData.append('fields_order', JSON.stringify(this.form.selected_headers));
      formData.append('message', this.form.message);

      await fetch('/api/notifications', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': 'Bearer tu_token_aqui', // Si usas API protegida
        },
      });

      this.step = 6; // Confirmación
    },
  },
};
</script>


<template>
  <div class="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
    <!-- Paso 1 -->
    <div v-if="step === 1">
      <h2 class="text-2xl font-bold mb-4">Step 1: Catalog Name</h2>
      <input v-model="form.catalog_name" class="w-full p-2 border rounded" placeholder="Ej: Wine Catalog" />
      <div class="flex justify-end mt-4">
        <button @click="nextStep" class="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
      </div>
    </div>

    <!-- Paso 2 -->
    <div v-if="step === 2">
      <h2 class="text-2xl font-bold mb-4">Step 2: Upload you're excel file</h2>
      <input type="file" @change="handleFileUpload" class="w-full p-2 border rounded" placeholder="Select an Excel file" />
      <div class="flex justify-between mt-4">
        <button @click="prevStep" class="bg-gray-500 text-white px-4 py-2 rounded">Back</button>
        <button @click="analyzeExcel" :disabled="!form.excel_file" class="bg-blue-500 text-white px-4 py-2 rounded">Analize</button>
      </div>
    </div>

    <!-- Paso 3 -->
    <div v-if="step === 3">
      <h2 class="text-2xl font-bold mb-4">Step 3: Select the Headers</h2>
      <div v-for="header in excelHeaders" :key="header">
        <input type="checkbox" :value="header" v-model="form.selected_headers"> {{ header }}
      </div>
      <div class="flex justify-between mt-4">
        <button @click="prevStep" class="bg-gray-500 text-white px-4 py-2 rounded">back</button>
        <button @click="nextStep" :disabled="form.selected_headers.length === 0" class="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
      </div>
    </div>

    <!-- Paso 4 -->
    <div v-if="step === 4">
      <h2 class="text-2xl font-bold mb-4">Step 4: Order the Headers</h2>
      <ul>
        <li v-for="(header, index) in form.selected_headers" :key="index" class="mb-2">
          {{ index + 1 }}. {{ header }}
        </li>
      </ul>
      <!-- Se puede mejorar con drag&drop -->
      <div class="flex justify-between mt-4">
        <button @click="prevStep" class="bg-gray-500 text-white px-4 py-2 rounded">Back</button>
        <button @click="nextStep" class="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
      </div>
    </div>

    <!-- Paso 5 -->
    <div v-if="step === 5">
      <h2 class="text-2xl font-bold mb-4">Step 5: Request Message</h2>
      <textarea v-model="form.message" class="w-full p-2 border rounded" rows="3" placeholder="Escribe el mensaje..."></textarea>
      <div class="flex justify-between mt-4">
        <button @click="prevStep" class="bg-gray-500 text-white px-4 py-2 rounded">Back</button>
        <button @click="submitForm" class="bg-green-500 text-white px-4 py-2 rounded">Finish!</button>
      </div>
    </div>

    <!-- Confirmación -->
    <div v-if="step === 6">
      <h2 class="text-2xl font-bold mb-4 text-green-600">Notification Created!</h2>
      <p>We will review the request and notify you when it is available.</p>
    </div>
  </div>
</template>
