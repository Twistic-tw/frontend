var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
export function useUserListManagement() {
    const users = ref([]);
    const loading = ref(true);
    const error = ref(false);
    const searchQuery = ref('');
    // Modales y formularios
    const mostrarModal = ref(false);
    const usuarioSeleccionado = ref(null);
    const nuevaPassword = ref('');
    const showCreateModal = ref(false);
    const newUser = ref({ nombre: '', email: '', cargo: '', password: '', idioma: '', rol: '' });
    // Obtener usuarios
    const fetchUsers = () => __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios.get(`${import.meta.env.VITE_URL}/Users`, {
                withCredentials: true,
                headers: { Accept: 'application/json' }
            });
            users.value = response.data;
        }
        catch (err) {
            console.error('Error fetching users:', err);
            error.value = true;
        }
        finally {
            loading.value = false;
        }
    });
    // Obtener idiomas
    const idiomasDisponibles = ref([]);
    const fetchIdiomas = () => __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield axios.get(`${import.meta.env.VITE_URL}/showlanguages`, {
                withCredentials: true,
            });
            idiomasDisponibles.value = response.data;
        }
        catch (err) {
            console.error('Error loading languages:', err);
        }
    });
    // Filtrar usuarios
    const filteredUsers = computed(() => {
        return users.value.filter(user => user.nombre.toLowerCase().includes(searchQuery.value.toLowerCase()));
    });
    // Crear usuario
    const openCreateModal = () => { showCreateModal.value = true; };
    const closeCreateModal = () => {
        showCreateModal.value = false;
        newUser.value = { nombre: '', email: '', cargo: '', password: '', idioma: '', rol: '' };
    };
    const submitCreateUser = () => __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        try {
            const xsrfToken = (_a = document.cookie.match(/XSRF-TOKEN=([^;]+)/)) === null || _a === void 0 ? void 0 : _a[1];
            if (!xsrfToken) {
                alert('Session expired.');
                return;
            }
            yield axios.post(`${import.meta.env.VITE_URL}/Users`, newUser.value, {
                withCredentials: true,
                headers: {
                    'X-XSRF-TOKEN': decodeURIComponent(xsrfToken),
                    'Accept': 'application/json'
                }
            });
            yield fetchUsers();
            closeCreateModal();
            alert('User created successfully.');
        }
        catch (err) {
            if (((_b = err.response) === null || _b === void 0 ? void 0 : _b.status) === 422) {
            }
            else {
                alert("Duplicated email. The user already exists.");
            }
            alert('Error creating user.');
            console.error('Error creating user:', err);
        }
    });
    // Editar usuario
    const editUser = (user) => {
        usuarioSeleccionado.value = Object.assign({}, user);
        nuevaPassword.value = '';
        mostrarModal.value = true;
    };
    const guardarCambios = () => __awaiter(this, void 0, void 0, function* () {
        var _a;
        if (!usuarioSeleccionado.value)
            return;
        try {
            const xsrfToken = (_a = document.cookie.match(/XSRF-TOKEN=([^;]+)/)) === null || _a === void 0 ? void 0 : _a[1];
            const payload = {
                nombre: usuarioSeleccionado.value.nombre,
                cargo: usuarioSeleccionado.value.cargo,
                email: usuarioSeleccionado.value.email
            };
            if (nuevaPassword.value.trim() !== '') {
                payload.password = nuevaPassword.value;
            }
            yield axios.put(`https://api-catalogos.twistic.app/api/Users/${usuarioSeleccionado.value.id}`, payload, {
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
        }
        catch (error) {
            alert('Error updating user.');
        }
    });
    // Eliminar usuario
    const deleteUser = (id) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        if (confirm('Are you sure you want to delete this user?')) {
            try {
                const xsrfToken = (_a = document.cookie.match(/XSRF-TOKEN=([^;]+)/)) === null || _a === void 0 ? void 0 : _a[1];
                yield axios.delete(`https://api-catalogos.twistic.app/api/Users/${id}`, {
                    withCredentials: true,
                    headers: {
                        'X-XSRF-TOKEN': decodeURIComponent(xsrfToken),
                        'Accept': 'application/json'
                    }
                });
                users.value = users.value.filter(user => user.id !== id);
                alert('User deleted successfully.');
            }
            catch (err) {
                alert('Error deleting user.');
            }
        }
    });
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
