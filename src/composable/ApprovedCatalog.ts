import { ref, onMounted } from 'vue';
import axios from 'axios';

export interface Notification {
  id_template: number;
  catalog_name: string;
  status: string;
  id_user: number;
  created_at: string;
  updated_at: string;
}

export function ApprovedCatalog() {
  const userId = ref<number>(0);
  const approvedTemplates = ref<Notification[]>([]);
  const loading = ref(true);
  const error = ref(false);

  const getXsrfToken = (): string | null => {
    return document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1] || null;
  };

  const fetchUserId = async () => {
    try {
      const xsrfToken = getXsrfToken();
      const res = await axios.get(`${import.meta.env.VITE_URL}/user`, {
        headers: {
          'X-XSRF-TOKEN': decodeURIComponent(xsrfToken),
          'Accept': 'application/json',
        },
        withCredentials: true,
      });
      userId.value = res.data.user.id;
    } catch (err) {
      console.error('Error fetching user:', err);
      error.value = true;
    }
  };

  const fetchApprovedTemplates = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_URL}/aprovedNotifications`, {
        withCredentials: true,
      });
      approvedTemplates.value = res.data.notifications;
    } catch (err) {
      console.error('Error fetching approved notifications:', err);
      error.value = true;
    } finally {
      loading.value = false;
    }
  };

  const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
  };

  onMounted(async () => {
    await fetchUserId();
    await fetchApprovedTemplates();
  });

  return {
    userId,
    approvedTemplates,
    loading,
    error,
    formatDate
  };
}
