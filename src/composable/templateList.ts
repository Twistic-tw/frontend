import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'

export function useTemplates() {
  const toast = useToast()
  const usuarios = ref([])
  const plantillas = ref([])
  const plantillasSeleccionadas = ref<number[]>([])

  const mostrarDialogo = ref(false)
  const plantillaAEliminar = ref<number | null>(null)
  const modoConfirmacion = ref<'single' | 'bulk'>('single')

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

  function pedirConfirmacion(id: number) {
    plantillaAEliminar.value = id
    modoConfirmacion.value = 'single'
    mostrarDialogo.value = true
  }

  function pedirConfirmacionMultiple() {
    if (plantillasSeleccionadas.value.length === 0) {
      toast.warning('No hay plantillas seleccionadas.')
      return
    }
    modoConfirmacion.value = 'bulk'
    mostrarDialogo.value = true
  }

  async function confirmarEliminacion() {
    const xsrfToken = document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1]
    if (!xsrfToken) {
      toast.error('No CSRF token')
      mostrarDialogo.value = false
      return
    }

    try {
      if (modoConfirmacion.value === 'single') {
        const id = plantillaAEliminar.value
        if (!id) return
        await axios.delete(`${import.meta.env.VITE_URL}/DeleteTemplate/${id}`, {
          withCredentials: true,
          headers: {
            'X-XSRF-TOKEN': decodeURIComponent(xsrfToken),
            Accept: 'application/json',
          },
        })
        plantillas.value = plantillas.value.filter(p => p.id !== id)
        plantillasSeleccionadas.value = plantillasSeleccionadas.value.filter(pid => pid !== id)
        toast.success('Plantilla eliminada.')
      } else {
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
        toast.success('Plantillas seleccionadas eliminadas.')
      }
    } catch (err) {
      toast.error('Error al eliminar.')
    } finally {
      mostrarDialogo.value = false
      plantillaAEliminar.value = null
      modoConfirmacion.value = 'single'
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
    pedirConfirmacion,
    pedirConfirmacionMultiple,
    confirmarEliminacion,
    mostrarDialogo,
    modoConfirmacion,
  }
}
