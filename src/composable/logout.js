import axios from 'axios';

export async function logout(router) {
  try {
    await axios.post('https://api-catalogos.twistic.app/api/Logout', {}, {
      withCredentials: true,
    });

    sessionStorage.clear();
    localStorage.clear();
    document.cookie.split(";").forEach(c => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
    });

    await router.push('/');
    window.location.reload();
  } catch (error) {
    console.error('Error cerrando sesión:', error);
    router.push('/');
  }
}
