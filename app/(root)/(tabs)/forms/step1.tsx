import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import Colors from '@/constants/Colors';
import { useState } from 'react';

export default function Step1() {
    const [selectedPriority, setSelectedPriority] = useState(null);

    const priorities = [
        { level: 'Urgency', time: '< 6 hours', color: '#EF4444', borderColor: '#EF4444' },
        { level: 'High', time: '24h - 72 hours', color: Colors.primary, borderColor: Colors.primary },
        { level: 'Medium', time: '3 - 7 days', color: '#F59E0B', borderColor: '#F59E0B' },
        { level: 'Low', time: '1 - 3 weeks', color: '#10B981', borderColor: '#10B981' },
    ];

    const handlePrioritySelect = (priority) => {
        setSelectedPriority(priority.level);
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.stepTitle}>Step 1: Problem Priority</Text>
            <Text style={styles.subtitle}>Select how urgent this problem is</Text>

            <View style={styles.priorityContainer}>
                {priorities.map((priority, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.priorityButton,
                            {
                                borderColor: priority.borderColor,
                                backgroundColor: selectedPriority === priority.level ?
                                    `${priority.color}20` : Colors.white
                            }
                        ]}
                        onPress={() => handlePrioritySelect(priority)}
                    >
                        <View style={styles.priorityContent}>
                            <Text style={[
                                styles.priorityLevel,
                                { color: priority.color }
                            ]}>
                                {priority.level}
                            </Text>
                            <Text style={styles.priorityTime}>
                                {priority.time}
                            </Text>
                        </View>
                        <View style={styles.indicatorContainer}>
                            {selectedPriority === priority.level && (
                                <View style={[
                                    styles.selectedIndicator,
                                    { backgroundColor: priority.color }
                                ]} />
                            )}
                        </View>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity
                style={[
                    styles.nextButton,
                    { backgroundColor: selectedPriority ? Colors.primary : '#CBD5E1' }
                ]}
                disabled={!selectedPriority}
                onPress={() => router.push('/forms/step2')}
            >
                <Text style={styles.nextButtonText}>
                    {selectedPriority ? 'Next Step' : 'Select Priority'}
                </Text>
            </TouchableOpacity>
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
    priorityContainer: {
        marginBottom: 30,
    },
    priorityButton: {
        borderWidth: 2,
        borderRadius: 12,
        padding: 20,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // This ensures content stays centered with space between
    },
    priorityContent: {
        flex: 1,
        alignItems: 'center', // Center the text content horizontally
    },
    priorityLevel: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
        textAlign: 'center', // Center text alignment
    },
    priorityTime: {
        fontSize: 14,
        color: Colors.black,
        opacity: 0.8,
        textAlign: 'center', // Center text alignment
    },
    indicatorContainer: {
        width: 20, // Fixed width to maintain balance
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedIndicator: {
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    nextButton: {
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 40,
    },
    nextButtonText: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: '600',
    },
});