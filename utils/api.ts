// utils/api.ts
import * as SecureStore from 'expo-secure-store';

const API_BASE_URL = 'http://192.168.11.119:8000/api';

export const apiClient = async (endpoint: string, options: RequestInit = {}) => {
    const token = await SecureStore.getItemAsync('access_token');

    const config = {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    };

    if (token) {
        config.headers = {
            ...config.headers,
            'Authorization': `Bearer ${token}`,
        };
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (response.status === 401) {
        // Token expired, try to refresh
        // Implement refresh token logic here
    }

    return response;
};