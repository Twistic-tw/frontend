import { ref, watch, onMounted } from 'vue'
import axios from 'axios'

export function useCatalogManager() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const usuarios = ref<any[]>([])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const catalogos = ref<any[]>([])
  const usuarioSeleccionado = ref('')
  const role = sessionStorage.getItem('userRole')
  const baseUrl = import.meta.env.VITE_URL

  // Cargar usuarios
  async function cargarUsuarios() {
    try {
      const res = await axios.get(`${baseUrl}/Users`, {
        withCredentials: true,
      })
      usuarios.value = res.data
    } catch (error) {
      console.error('Error al cargar usuarios:', error)
    }
  }

  // Cargar catálogos (con o sin filtro de usuario)
  async function cargarCatalogos() {
    try {
      let url = `${baseUrl}/ShowCatalogs`
      if (usuarioSeleccionado.value) {
        url += `?id_user=${usuarioSeleccionado.value}`
      }

      const res = await axios.get(url, {
        withCredentials: true,
      })

      catalogos.value = res.data.data || []
    } catch (error) {
      console.error('Error al cargar catálogos:', error)
      catalogos.value = []
    }
  }

  // Inicialización y observadores
  onMounted(() => {
    cargarCatalogos()
    cargarUsuarios()
  })

  watch(usuarioSeleccionado, () => {
    cargarCatalogos()
  })

  return {
    usuarios,
    catalogos,
    usuarioSeleccionado,
    role,
    baseUrl,
    cargarUsuarios,
    cargarCatalogos,
  }
}
