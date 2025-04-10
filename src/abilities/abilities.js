import { defineAbility } from '@casl/ability';

/**
 * Define las abilities del usuario basado en su rol
 * @param {Object} user - Usuario con información del rol
 */
export default function defineUserAbility(user) {
  return defineAbility((can, cannot) => {
    // Permiso base para todos: gestionar su perfil
    can('manage', 'profile');

    if (user.role?.name === 'ROLE_ADMINISTRATOR') {
      can('manage', 'all'); // Admin hace todo
    } else {
      // Cualquier otro rol = Cliente
      can('read', 'catalog');         // Ver catálogos
      can('create', 'notification');  // Enviar notificaciones
      can('create', 'pdf');            // Generar PDFs
    }
  });
}
