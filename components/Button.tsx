import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Colors } from '@/constants/Colors';

type Props = {
    label: string;
    onPress?: () => void;
    href: string;
};

export default function Button({ label, onPress, href="" }: Props) {
    return (
        <View style={styles.buttonContainer}>
            <Link href={href} asChild>
                <TouchableOpacity style={styles.button} onPress={onPress}>
                    <Text style={styles.buttonText}>{label}</Text>
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
        marginBottom: 40,
    },
    buttonContainer: {
        width: '100%',
        gap: 15,
    },
    button: {
        backgroundColor: Colors.primary,
        padding: 15,
        borderRadius: 25,
        alignItems: 'center',
        marginLeft: 40,
        marginRight: 40,

    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    text:{
        color: Colors.primary,
    }
});
