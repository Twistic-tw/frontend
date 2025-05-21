<script setup lang="ts">
import { useUserListManagement } from '../../composable/userListManagement';
import BackButton from '@/components/BackButton.vue';
import ConfirmDialog from '@/components/ConfirmDialog.vue';

const {
  error, searchQuery, filteredUsers,
  deleteUser, editUser, mostrarModal, guardarCambios,
  openCreateModal, showCreateModal, submitCreateUser, closeCreateModal,
  showConfirm, confirmMessage, handleConfirm, cancelConfirm
} = useUserListManagement();
</script>

<template>
  <!-- Modal de confirmación con fade -->
  <ConfirmDialog
    :visible="showConfirm"
    :message="confirmMessage"
    @confirm="handleConfirm"
    @cancel="cancelConfirm"
  />

  <div class="min-h-screen bg-gradient-to-b from-gray-100 to-white p-6 mt-3">
    <h1 class="text-3xl font-bold text-gray-800 dark:text-gray-800 mb-6 text-center">Users Management</h1>

    <!-- Barra de Búsqueda -->
    <div class="mb-6 max-w-md mx-auto">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search user by name..."
        class="w-full px-4 py-2 rounded-lg bg-white border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>

    <!-- Botón para abrir modal -->
    <div class="text-center mb-6">
      <button @click="openCreateModal" class="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg">
        New user
      </button>
    </div>

    <!-- Modal Crear Usuario -->
    <transition name="fade-modal">
      <div v-if="showCreateModal" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
        <div class="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl w-full max-w-sm sm:max-w-lg shadow-xl transition-all duration-300 transform scale-95 hover:scale-100">
          <h2 class="text-lg sm:text-xl font-bold mb-4 text-gray-800 dark:text-white">New user</h2>
          <form @submit.prevent="submitCreateUser">
            <!-- Campos del formulario -->
            <!-- Añádelos aquí -->
            <div class="flex justify-end space-x-2 mt-4">
              <button type="button" @click="closeCreateModal" class="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white rounded-md">Cancelar</button>
              <button type="submit" class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">Save</button>
            </div>
          </form>
        </div>
      </div>
    </transition>

    <!-- Usuarios Filtrados -->
    <div v-if="filteredUsers.length > 0" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <div v-for="user in filteredUsers" :key="user.id" class="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 hover:shadow-lg transition">
        <h2 class="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2">{{ user.nombre }}</h2>
        <p class="text-gray-700 dark:text-gray-200"><strong>Email:</strong> {{ user.email }}</p>
        <p class="text-gray-700 dark:text-gray-200"><strong>Position:</strong> {{ user.cargo }}</p>

        <!-- Botones de acción -->
        <div class="mt-4 flex space-x-2">
          <button @click="editUser(user)" class="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-lg">
            Edit
          </button>
          <button @click="deleteUser(user.id)" class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
            Delete
          </button>
        </div>
      </div>
    </div>

    <!-- Si no hay usuarios -->
    <div v-else class="text-center text-gray-600 dark:text-gray-400">
      No users found.
    </div>

    <!-- Si hay error -->
    <div v-if="error" class="text-center text-red-500 mt-6">
      Failed to load users.
    </div>

    <!-- Modal de edición -->
    <transition name="fade-modal">
      <div v-if="mostrarModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 px-4">
        <div class="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-xl w-full max-w-sm sm:max-w-md transform transition-all duration-300 scale-95 hover:scale-100">
          <h2 class="text-lg sm:text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Edit User</h2>
          <form @submit.prevent="guardarCambios">
            <!-- Campos edición aquí -->
            <div class="flex justify-end space-x-2">
              <button type="button" @click="mostrarModal = false" class="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500">Cancel</button>
              <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
            </div>
          </form>
        </div>
      </div>
    </transition>

    <!-- Botón Volver -->
    <div class="mt-12">
      <BackButton class="fixed bottom-6 left-6 bg-gray-800 text-white px-4 py-2 rounded-lg shadow transition-all duration-300 ease-in-out hover:px-6" />
    </div>
  </div>
</template>

<style scoped>
.fade-modal-enter-active,
.fade-modal-leave-active {
  transition: opacity 0.3s ease;
}
.fade-modal-enter-from,
.fade-modal-leave-to {
  opacity: 0;
}
.fade-modal-enter-to,
.fade-modal-leave-from {
  opacity: 1;
}
</style>
