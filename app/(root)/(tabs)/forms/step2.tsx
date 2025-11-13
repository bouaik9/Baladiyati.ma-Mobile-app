import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import { useState } from 'react';

export default function Step2() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const isFormValid = title.trim().length > 0;

    const handleNext = () => {
        if (isFormValid) {
            // Save data and navigate to next step
            router.push('/report/step3');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.stepTitle}>Step 2: Problem Details</Text>
            <Text style={styles.subtitle}>Tell us more about the issue</Text>

            <View style={styles.formContainer}>
                {/* Title Input - Required */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>
                        Title <Text style={styles.required}>*</Text>
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Brief description of the problem"
                        placeholderTextColor="#999"
                        value={title}
                        onChangeText={setTitle}
                        maxLength={100}
                    />
                    <Text style={styles.charCount}>
                        {title.length}/100 characters
                    </Text>
                </View>

                {/* Description Input - Optional */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>
                        Description <Text style={styles.optional}>(Optional)</Text>
                    </Text>
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Provide more details about the problem..."
                        placeholderTextColor="#999"
                        value={description}
                        onChangeText={setDescription}
                        multiline
                        numberOfLines={6}
                        textAlignVertical="top"
                        maxLength={500}
                    />
                    <Text style={styles.charCount}>
                        {description.length}/500 characters
                    </Text>
                </View>
            </View>

            {/* Navigation Buttons */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Text style={styles.backButtonText}>Back</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.nextButton,
                        { backgroundColor: isFormValid ? Colors.primary : '#CBD5E1' }
                    ]}
                    disabled={!isFormValid}
                    onPress={() => router.push('/forms/step3')}
                >
                    <Text style={styles.nextButtonText}>
                        Next Step
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: Colors.white,
        paddingTop: 60,
    },
    stepTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        color: Colors.primary,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: Colors.black,
        textAlign: 'center',
        marginBottom: 30,
        opacity: 0.7,
    },
    formContainer: {
        marginBottom: 30,
    },
    inputGroup: {
        marginBottom: 25,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        color: Colors.black,
    },
    required: {
        color: '#EF4444',
    },
    optional: {
        fontSize: 14,
        color: '#6B7280',
        fontWeight: 'normal',
    },
    input: {
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: Colors.white,
        color: Colors.black,
    },
    textArea: {
        height: 120,
        textAlignVertical: 'top',
    },
    charCount: {
        fontSize: 12,
        color: '#6B7280',
        textAlign: 'right',
        marginTop: 4,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 40,
        gap: 12,
    },
    backButton: {
        flex: 1,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: Colors.primary,
        backgroundColor: Colors.white,
    },
    backButtonText: {
        color: Colors.primary,
        fontSize: 18,
        fontWeight: '600',
    },
    nextButton: {
        flex: 2,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    nextButtonText: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: '600',
    },
});