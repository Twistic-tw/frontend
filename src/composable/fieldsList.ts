import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'

export function useFields() {
  const toast = useToast()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fields = ref<any[]>([])
  const camposSeleccionados = ref<number[]>([])

  const showConfirm = ref(false)
  const confirmMessage = ref('')
  let confirmCallback = () => {}

  const todosSeleccionados = computed(
    () => camposSeleccionados.value.length === fields.value.length && fields.value.length > 0,
  )

  function toggleSeleccionarTodos() {
    if (todosSeleccionados.value) {
      camposSeleccionados.value = []
    } else {
      camposSeleccionados.value = fields.value.map((f) => f.id)
    }
  }

  async function cargarCampos() {
    try {
      const res = await axios.get(`${import.meta.env.VITE_URL}/ViewFields`)
      fields.value = res.data
    } catch (error) {
      console.error('Error loading fields:', error)
      fields.value = []
    }
  }

  function showDeleteConfirm(message: string, onConfirm: () => void) {
    confirmMessage.value = message
    confirmCallback = onConfirm
    showConfirm.value = true
  }

  function handleConfirm() {
    showConfirm.value = false
    confirmCallback()
  }

  function cancelConfirm() {
    showConfirm.value = false
  }

  async function eliminarCampo(id: number) {
    showDeleteConfirm('Are you sure you want to delete this field?', async () => {
      try {
        const xsrfToken = document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1]
        if (!xsrfToken) {
          toast.error('CSRF token not found. Please reload the page.')
          return
        }

        await axios.delete(`${import.meta.env.VITE_URL}/DeleteField/${id}`, {
          withCredentials: true,
          headers: {
            'X-XSRF-TOKEN': decodeURIComponent(xsrfToken),
            Accept: 'application/json',
          },
        })

        fields.value = fields.value.filter((field) => field.id !== id)
        camposSeleccionados.value = camposSeleccionados.value.filter((cid) => cid !== id)
        toast.success('Field deleted successfully.')
      } catch (error) {
        console.error('Error deleting field:', error)
        toast.error('An error occurred while deleting the field.')
      }
    })
  }

  async function eliminarCamposSeleccionados() {
    showDeleteConfirm(`Are you sure you want to delete ${camposSeleccionados.value.length} selected field(s)?`, async () => {
      try {
        const xsrfToken = document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1]
        if (!xsrfToken) {
          toast.error('CSRF token not found. Please reload the page.')
          return
        }

        await axios.post(
          `${import.meta.env.VITE_URL}/DeleteFields`,
          {
            ids: camposSeleccionados.value,
          },
          {
            withCredentials: true,
            headers: {
              'X-XSRF-TOKEN': decodeURIComponent(xsrfToken),
              Accept: 'application/json',
            },
          },
        )

        fields.value = fields.value.filter((f) => !camposSeleccionados.value.includes(f.id))
        camposSeleccionados.value = []
        toast.success('Selected fields deleted.')
      } catch (error) {
        console.error('Error deleting fields:', error)
        toast.error('There was an error deleting the fields.')
      }
    })
  }

  onMounted(cargarCampos)

  return {
    fields,
    camposSeleccionados,
    todosSeleccionados,
    toggleSeleccionarTodos,
    eliminarCampo,
    eliminarCamposSeleccionados,
    showConfirm,
    confirmMessage,
    handleConfirm,
    cancelConfirm
  }
}
