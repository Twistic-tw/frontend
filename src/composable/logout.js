import { useRouter } from 'vue-router';
import axios from 'axios';

export function useLogout() {
  const router = useRouter();
  console.log('Router:', router);

  const logout = async () => {
    try {
      // Llamada al backend para cerrar sesión
      await axios.post('https://api-catalogos.twistic.app/api/Logout', {}, {
        withCredentials: true,
      });

      // Limpiar storage y cookies
      sessionStorage.clear();
      localStorage.clear();
      document.cookie.split(";").forEach(c => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
      });

      // Redirigir al home
      await router.push('/');
      window.location.reload(); // para forzar limpieza en frontend
    } catch (error) {
      console.error('Error cerrando sesión:', error);
      router.push('/');
    }
  };

  return { logout };
}
