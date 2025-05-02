import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

// Interface para el usuario
interface User {
  id: number;
  nombre: string;
  email: string;
  cargo: string;
  idioma: string;
  rol: string;
}

export function useUserListManagement() {
  const users = ref<User[]>([]);
  const loading = ref(true);
  const error = ref(false);
  const searchQuery = ref('');

  // Modales y formularios
  const mostrarModal = ref(false);
  const usuarioSeleccionado = ref<User | null>(null);
  const nuevaPassword = ref('');

  const showCreateModal = ref(false);
  const newUser = ref({ nombre: '', email: '', cargo: '', password: '', idioma: '' , rol: '' });

  // Obtener usuarios
  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://api-catalogos.twistic.app/api/Users', {
        withCredentials: true,
        headers: { Accept: 'application/json' }
      });
      users.value = response.data;
    } catch (err) {
      console.error('Error fetching users:', err);
      error.value = true;
    } finally {
      loading.value = false;
    }
  };

  // Obtener idiomas
  const idiomasDisponibles = ref([]);

  const fetchIdiomas = async () => {
    try {
      const response = await axios.get('https://api-catalogos.twistic.app/api/showlanguages', {
        withCredentials: true,
      });
      idiomasDisponibles.value = response.data;
    } catch (err) {
      console.error('Error loading languages:', err);
    }
  };

  // Filtrar usuarios
  const filteredUsers = computed(() => {
    return users.value.filter(user =>
      user.nombre.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });

  // Crear usuario
  const openCreateModal = () => { showCreateModal.value = true; };
  const closeCreateModal = () => {
    showCreateModal.value = false;
    newUser.value = { nombre: '', email: '', cargo: '', password: '', idioma: '' , rol: '' };
  };

  const submitCreateUser = async () => {
    try {
      const xsrfToken = document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1];
      if (!xsrfToken) { alert('Session expired.'); return; }

      await axios.post('https://api-catalogos.twistic.app/api/Users', newUser.value, {
        withCredentials: true,
        headers: {
          'X-XSRF-TOKEN': decodeURIComponent(xsrfToken),
          'Accept': 'application/json'
        }
      });

      await fetchUsers();
      closeCreateModal();
      alert('User created successfully.');
    } catch (err) {
      alert('Error creating user.');
      console.error('Error creating user:', err);
    }
  };

  // Editar usuario
  const editUser = (user: User) => {
    usuarioSeleccionado.value = { ...user };
    nuevaPassword.value = '';
    mostrarModal.value = true;
  };

  const guardarCambios = async () => {
    if (!usuarioSeleccionado.value) return;

    try {
      const xsrfToken = document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1];

      const payload: { nombre: string; cargo: string; email: string; password?: string } = {
        nombre: usuarioSeleccionado.value.nombre,
        cargo: usuarioSeleccionado.value.cargo,
        email: usuarioSeleccionado.value.email
      };

      if (nuevaPassword.value.trim() !== '') {
        payload.password = nuevaPassword.value;
      }

      await axios.put(`https://api-catalogos.twistic.app/api/Users/${usuarioSeleccionado.value.id}`, payload, {
        withCredentials: true,
        headers: {
          'X-XSRF-TOKEN': decodeURIComponent(xsrfToken),
          'Accept': 'application/json'
        }
      });

      alert('User updated successfully.');
      mostrarModal.value = false;
      fetchUsers();
      nuevaPassword.value = '';
    } catch (error) {
      alert('Error updating user.');
    }
  };

  // Eliminar usuario
  const deleteUser = async (id: number) => {
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        const xsrfToken = document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1];

        await axios.delete(`https://api-catalogos.twistic.app/api/Users/${id}`, {
          withCredentials: true,
          headers: {
            'X-XSRF-TOKEN': decodeURIComponent(xsrfToken),
            'Accept': 'application/json'
          }
        });

        users.value = users.value.filter(user => user.id !== id);
        alert('User deleted successfully.');
      } catch (err) {
        alert('Error deleting user.');
      }
    }
  };

  onMounted(() => {
    fetchUsers();
    fetchIdiomas();
  });

  return {
    users, loading, error, searchQuery, filteredUsers,
    deleteUser, editUser, mostrarModal, usuarioSeleccionado,
    nuevaPassword, guardarCambios,
    openCreateModal, showCreateModal, submitCreateUser, newUser, closeCreateModal,
    idiomasDisponibles, fetchIdiomas
  };
}
