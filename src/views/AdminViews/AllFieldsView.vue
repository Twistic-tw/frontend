<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

const fields = ref([])

onMounted(async () => {
  try {
    const res = await axios.get('https://api-catalogos.twistic.app/api/ViewFields')
    fields.value = res.data
  } catch (error) {
    console.error('Error al cargar los campos:', error)
    fields.value = []
  }
})
</script>

<template>
  <div class="p-6 bg-gradient-to-b from-gray-100 to-white min-h-screen">
    <h2 class="text-3xl font-bold text-violet-700 mb-6 text-center">Campos Disponibles</h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="field in fields"
        :key="field.id"
        class="bg-white rounded-xl shadow-md p-4 border border-violet-200 hover:shadow-lg transition"
      >
        <h3 class="text-xl font-semibold text-violet-700 mb-2">#{{ field.id }} - {{ field.field }}</h3>
        <p class="text-sm text-gray-500 mb-1">Creado: <span class="font-medium text-gray-700">{{ new Date(field.created_at).toLocaleDateString() }}</span></p>
        <p class="text-sm text-gray-500 mb-1">Actualizado: <span class="font-medium text-gray-700">{{ new Date(field.updated_at).toLocaleDateString() }}</span></p>
      </div>
    </div>

    <div v-if="fields.length === 0" class="text-center text-gray-500 mt-8">
      No hay campos disponibles
    </div>
  </div>
</template>
