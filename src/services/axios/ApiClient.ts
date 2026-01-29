// import axios from 'axios';
// import { AuthStore } from '@/stores';
// import Injector from '@/utils/injector';
// import { AUTH_STORE } from '@/stores/identifiers';

// const API_BASE_URL = process.env.VUE_APP_API_URL || 'http://localhost:3000/api';

// const apiClient = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// apiClient.interceptors.request.use(
//   (config) => {
//     const authStore = Injector.get<AuthStore>(AUTH_STORE);
//     const token = authStore.token;
    
//     if (token && config.headers) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
    
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error('API Error:', error.response?.status, error.message);
//     return Promise.reject(error);
//   }
// );

// export default apiClient;

import axios from 'axios';
import { AuthStore } from '@/stores';
import Injector from '@/utils/injector';
import { AUTH_STORE } from '@/stores/identifiers';

const API_BASE_URL = process.env.VUE_APP_API_URL || 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

interface ApiError {
  status?: number;
  message: string;
  data?: any;
}

let showToastFunc: (message: string, type: 'success' | 'error') => void;

export const setToastFunction = (toastFunction: (message: string, type: 'success' | 'error') => void) => {
  showToastFunc = toastFunction;
};

const handleApiError = (error: any) => {
  const apiError: ApiError = {
    message: 'Что-то пошло не так',
    status: error.response?.status,
    data: error.response?.data
  };

  if (error.response) {
    if (error.response.status === 401) {
      apiError.message = 'Неавторизованный доступ. Пожалуйста, войдите снова.';
    } else if (error.response.status === 403) {
      apiError.message = 'Доступ запрещен';
    } else if (error.response.status === 404) {
      apiError.message = 'Ресурс не найден';
    } else if (error.response.status === 422) {
      apiError.message = 'Некорректные данные';
    } else if (error.response.status === 500) {
      apiError.message = 'Внутренняя ошибка сервера';
    } else if (error.response.data?.message) {
      apiError.message = error.response.data.message;
    }
  } else if (error.request) {
    apiError.message = 'Нет ответа от сервера. Проверьте подключение к интернету.';
  } else {
    apiError.message = error.message || 'Что-то пошло не так';
  }

  if (showToastFunc) {
    showToastFunc(apiError.message, 'error');
  } else {
    console.error('Toast function not set. Error:', apiError.message);
  }

  console.error('API Error:', apiError);

  return Promise.reject(error);
};

apiClient.interceptors.request.use(
  (config) => {
    const authStore = Injector.get<AuthStore>(AUTH_STORE);
    const token = authStore.token;
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    handleApiError(error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    // Можно добавить обработку успешных ответов
    // if (response.config.method?.toUpperCase() !== 'GET' && showToastFunc) {
    // }
    return response;
  },
  (error) => {
    return handleApiError(error);
  }
);

export default apiClient;