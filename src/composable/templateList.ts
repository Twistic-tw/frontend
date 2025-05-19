import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'

export function useTemplates() {
  const toast = useToast()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const usuarios = ref<any[]>([])
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const plantillas = ref<any[]>([])
  const plantillasSeleccionadas = ref<number[]>([])

  const todasSeleccionadas = computed(
    () =>
      plantillasSeleccionadas.value.length === plantillas.value.length &&
      plantillas.value.length > 0,
  )

  function toggleSeleccionarTodas() {
    if (todasSeleccionadas.value) {
      plantillasSeleccionadas.value = []
    } else {
      plantillasSeleccionadas.value = plantillas.value.map((p) => p.id)
    }
  }

  async function loadUsers() {
    try {
      const res = await axios.get(`${import.meta.env.VITE_URL}/Users`, {
        withCredentials: true,
      })
      usuarios.value = res.data
    } catch (error) {
      console.error('Error loading users:', error)
    }
  }

  async function loadTemplates() {
    try {
      const res = await axios.get(`${import.meta.env.VITE_URL}/ViewTemplates`, {
        withCredentials: true,
      })
      plantillas.value = res.data
    } catch (error) {
      console.error('Error loading templates:', error)
    }
  }

  async function eliminarPlantilla(id: number) {
    if (!confirm('Are you sure you want to delete this template?')) return

    try {
      const xsrfToken = document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1]
      if (!xsrfToken) {
        toast.error('CSRF token not found. Please reload the page.')
        return
      }

      await axios.delete(`${import.meta.env.VITE_URL}/DeleteTemplate/${id}`, {
        withCredentials: true,
        headers: {
          'X-XSRF-TOKEN': decodeURIComponent(xsrfToken),
          Accept: 'application/json',
        },
      })

      plantillas.value = plantillas.value.filter((p) => p.id !== id)
      plantillasSeleccionadas.value = plantillasSeleccionadas.value.filter((pid) => pid !== id)
      toast.success('Template successfully deleted.')
    } catch (error) {
      console.error('Error deleting template:', error)
      toast.error('There was an error deleting the template.')
    }
  }

  async function eliminarSeleccionadas() {
    if (
      !confirm(
        `Are you sure you want to delete ${plantillasSeleccionadas.value.length} selected templates?`,
      )
    )
      return

    try {
      const xsrfToken = document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1]
      if (!xsrfToken) {
        toast.error('CSRF token not found. Please reload the page.')
        return
      }

      await axios.post(
        `${import.meta.env.VITE_URL}/DeleteTemplates`,
        {
          ids: plantillasSeleccionadas.value,
        },
        {
          withCredentials: true,
          headers: {
            'X-XSRF-TOKEN': decodeURIComponent(xsrfToken),
            Accept: 'application/json',
          },
        },
      )

      plantillas.value = plantillas.value.filter(
        (p) => !plantillasSeleccionadas.value.includes(p.id),
      )
      plantillasSeleccionadas.value = []
      toast.success('Selected templates deleted.')
    } catch (error) {
      console.error('Error deleting templates:', error)
      toast.error('There was an error deleting the templates.')
    }
  }

  onMounted(async () => {
    await loadUsers()
    await loadTemplates()
  })

  return {
    usuarios,
    plantillas,
    plantillasSeleccionadas,
    todasSeleccionadas,
    toggleSeleccionarTodas,
    eliminarPlantilla,
    eliminarSeleccionadas,
  }
}
