import { AbilityBuilder, Ability } from '@casl/ability';

/**
 * @param {String} role - Rol principal del usuario
 * @param {Array} permissions - Array de permisos extra personalizados
 */
export function defineAbilitiesFor(role, permissions = []) {
  const { can, cannot, build } = new AbilityBuilder(Ability);

  switch (role) {
    case 'ROLE_ADMINISTRATOR':
      can('manage', 'all'); // El admin puede TODO
      break;

    case 'ROLE_READING':
      can('read', 'Public'); // Clientes básicos pueden leer cosas públicas
      // Ahora añadimos los permisos personalizados
      permissions.forEach(permission => {
        can(permission.action, permission.subject);
      });
      break;

    default:
      can('read', 'Public'); // Visitantes
      break;
  }

  return build();
}
