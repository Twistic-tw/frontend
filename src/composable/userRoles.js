import { ref, onMounted } from 'vue'

export function userRoles() {
  const role = ref('')

  onMounted(() => {
    const savedRole = sessionStorage.getItem('userRole')
    if (savedRole) {
      role.value = savedRole
    }
  })

  return { role }
}
