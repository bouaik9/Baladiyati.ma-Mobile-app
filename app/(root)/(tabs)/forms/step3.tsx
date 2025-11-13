import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

export default function Step3() {
    const [media, setMedia] = useState([]);

    const pickImage = async () => {
        // Request permissions
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission required', 'Sorry, we need camera roll permissions to make this work!');
            return;
        }

        // Launch image picker
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
            allowsMultipleSelection: true,
        });

        if (!result.canceled && result.assets) {
            const newMedia = result.assets.map(asset => ({
                uri: asset.uri,
                type: asset.type || (asset.uri.includes('.mp4') ? 'video' : 'image'),
            }));
            setMedia(prev => [...prev, ...newMedia]);
        }
    };

    const takePhoto = async () => {
        // Request permissions
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission required', 'Sorry, we need camera permissions to make this work!');
            return;
        }

        // Launch camera
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
        });

        if (!result.canceled && result.assets) {
            const newMedia = {
                uri: result.assets[0].uri,
                type: result.assets[0].type || 'image',
            };
            setMedia(prev => [...prev, newMedia]);
        }
    };

    const removeMedia = (index) => {
        setMedia(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = () => {
        // Submit the report with all collected data
        Alert.alert(
            'Report Submitted',
            'Thank you for reporting the problem! We will review it shortly.',
            [
                {
                    text: 'OK',
                    onPress: () => router.push('/(tabs)/forms') // Navigate back to home
                }
            ]
        );
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.stepTitle}>Step 3: Add Media (Optional)</Text>
            <Text style={styles.subtitle}>Attach photos or videos to help describe the problem</Text>

            {/* Media Preview Grid */}
            {media.length > 0 && (
                <View style={styles.mediaContainer}>
                    <Text style={styles.mediaTitle}>
                        Attached Media ({media.length})
                    </Text>
                    <View style={styles.mediaGrid}>
                        {media.map((item, index) => (
                            <View key={index} style={styles.mediaItem}>
                                {item.type === 'video' ? (
                                    <View style={styles.videoContainer}>
                                        <Ionicons name="videocam" size={32} color={Colors.white} />
                                        <Text style={styles.videoText}>Video</Text>
                                    </View>
                                ) : (
                                    <Image source={{ uri: item.uri }} style={styles.image} />
                                )}
                                <TouchableOpacity
                                    style={styles.removeButton}
                                    onPress={() => removeMedia(index)}
                                >
                                    <Ionicons name="close-circle" size={24} color={Colors.white} />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </View>
            )}

            {/* Media Selection Buttons */}
            <View style={styles.buttonGroup}>
                <TouchableOpacity style={styles.mediaButton} onPress={pickImage}>
                    <Ionicons name="images" size={32} color={Colors.primary} />
                    <Text style={styles.mediaButtonText}>Choose from Gallery</Text>
                    <Text style={styles.mediaButtonSubtext}>Photos & Videos</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.mediaButton} onPress={takePhoto}>
                    <Ionicons name="camera" size={32} color={Colors.primary} />
                    <Text style={styles.mediaButtonText}>Take Photo/Video</Text>
                    <Text style={styles.mediaButtonSubtext}>Use Camera</Text>
                </TouchableOpacity>
            </View>

            {/* Info Text */}
            <View style={styles.infoBox}>
                <Ionicons name="information-circle" size={20} color={Colors.primary} />
                <Text style={styles.infoText}>
                    Adding media is optional but helps the municipality understand and address the problem faster.
                </Text>
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
                    style={styles.submitButton}
                    onPress={handleSubmit}
                >
                    <Text style={styles.submitButtonText}>Submit Report</Text>
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
    mediaContainer: {
        marginBottom: 30,
    },
    mediaTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 12,
        color: Colors.black,
    },
    mediaGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    mediaItem: {
        width: 100,
        height: 100,
        borderRadius: 8,
        overflow: 'hidden',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    videoContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.primary,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    videoText: {
        color: Colors.white,
        fontSize: 12,
        marginTop: 4,
    },
    removeButton: {
        position: 'absolute',
        top: 4,
        right: 4,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 12,
    },
    buttonGroup: {
        gap: 15,
        marginBottom: 20,
    },
    mediaButton: {
        borderWidth: 2,
        borderColor: Colors.border,
        borderRadius: 12,
        padding: 20,
        alignItems: 'center',
        backgroundColor: Colors.white,
    },
    mediaButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: Colors.black,
        marginTop: 8,
    },
    mediaButtonSubtext: {
        fontSize: 14,
        color: '#6B7280',
        marginTop: 2,
    },
    infoBox: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#F0F9FF',
        padding: 16,
        borderRadius: 8,
        marginBottom: 30,
        gap: 12,
    },
    infoText: {
        flex: 1,
        fontSize: 14,
        color: Colors.black,
        lineHeight: 20,
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
    submitButton: {
        flex: 2,
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        backgroundColor: Colors.primary,
    },
    submitButtonText: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: '600',
    },
});