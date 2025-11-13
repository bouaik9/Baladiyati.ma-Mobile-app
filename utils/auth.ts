// utils/auth.ts
import * as SecureStore from 'expo-secure-store';

export const refreshTokens = async () => {
    try {
        const refreshToken = await SecureStore.getItemAsync('refresh_token');

        const response = await fetch('http://192.168.11.119:8000/api/auth/refresh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                refresh: refreshToken,
            }),
        });

        if (response.ok) {
            const data = await response.json();
            await SecureStore.setItemAsync('access_token', data.access);
            return data.access;
        } else {
            // Refresh failed, logout user
            await SecureStore.deleteItemAsync('access_token');
            await SecureStore.deleteItemAsync('refresh_token');
            await SecureStore.deleteItemAsync('user_data');
            return null;
        }
    } catch (error) {
        console.error('Token refresh error:', error);
        return null;
    }
};