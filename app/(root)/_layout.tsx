// app/_layout.tsx
import { Stack, Redirect } from 'expo-router';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { ActivityIndicator, View } from 'react-native';

function RootLayoutNav() {
    const { isAuthenticated, loading } = useAuth();

    // Show loading indicator while checking auth status
    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <Stack>
            {!isAuthenticated ? (
                // Show auth screens when not authenticated
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            ) : (
                // Show app screens when authenticated
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            )}
        </Stack>
    );
}

export default function RootLayout() {
    return (
        <AuthProvider>
            <RootLayoutNav />
        </AuthProvider>
    );
}