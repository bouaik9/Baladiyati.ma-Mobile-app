import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {Link, router} from 'expo-router';
import { Colors } from '@/constants/Colors';
import Button from "@/components/Button";
import { Image } from "expo-image";

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            {/* Add your image here */}
            <Image
                source={require('@/assets/images/logo.png')} // Update with your actual image path
                style={styles.logo}
                contentFit="contain"
            />
            <Text style={styles.title}>Baladiyati<Text style={styles.text}>.ma</Text></Text>

            <View style={styles.buttonContainer}>
                <Button label="Sign In" href="/(auth)/sign-in"></Button>
                <Button label="Log In" href="/(auth)/login"></Button>
            </View>
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
    logo: {
        width: 180, // Adjust based on your image
        height: 180, // Adjust based on your image
        marginBottom: 20, // Space between image and title
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 40,
    },
    buttonContainer: {
        width: '100%',
        gap: 15,
    },
    button: {
        backgroundColor: Colors.primary,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    text: {
        color: Colors.primary,
    }
});


