import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from "expo-image";
import {Ionicons} from "@expo/vector-icons";
import Colors from '@/constants/Colors';
import Button from '@/components/Button';
export default function FormsHome() {
    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            {/* Header with logo */}
            <View style={styles.header}>
                <View style={styles.logoWrapper}>
                    <Image
                        source={require('@/assets/images/logo.png')}
                        style={styles.logo}
                        contentFit="contain"
                    />
                </View>
            </View>

            {/* Main content */}
            <View style={styles.content}>
                <Text style={styles.title}>Want to report a problem ?</Text>
                <Text style={styles.subtitle}>Help your community by reporting issues to your municipality.
                    It only takes a minute!</Text>

                <Text style={styles.subtitle}>What you'll need:</Text>

                <View style={styles.features}>
                    <View style={styles.features}>
                        <View style={styles.featureItem}>
                            <Ionicons name="checkmark-circle" size={20} color={Colors.primary} />
                            <Text style={styles.featureText}>Location of the problem</Text>
                        </View>
                        <View style={styles.featureItem}>
                            <Ionicons name="checkmark-circle" size={20} color={Colors.primary} />
                            <Text style={styles.featureText}>Photo/video (optional)</Text>
                        </View>
                        <View style={styles.featureItem}>
                            <Ionicons name="checkmark-circle" size={20} color={Colors.primary} />
                            <Text style={styles.featureText}>Brief description</Text>
                        </View>
                    </View>
                </View>

                <Link href="/(tabs)/forms/step1" asChild>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Start Form</Text>
                    </TouchableOpacity>
                </Link>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    header: {
        width: '100%',
        paddingHorizontal: 20,
        paddingTop: 10,
        alignItems: 'flex-end', // Align to right
    },
    logoWrapper: {
        margin:20,
        marginTop:40,
        // You can add background, border, etc. if needed
    },
    logo: {
        width: 60,
        height: 60,
    },
    content: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -270, // Adjust this to move content up/down
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        color: Colors.primary,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: Colors.gray,
        marginTop: 20,
        marginLeft: 120,
        marginRight: 120,

        textAlign: 'center',
    },
    features: {
        marginBottom: 40,
        paddingHorizontal: 20,
    },
    featureText: {
        fontSize: 16,
        color: Colors.black,
        marginBottom: 10,
        textAlign: 'center',
    },
    button: {
        width: '70%',
        backgroundColor: Colors.primary,
        padding: 15,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 30,
        marginLeft: 40,
        marginRight: 40,

    },
    buttonText: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: '600',
    },
    features: {
        marginTop: 10,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    featureText: {
        marginLeft: 8,
        fontSize: 16,
    },
});