import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'

export function useTemplates() {
  const toast = useToast()
  const usuarios = ref([])
  const plantillas = ref([])
  const plantillasSeleccionadas = ref<number[]>([])

  const todasSeleccionadas = computed(
    () => plantillasSeleccionadas.value.length === plantillas.value.length && plantillas.value.length > 0
  )

  function toggleSeleccionarTodas() {
    plantillasSeleccionadas.value = todasSeleccionadas.value ? [] : plantillas.value.map(p => p.id)
  }

  async function loadUsers() {
    try {
      const res = await axios.get(`${import.meta.env.VITE_URL}/Users`, { withCredentials: true })
      usuarios.value = res.data
    } catch (error) {
      console.error('Error loading users:', error)
    }
  }

  async function loadTemplates() {
    try {
      const res = await axios.get(`${import.meta.env.VITE_URL}/ViewTemplates`, { withCredentials: true })
      plantillas.value = res.data
    } catch (error) {
      console.error('Error loading templates:', error)
    }
  }

  async function eliminarPlantilla(id: number) {
    const xsrfToken = document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1]
    if (!xsrfToken) {
      toast.error('No CSRF token')
      return
    }

    try {
      await axios.delete(`${import.meta.env.VITE_URL}/DeleteTemplate/${id}`, {
        withCredentials: true,
        headers: {
          'X-XSRF-TOKEN': decodeURIComponent(xsrfToken),
          Accept: 'application/json',
        },
      })
      plantillas.value = plantillas.value.filter(p => p.id !== id)
      plantillasSeleccionadas.value = plantillasSeleccionadas.value.filter(pid => pid !== id)
      toast.success('Deleted!')
    } catch (err) {
      toast.error('Error deleting')
    }
  }

  async function eliminarSeleccionadas() {
    if (!confirm(`Delete ${plantillasSeleccionadas.value.length} selected?`)) return

    const xsrfToken = document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1]
    if (!xsrfToken) {
      toast.error('No CSRF token')
      return
    }

    try {
      await axios.post(`${import.meta.env.VITE_URL}/DeleteTemplates`, {
        ids: plantillasSeleccionadas.value,
      }, {
        withCredentials: true,
        headers: {
          'X-XSRF-TOKEN': decodeURIComponent(xsrfToken),
          Accept: 'application/json',
        },
      })

      plantillas.value = plantillas.value.filter(p => !plantillasSeleccionadas.value.includes(p.id))
      plantillasSeleccionadas.value = []
      toast.success('Deleted selected templates!')
    } catch (err) {
      toast.error('Error deleting selected')
    }
  }

  onMounted(() => {
    loadUsers()
    loadTemplates()
  })

  return {
    usuarios,
    plantillas,
    plantillasSeleccionadas,
    todasSeleccionadas,
    toggleSeleccionarTodas,
    eliminarPlantilla,
    eliminarSeleccionadas
  }
}
