<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

const plantillas = ref([])

onMounted(async () => {
  try {
    const res = await axios.get('https://api-catalogos.twistic.app/api/ViewTemplates')
    console.log('Plantillas:', res.data)
    plantillas.value = res.data
  } catch (error) {
    console.error('Error al cargar plantillas:', error)
    plantillas.value = []
  }
})
</script>


<template>
  <div class="p-6 bg-gradient-to-b from-gray-100 to-white min-h-screen">
    <h2 class="text-3xl font-bold text-violet-700 mb-6 text-center">Plantillas Disponibles</h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="plantilla in plantillas"
        :key="plantilla.id"
        class="bg-white rounded-xl shadow-md p-4 border border-violet-200 hover:shadow-lg transition"
      >
        <h3 class="text-xl font-semibold text-violet-700 mb-2">{{ plantilla.name }}</h3>
        <p class="text-sm text-gray-500 mb-4">Creado por: <span class="font-medium text-gray-700">{{ plantilla.user_name }}</span></p>

        <div>
          <h4 class="text-sm font-semibold text-gray-700 mb-2">Campos:</h4>
          <ul class="list-disc list-inside text-gray-600">
            <li v-for="field in plantilla.fields" :key="field.id">{{ field.name }}</li>
          </ul>
        </div>
      </div>
    </div>

    <div v-if="plantillas.length === 0" class="text-center text-gray-500 mt-8">
      No hay plantillas disponibles
    </div>
  </div>
</template>
