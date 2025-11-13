// app/(tabs)/_layout.tsx
import { Tabs, Redirect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContext';
import { ActivityIndicator, View } from 'react-native';

export default function TabLayout() {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        );
    }

    if (!isAuthenticated) {
        return <Redirect href="/(auth)/login" />;
    }

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors.tabIconSelected,
                tabBarInactiveTintColor: Colors.tabIconDefault,
                tabBarStyle: {
                    backgroundColor: Colors.tabBar,
                    borderTopWidth: 1,
                    borderTopColor: Colors.border,
                    height: 60,
                    position: 'absolute',
                },
                headerStyle: {
                    backgroundColor: Colors.primary,
                },
                headerTintColor: Colors.white,
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <Tabs.Screen
                name="forms"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? 'document-text' : 'document-text-outline'}
                            size={24}
                            color={color}
                        />
                    ),
                    headerShown: false
                }}
            />
            <Tabs.Screen
                name="problems"
                options={{
                    title: 'Problems',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? 'map' : 'map-outline'}
                            size={24}
                            color={color}
                        />
                    ),
                    headerShown: false
                }}
            />
        </Tabs>
    );
}