// contexts/AuthContext.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

interface User {
    id: string;
    email: string;
}

interface Tokens {
    access: string;
    refresh: string;
}

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    login: (tokens: Tokens, user: User) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Function to check token validity
    const isTokenValid = async (token: string | null): Promise<boolean> => {
        if (!token) return false;
        // Here you could add JWT expiration check
        return true; // For now, assume any token is valid
    };

    const checkAuthStatus = async () => {
        try {
            console.log('🔄 AuthProvider: Checking tokens in storage');

            const accessToken = await SecureStore.getItemAsync('access_token');
            const refreshToken = await SecureStore.getItemAsync('refresh_token');
            const userData = await SecureStore.getItemAsync('user_data');

            console.log('📝 AuthProvider: Access token exists?', !!accessToken);
            console.log('📝 AuthProvider: Refresh token exists?', !!refreshToken);
            console.log('📝 AuthProvider: User data exists?', !!userData);

            const isValid = await isTokenValid(accessToken);

            if (accessToken && refreshToken && userData && isValid) {
                console.log('✅ AuthProvider: Valid tokens found, user is authenticated');
                setIsAuthenticated(true);
                setUser(JSON.parse(userData));
            } else {
                console.log('❌ AuthProvider: No valid tokens found');
                // Clear any invalid tokens
                if (accessToken && !isValid) {
                    await SecureStore.deleteItemAsync('access_token');
                    await SecureStore.deleteItemAsync('refresh_token');
                    await SecureStore.deleteItemAsync('user_data');
                }
                setIsAuthenticated(false);
                setUser(null);
            }
        } catch (error) {
            console.error('🚨 AuthProvider: Error checking auth status:', error);
            setIsAuthenticated(false);
            setUser(null);
        } finally {
            console.log('🏁 AuthProvider: Auth check complete');
            setLoading(false);
        }
    };

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const login = async (tokens: Tokens, userData: User) => {
        console.log('🔄 AuthContext: Login function called');
        try {
            // Store all tokens
            await SecureStore.setItemAsync('access_token', tokens.access);
            await SecureStore.setItemAsync('refresh_token', tokens.refresh);
            await SecureStore.setItemAsync('user_data', JSON.stringify(userData));

            console.log('✅ AuthContext: All tokens stored successfully');

            // Update state immediately
            setIsAuthenticated(true);
            setUser(userData);

            console.log('✅ AuthContext: State updated - authenticated:', true);

        } catch (error) {
            console.error('🚨 AuthContext: Error during login:', error);
            throw error;
        }
    };

    const logout = async () => {
        console.log('🔄 AuthContext: Logout function called');
        try {
            await SecureStore.deleteItemAsync('access_token');
            await SecureStore.deleteItemAsync('refresh_token');
            await SecureStore.deleteItemAsync('user_data');
            await SecureStore.deleteItemAsync('user_id');
            await SecureStore.deleteItemAsync('user_email');

            setIsAuthenticated(false);
            setUser(null);
            console.log('✅ AuthContext: Logout completed');
        } catch (error) {
            console.error('🚨 AuthContext: Error during logout:', error);
        }
    };

    console.log('🎯 AuthProvider Render - isAuthenticated:', isAuthenticated, 'loading:', loading);

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};