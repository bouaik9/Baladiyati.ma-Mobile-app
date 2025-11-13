import { Stack } from 'expo-router';
import Colors from '@/constants/Colors';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';

// Toast configuration to match your app's theme
const toastConfig = {
    success: (props) => (
        <BaseToast
            {...props}
            style={{
                borderLeftColor: '#10B981',
                backgroundColor: Colors.white,
                height: 80,
                width: '100%',
                borderRadius: 12,
                borderLeftWidth: 6,
            }}
            contentContainerStyle={{
                paddingHorizontal: 15,
                paddingVertical: 10
            }}
            text1Style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: Colors.black
            }}
            text2Style={{
                fontSize: 14,
                color: '#6B7280',
                marginTop: 4
            }}
        />
    ),
    error: (props) => (
        <ErrorToast
            {...props}
            style={{
                borderLeftColor: '#EF4444',
                backgroundColor: Colors.white,
                height: 80,
                width: '90%',
                borderRadius: 12,
                borderLeftWidth: 6,
            }}
            contentContainerStyle={{
                paddingHorizontal: 15,
                paddingVertical: 10
            }}
            text1Style={{
                fontSize: 16,
                fontWeight: 'bold',
                color: Colors.black
            }}
            text2Style={{
                fontSize: 14,
                color: '#6B7280',
                marginTop: 4
            }}
        />
    ),
};

export default function FormsLayout() {
    return (
        <>
            <Stack
                screenOptions={{
                    headerStyle: {
                        backgroundColor: Colors.primary,
                    },
                    headerTintColor: Colors.white,
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            >
                <Stack.Screen name="index" options={{ headerShown: false }} />
                <Stack.Screen name="step1" options={{ headerShown: false }} />
                <Stack.Screen name="step2" options={{ headerShown: false }} />
                <Stack.Screen name="step3" options={{ headerShown: false }} />
            </Stack>

            {/* Toast with custom configuration */}
            <Toast config={toastConfig} />
        </>
    );
}