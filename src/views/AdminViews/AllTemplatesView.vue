
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'

const usuarios = ref([])
const plantillas = ref([])
const usuarioSeleccionado = ref('')

// Cargar usuarios al iniciar
onMounted(async () => {
  try {
    const resUsers = await axios.get('https://api-catalogos.twistic.app/api/users')
    usuarios.value = resUsers.data

    await cargarPlantillas() // carga inicial con todas las plantillas
  } catch (error) {
    console.error('Error al cargar usuarios o plantillas:', error)
  }
})

// Cargar plantillas (todas o por usuario)
async function cargarPlantillas() {
  try {
    const url = usuarioSeleccionado.value
      ? `https://api-catalogos.twistic.app/api/templates?id_user=${usuarioSeleccionado.value}`
      : 'https://api-catalogos.twistic.app/api/ViewTemplates'
    const res = await axios.get(url)
    plantillas.value = res.data
  } catch (error) {
    console.error('Error al cargar plantillas:', error)
    plantillas.value = []
  }
}

// Ver cambios en el select y recargar plantillas
watch(usuarioSeleccionado, () => {
  cargarPlantillas()
})
</script>


<template>
  <div class="p-6 bg-white rounded-xl shadow-md  mt-4">
    <h2 class="text-2xl font-bold text-violet-700 mb-4">Gestión de Plantillas por Usuario</h2>

    <!-- Select de usuarios -->
    <div class="mb-6">
      <label for="userSelect" class="block mb-2 text-sm font-medium text-gray-700">
        Selecciona un usuario:
      </label>
      <select
        id="userSelect"
        v-model="usuarioSeleccionado"
        class="w-full px-4 py-2 border border-violet-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-400"
      >
        <option value="">-- Mostrar todas las plantillas --</option>
        <option v-for="user in usuarios" :key="user.id" :value="user.id">
          {{ user.name }}
        </option>
      </select>
    </div>

    <!-- Tabla de plantillas -->
    <table class="table-auto w-full border border-gray-300">
      <thead class="bg-violet-100">
        <tr>
          <th class="px-4 py-2 border border-gray-300 text-left">ID</th>
          <th class="px-4 py-2 border border-gray-300 text-left">Nombre</th>
          <th class="px-4 py-2 border border-gray-300 text-left">Descripción</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="plantilla in plantillas"
          :key="plantilla.id"
          class="hover:bg-violet-50 transition-colors"
        >
          <td class="px-4 py-2 border border-gray-200">{{ plantilla.id }}</td>
          <td class="px-4 py-2 border border-gray-200">{{ plantilla.nombre }}</td>
          <td class="px-4 py-2 border border-gray-200">{{ plantilla.descripcion }}</td>
        </tr>
        <tr v-if="plantillas.length === 0">
          <td colspan="3" class="text-center text-gray-500 py-4">No hay plantillas disponibles</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
