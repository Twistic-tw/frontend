import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

export function Contact() {
  const router = useRouter()

  const email = ref('')
  const name = ref('')
  const message = ref('')
  const statusMessage = ref('')

  const handleRegister = () => {
    statusMessage.value = 'Sending...'

    axios.post(`${import.meta.env.VITE_URL}contact`, {
      nombre: name.value,
      email: email.value,
      message: message.value
    })
    .then(() => {
      statusMessage.value = 'Message sent. Redirecting...'
      setTimeout(() => {
        router.push('/login')
      }, 1500)
    })
    .catch(error => {
      console.error('Error en el registro:', error)
      statusMessage.value = 'Error sending. Please check your data.'
    })
  }

  return {
    email,
    name,
    message,
    statusMessage,
    handleRegister
  }
}
