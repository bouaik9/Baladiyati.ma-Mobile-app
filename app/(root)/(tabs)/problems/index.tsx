import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Colors from '@/constants/Colors';
import { useState, useRef } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useRouter } from 'expo-router';

export default function ProblemsMap() {
    const router = useRouter();
    const [selectedProblem, setSelectedProblem] = useState(null);
    const bottomSheetRef = useRef(null);
    const mapRef = useRef(null);

    // Sample problem locations with media and status
    const problemLocations = [
        {
            id: 1,
            title: 'Pothole Issue',
            description: 'Large pothole on main road causing traffic problems and vehicle damage. Reported by multiple residents in the area.',
            images: [
                'https://images.squarespace-cdn.com/content/v1/573365789f726693272dc91a/1704992146415-CI272VYXPALWT52IGLUB/AdobeStock_201419293.jpeg?format=1500w',
                'https://sripath.com/wp-content/uploads/2025/01/iStock-174662203.jpg'
            ],
            videos: [],
            latitude: 31.93965479492922,
            longitude: -4.462561754091551,
            detailsUrl: 'https://yourapp.com/problems/1',
            status: 'submitted'
        },
        {
            id: 2,
            title: 'Broken Street Light',
            description: 'Street light not working for past 3 days, making the area unsafe at night.',
            images: [
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTiDn67wEZ7XX2Mu_kK4CksXqU93DJIF8z_A&s'
            ],
            videos: [],
            latitude: 31.94165479492922,
            longitude: -4.465561754091551,
            detailsUrl: 'https://yourapp.com/problems/2',
            status: 'inProgress'
        },
        {
            id: 3,
            title: 'Garbage Collection',
            description: 'Garbage not collected for over a week, causing odor and health concerns.',
            images: [],
            videos: [],
            latitude: 31.93865479492922,
            longitude: -4.460561754091551,
            detailsUrl: 'https://yourapp.com/problems/3',
            status: 'underReview'
        },
        {
            id: 4,
            title: 'Water Leakage',
            description: 'Water pipe leaking on street corner, wasting water and creating slippery surface.',
            images: [],
            videos: [],
            latitude: 31.94265479492922,
            longitude: -4.463561754091551,
            detailsUrl: 'https://yourapp.com/problems/4',
            status: 'completed',
            explanation: 'This issue has already been reported and is currently being handled by the municipal water department. Expected resolution within 2-3 business days.'
        },
        {
            id: 5,
            title: 'Park Maintenance',
            description: 'Broken playground equipment in the city park.',
            images: [],
            videos: [],
            latitude: 31.93765479492922,
            longitude: -4.464561754091551,
            detailsUrl: 'https://yourapp.com/problems/5',
            status: 'rejected',
            explanation: 'This falls under private property management. Please contact the park administration directly for maintenance requests.'
        },
    ];

    // Function to get color based on status
    const getStatusColor = (status) => {
        switch (status) {
            case 'submitted':
                return Colors.status.submitted;
            case 'underReview':
                return Colors.status.underReview;
            case 'inProgress':
                return Colors.status.inProgress;
            case 'rejected':
                return Colors.status.rejected;
            case 'completed':
                return Colors.status.completed;
            default:
                return Colors.primary;
        }
    };

    // Function to get status display text
    const getStatusText = (status) => {
        switch (status) {
            case 'submitted':
                return 'Submitted';
            case 'underReview':
                return 'Under Review';
            case 'inProgress':
                return 'In Progress';
            case 'rejected':
                return 'Rejected';
            case 'completed':
                return 'Completed';
            default:
                return 'Unknown';
        }
    };

    const handleMarkerPress = (problem) => {
        setSelectedProblem(problem);
        bottomSheetRef.current?.snapToIndex(3); // Snap to first point (15%)

        // Optional: Animate map to the selected marker
        mapRef.current?.animateToRegion({
            latitude: problem.latitude,
            longitude: problem.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        }, 500);
    };

    const handleDetailsPress = () => {
        if (selectedProblem) {
            // Navigate to the problem details page with the problem data
            router.push({
                pathname: '/problems/[id]',
                params: {
                    id: selectedProblem.id,
                    title: selectedProblem.title,
                    description: selectedProblem.description,
                    status: selectedProblem.status,
                    explanation: selectedProblem.explanation || '',
                    images: JSON.stringify(selectedProblem.images || []),
                    latitude: selectedProblem.latitude,
                    longitude: selectedProblem.longitude,
                }
            });
        }
    };

    const renderMedia = () => {
        if (!selectedProblem) return null;

        const allMedia = [
            ...(selectedProblem.images || []),
            ...(selectedProblem.videos || [])
        ];

        if (allMedia.length === 0) {
            return (
                <View style={styles.noMediaContainer}>
                    <Text style={styles.noMediaText}>No media available</Text>
                </View>
            );
        }

        return (
            <View style={styles.mediaContainer}>
                <Text style={styles.mediaTitle}>Media ({allMedia.length})</Text>
                <View style={styles.mediaList}>
                    {allMedia.map((media, index) => (
                        <View key={index} style={styles.mediaItem}>
                            {media.endsWith('.mp4') || media.endsWith('.mov') ? (
                                <View style={styles.videoPlaceholder}>
                                    <Text style={styles.videoText}>🎥 Video</Text>
                                </View>
                            ) : (
                                <Image
                                    source={{ uri: media }}
                                    style={styles.image}
                                    defaultSource="https://sripath.com/wp-content/uploads/2025/01/iStock-174662203.jpg"
                                />
                            )}
                        </View>
                    ))}
                </View>
            </View>
        );
    };

    const renderExplanation = () => {
        if (!selectedProblem || selectedProblem.status !== 'rejected' || !selectedProblem.explanation) {
            return null;
        }

        return (
            <View style={styles.explanationContainer}>
                <Text style={styles.explanationTitle}>Reason for Rejection</Text>
                <Text style={styles.explanationText}>{selectedProblem.explanation}</Text>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={{
                    latitude: 31.93965479492922,
                    longitude: -4.462561754091551,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
                }}
            >
                {problemLocations.map((location) => (
                    <Marker
                        key={location.id}
                        coordinate={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                        }}
                        title={location.title}
                        pinColor={getStatusColor(location.status)}
                        onPress={() => handleMarkerPress(location)}
                    />
                ))}
            </MapView>

            <BottomSheet
                ref={bottomSheetRef}
                snapPoints={['15%', '25%', '40%', '90%']}
                enablePanDownToClose={true}
                onClose={() => setSelectedProblem(null)}
                backgroundStyle={styles.bottomSheetBackground}
                handleIndicatorStyle={styles.bottomSheetIndicator}
            >
                <BottomSheetView style={styles.bottomSheetContent}>
                    {selectedProblem && (
                        <>
                            <View style={styles.problemHeader}>
                                <View style={styles.titleContainer}>
                                    <Text style={styles.problemTitle}>{selectedProblem.title}</Text>
                                    <View style={[
                                        styles.statusBadge,
                                        { backgroundColor: getStatusColor(selectedProblem.status) }
                                    ]}>
                                        <Text style={styles.statusText}>
                                            {getStatusText(selectedProblem.status)}
                                        </Text>
                                    </View>
                                </View>
                                <Text style={styles.problemId}>ID: #{selectedProblem.id}</Text>
                            </View>

                            <Text style={styles.problemDescription}>
                                {selectedProblem.description}
                            </Text>

                            {/* Show explanation for rejected problems */}
                            {renderExplanation()}

                            {renderMedia()}

                            <TouchableOpacity
                                style={styles.detailsButton}
                                onPress={handleDetailsPress}
                            >
                                <Text style={styles.detailsButtonText}>View Details</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </BottomSheetView>
            </BottomSheet>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    header: {
        padding: 20,
        backgroundColor: Colors.white,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.primary,
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 16,
        color: Colors.gray,
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    legend: {
        padding: 15,
        backgroundColor: Colors.white,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    markerPreview: {
        width: 20,
        height: 20,
        borderRadius: 10,
        marginRight: 10,
    },
    legendText: {
        fontSize: 16,
        color: Colors.black,
    },
    // Bottom Sheet Styles
    bottomSheetBackground: {
        backgroundColor: Colors.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    bottomSheetIndicator: {
        backgroundColor: Colors.gray,
        width: 10,
        height: 1,
    },
    bottomSheetContent: {
        flex: 1,
        padding: 20,
    },
    problemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 15,
    },
    titleContainer: {
        flex: 1,
        marginRight: 10,
    },
    problemTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.primary,
        marginBottom: 8,
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        alignSelf: 'flex-start',
    },
    statusText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: Colors.white,
        textTransform: 'uppercase',
    },
    problemId: {
        fontSize: 14,
        color: Colors.gray,
        fontWeight: '600',
    },
    problemDescription: {
        fontSize: 16,
        color: Colors.black,
        lineHeight: 22,
        marginBottom: 20,
    },
    // Explanation Styles
    explanationContainer: {
        backgroundColor: '#FFF5F5',
        padding: 15,
        borderRadius: 12,
        borderLeftWidth: 4,
        borderLeftColor: Colors.status.rejected,
        marginBottom: 20,
    },
    explanationTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.status.rejected,
        marginBottom: 8,
    },
    explanationText: {
        fontSize: 14,
        color: Colors.black,
        lineHeight: 20,
    },
    mediaContainer: {
        marginBottom: 20,
    },
    mediaTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.primary,
        marginBottom: 10,
    },
    mediaList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    mediaItem: {
        width: 80,
        height: 80,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: Colors.lightGray,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    videoPlaceholder: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.lightGray,
        justifyContent: 'center',
        alignItems: 'center',
    },
    videoText: {
        fontSize: 12,
        color: Colors.gray,
    },
    noMediaContainer: {
        padding: 20,
        alignItems: 'center',
        backgroundColor: Colors.lightGray,
        borderRadius: 8,
        marginBottom: 20,
    },
    noMediaText: {
        fontSize: 16,
        color: Colors.gray,
        fontStyle: 'italic',
    },
    detailsButton: {
        backgroundColor: Colors.primary,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 'auto',
    },
    detailsButtonText: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: 'bold',
    },
});