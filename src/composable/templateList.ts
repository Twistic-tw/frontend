import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'

export function useTemplates() {
  const toast = useToast()
  const usuarios = ref([])
  const plantillas = ref([])
  const plantillasSeleccionadas = ref<number[]>([])
  const mostrarDialogo = ref(false)
  const modoConfirmacion = ref<'individual' | 'multiple' | null>(null)
  const idAEliminar = ref<number | null>(null)

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
    mostrarDialogo.value = true
    modoConfirmacion.value = 'individual'
    idAEliminar.value = id
  }

  async function confirmarEliminacion() {
    const xsrfToken = document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1]
    if (!xsrfToken) {
      toast.error('No CSRF token')
      return
    }

    try {
      if (modoConfirmacion.value === 'individual' && idAEliminar.value !== null) {
        await axios.delete(`${import.meta.env.VITE_URL}/DeleteTemplate/${idAEliminar.value}`, {
          withCredentials: true,
          headers: {
            'X-XSRF-TOKEN': decodeURIComponent(xsrfToken),
            Accept: 'application/json',
          },
        })
        plantillas.value = plantillas.value.filter(p => p.id !== idAEliminar.value)
        plantillasSeleccionadas.value = plantillasSeleccionadas.value.filter(pid => pid !== idAEliminar.value)
        toast.success('Deleted!')
      } else if (modoConfirmacion.value === 'multiple') {
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
      }
    } catch (err) {
      toast.error('Error deleting')
    } finally {
      mostrarDialogo.value = false
      idAEliminar.value = null
      modoConfirmacion.value = null
    }
  }

  function pedirConfirmacionMultiple() {
    if (plantillasSeleccionadas.value.length > 0) {
      mostrarDialogo.value = true
      modoConfirmacion.value = 'multiple'
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
    eliminarSeleccionadas: pedirConfirmacionMultiple,
    confirmarEliminacion,
    mostrarDialogo,
    modoConfirmacion
  }
}
