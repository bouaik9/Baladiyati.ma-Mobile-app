import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Link, router } from 'expo-router';
import { Colors } from "@/constants/Colors";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginScreen() {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        setLoading(true);

        try {
            console.log('🔄 LoginScreen: Making API request...');

            const response = await fetch('http://192.168.11.119:8000/api/auth/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email.trim(),
                    password: password.trim(),
                }),
            });

            console.log('📡 LoginScreen: Response status:', response.status);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('✅ LoginScreen: API login successful');

            // Use AuthContext login instead of direct storage
            console.log('🔄 LoginScreen: Calling AuthContext login...');
            await login(data.tokens, data.user);

            console.log('✅ LoginScreen: AuthContext login completed');
            console.log('🔄 LoginScreen: Navigating to tabs...');

            // Navigate to tabs
            router.replace('/(tabs)/forms');

        } catch (error) {
            console.error('🚨 LoginScreen: Login error:', error);

            if (error instanceof Error) {
                if (error.message.includes('HTTP error')) {
                    Alert.alert('Login Failed', 'Invalid email or password');
                } else {
                    Alert.alert('Error', 'Network error. Please try again.');
                }
            } else {
                Alert.alert('Error', 'An unexpected error occurred.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Log In</Text>

            <Input
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />
            <Input
                placeholder="Password"
                secureTextEntry
                autoCapitalize="none"
                value={password}
                onChangeText={setPassword}
            />

            <Button
                label={loading ? "Logging in..." : "Log in"}
                onPress={handleLogin}
                disabled={loading}
            />

            <View style={styles.linkContainer}>
                <Text>Don't have an account? </Text>
                <Link href="/(auth)/sign-up" asChild>
                    <TouchableOpacity>
                        <Text style={styles.linkText}>Sign Up</Text>
                    </TouchableOpacity>
                </Link>
            </View>

            <Link href="/" asChild>
                <TouchableOpacity style={styles.backButton}>
                    <Text style={styles.backButtonText}>Back to Home</Text>
                </TouchableOpacity>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        backgroundColor: 'white',
    },
    button: {
        width: '100%',
        backgroundColor: Colors.primary,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    linkContainer: {
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 30,
    },
    linkText: {
        color: Colors.primary,
        fontWeight: '600',
    },
    backButton: {
        marginTop: 20,
        padding: 10,
    },
    backButtonText: {
        color: Colors.primary,
    },
});