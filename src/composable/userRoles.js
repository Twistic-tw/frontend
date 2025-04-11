import { ref, onMounted } from 'vue';

export function useUserRole() {
  const role = ref(null);

  onMounted(() => {
    const savedRole = sessionStorage.getItem('userRole');
    if (savedRole) {
      role.value = savedRole;
    }
  });

  return { role };
}
