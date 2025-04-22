<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue'
import axios from 'axios'

export default defineComponent({
  name: 'UsersList',
  setup() {
    interface User {
      id: number;
      nombre: string;
      email: string;
      cargo: string;
    }

    const users = ref<User[]>([])
    const loading = ref(true)
    const error = ref(false)
    const searchQuery = ref('')

    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://api-catalogos.twistic.app/api/users', {
          withCredentials: true,
          headers: { Accept: 'application/json' }
        })
        users.value = response.data
      } catch (err: unknown) {
        console.error('Error fetching users:', err)
        error.value = true
      } finally {
        loading.value = false
      }
    }

    const deleteUser = async (id: number) => {
      if (confirm('Are you sure you want to delete this user?')) {
        try {
          await axios.delete(`https://api-catalogos.twistic.app/api/Users/${id}`, {
            withCredentials: true,
            headers: { Accept: 'application/json' }
          })
          users.value = users.value.filter(user => user.id !== id)
          alert('User deleted successfully')
        } catch (err) {
          console.error('Error deleting user:', err)
          alert('Failed to delete user')
        }
      }
    }

    const editUser = (user: User) => {
      // Aquí puedes redirigir a un formulario o abrir un modal, tú mandas 👑
      alert(`Editing user: ${user.nombre}`)
      // Por ejemplo: router.push(`/edit-user/${user.id}`)
    }

    const filteredUsers = computed(() => {
      return users.value.filter(user =>
        user.nombre.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    })

    onMounted(fetchUsers)

    return {
      users,
      loading,
      error,
      searchQuery,
      filteredUsers,
      deleteUser,
      editUser
    }
  }
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-r from-white via-slate-200 to-slate-400 dark:from-neutral-950 dark:to-slate-900 p-6 mt-12">
    <h1 class="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">User Management</h1>

    <!-- Barra de Búsqueda -->
    <div class="mb-6 max-w-md mx-auto">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search user by name..."
        class="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>

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
  </div>
</template>
