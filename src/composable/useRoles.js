import { computed } from 'vue';
import { useAbility } from '@casl/vue';

/**
 * Composable para calcular el rol basado en las abilities
 * @returns {ComputedRef<'admin' | 'client' | 'unlogged'>} rol reactivo
 */
export function useRole() {
  const ability = useAbility();

  const role = computed(() => {
    if (ability.can('manage', 'all')) {
      return 'admin';
    } else if (ability.can('read', 'Public')) {
      return 'client';
    } else {
      return 'unlogged';
    }
  });

  return {
    role
  };
}
