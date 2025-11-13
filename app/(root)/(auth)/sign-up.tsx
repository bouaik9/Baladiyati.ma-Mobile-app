import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Link, router } from 'expo-router';
import Button from "@/components/Button";
import Input from "@/components/Input";
import Colors from "@/constants/Colors"

export default function SignInScreen() {
    const handleSignIn = () => {
        // Here you would typically handle sign in logic
        console.log('Sign in pressed');

        // After successful sign in, navigate to home
        router.replace('/');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Account</Text>


            <Input placeholder="Full name" keyboardType="default"  autoCapitalize="words"></Input>

            <Input placeholder="Email" keyboardType="email-address"  autoCapitalize="none"></Input>


            <Input placeholder="Password" autoCapitalize="none" secureTextEntry={true} keyboardType="default"></Input>


            <Input placeholder="Confirm Password" autoCapitalize="none" secureTextEntry={true} keyboardType="default"></Input>


            <Button label="Create Account" href="none" onPress={handleSignIn}></Button>

            <View style={styles.linkContainer}>
                <Text>Already have an account? </Text>
                <Link href="/(auth)/login" asChild>
                    <TouchableOpacity>
                        <Text style={styles.linkText}>Log In</Text>
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
        backgroundColor: '#1943c8',
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
        color: '#666',
    },
});