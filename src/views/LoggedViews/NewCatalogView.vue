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
  <div class="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center">
    <div class="w-full max-w-3xl bg-white p-8 rounded-2xl shadow-xl relative">

      <!-- Progress Bar -->
      <div class="mb-6">
        <div class="flex justify-between mb-2">
          <span>Step {{ step }} of 5</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div class="bg-blue-500 h-2 rounded-full" :style="{ width: (step / 5 * 100) + '%' }"></div>
        </div>
      </div>

      <!-- Transition for steps -->
      <transition name="fade-slide" mode="out-in">
        <div :key="step">
          <!-- Step 1 -->
          <div v-if="step === 1">
            <h2 class="text-3xl font-bold mb-4 flex items-center">
              <svg class="w-6 h-6 mr-2 text-blue-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4"></path></svg>
              Catalog Name
            </h2>
            <input v-model="form.catalog_name" class="w-full p-3 border rounded-xl" placeholder="e.g. Wine Catalog">
            <div class="flex justify-end mt-6">
              <button @click="nextStep" class="bg-blue-500 text-white px-6 py-2 rounded-xl shadow hover:bg-blue-600 transition">Next</button>
            </div>
          </div>

          <!-- Step 2 -->
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

          <!-- Step 3: Select Headers -->
          <div v-else-if="step === 3">
            <h2 class="text-3xl font-bold mb-4 flex items-center">
              <svg class="w-6 h-6 mr-2 text-yellow-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg>
              Select Headers
            </h2>
            <div v-for="header in excelHeaders" :key="header" class="mb-2">
              <input type="checkbox" :value="header" v-model="form.selected_headers" class="mr-2"> {{ header }}
            </div>
            <div class="flex justify-between mt-6">
              <button @click="prevStep" class="bg-gray-400 text-white px-6 py-2 rounded-xl shadow hover:bg-gray-500 transition">Back</button>
              <button @click="nextStep" :disabled="form.selected_headers.length === 0" class="bg-blue-500 text-white px-6 py-2 rounded-xl shadow hover:bg-blue-600 transition">Next</button>
            </div>
          </div>

          <!-- Step 4: Order Headers -->
          <div v-else-if="step === 4">
            <h2 class="text-3xl font-bold mb-4 flex items-center">
              <svg class="w-6 h-6 mr-2 text-purple-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"></path></svg>
              Order Headers
            </h2>
            <ul>
              <li v-for="(header, index) in form.selected_headers" :key="index" class="mb-2">
                {{ index + 1 }}. {{ header }}
              </li>
            </ul>
            <div class="flex justify-between mt-6">
              <button @click="prevStep" class="bg-gray-400 text-white px-6 py-2 rounded-xl shadow hover:bg-gray-500 transition">Back</button>
              <button @click="nextStep" class="bg-blue-500 text-white px-6 py-2 rounded-xl shadow hover:bg-blue-600 transition">Next</button>
            </div>
          </div>

          <!-- Step 5: Message -->
          <div v-else-if="step === 5">
            <h2 class="text-3xl font-bold mb-4 flex items-center">
              <svg class="w-6 h-6 mr-2 text-pink-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M8 10h.01M12 10h.01M16 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Request Message
            </h2>
            <textarea v-model="form.message" class="w-full p-3 border rounded-xl" rows="3" placeholder="Type your message..."></textarea>
            <div class="flex justify-between mt-6">
              <button @click="prevStep" class="bg-gray-400 text-white px-6 py-2 rounded-xl shadow hover:bg-gray-500 transition">Back</button>
              <button @click="submitForm" class="bg-green-500 text-white px-6 py-2 rounded-xl shadow hover:bg-green-600 transition">Finish</button>
            </div>
          </div>

          <!-- Step 6: Confirmation -->
          <div v-else-if="step === 6">
            <h2 class="text-3xl font-bold mb-4 text-green-600">Notification Created!</h2>
            <p>Your notification has been saved successfully.</p>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<style>
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
</style>
