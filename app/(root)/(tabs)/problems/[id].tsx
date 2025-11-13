// app/problems/[id].tsx
import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
    TextInput,
    FlatList,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';

// Sample data - in real app, you'd fetch this based on the ID
const sampleProblems = {
    '1': {
        id: '1',
        title: 'Pothole Issue',
        description: 'Large pothole on main road causing traffic problems and vehicle damage. Reported by multiple residents in the area.',
        status: 'submitted',
        upvotes: 45,
        downvotes: 12,
        images: [
            'https://images.squarespace-cdn.com/content/v1/573365789f726693272dc91a/1704992146415-CI272VYXPALWT52IGLUB/AdobeStock_201419293.jpeg?format=1500w',
            'https://sripath.com/wp-content/uploads/2025/01/iStock-174662203.jpg'
        ],
        location: 'Main Street, Downtown',
        reportedDate: '2024-01-15',
        reporter: 'John Doe',
        explanation: null,
    },
    '2': {
        id: '2',
        title: 'Broken Street Light',
        description: 'Street light not working for past 3 days, making the area unsafe at night.',
        status: 'inProgress',
        upvotes: 23,
        downvotes: 5,
        images: [
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTiDn67wEZ7XX2Mu_kK4CksXqU93DJIF8z_A&s'
        ],
        location: 'Oak Avenue',
        reportedDate: '2024-01-12',
        reporter: 'Sarah Smith',
        explanation: null,
    },
    '3': {
        id: '3',
        title: 'Water Leakage',
        description: 'Water pipe leaking on street corner, wasting water and creating slippery surface.',
        status: 'rejected',
        upvotes: 8,
        downvotes: 3,
        images: [],
        location: 'Elm Street',
        reportedDate: '2024-01-10',
        reporter: 'Mike Johnson',
        explanation: 'This issue has already been reported and is currently being handled by the municipal water department. Expected resolution within 2-3 business days.',
    },
};

export default function ProblemDetailsScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();

    // Get problem data based on ID
    const problemData = sampleProblems[id] || sampleProblems['1'];

    const [problem, setProblem] = useState({
        ...problemData,
        userVote: null, // 'upvote', 'downvote', or null
    });

    const [comments, setComments] = useState([
        {
            id: '1',
            user: 'Sarah Johnson',
            text: 'This has been an issue for weeks now! Hope it gets fixed soon.',
            timestamp: '2 hours ago',
            likes: 5,
        },
        {
            id: '2',
            user: 'Mike Chen',
            text: 'I almost damaged my car tire here yesterday. Very dangerous!',
            timestamp: '1 day ago',
            likes: 3,
        },
        {
            id: '3',
            user: 'City Services',
            text: 'We have noted this issue and it is currently under review. Thank you for reporting.',
            timestamp: '3 days ago',
            likes: 12,
        },
    ]);

    const [newComment, setNewComment] = useState('');

    // Function to get status color
    const getStatusColor = (status) => {
        switch (status) {
            case 'submitted': return Colors.status.submitted;
            case 'underReview': return Colors.status.underReview;
            case 'inProgress': return Colors.status.inProgress;
            case 'rejected': return Colors.status.rejected;
            case 'completed': return Colors.status.completed;
            default: return Colors.primary;
        }
    };

    // Function to get status text
    const getStatusText = (status) => {
        switch (status) {
            case 'submitted': return 'Submitted';
            case 'underReview': return 'Under Review';
            case 'inProgress': return 'In Progress';
            case 'rejected': return 'Rejected';
            case 'completed': return 'Completed';
            default: return 'Unknown';
        }
    };

    // Voting functions
    const handleUpvote = () => {
        setProblem(prev => {
            const newUpvotes = prev.userVote === 'upvote' ? prev.upvotes - 1 :
                prev.userVote === 'downvote' ? prev.upvotes + 2 : prev.upvotes + 1;

            const newDownvotes = prev.userVote === 'downvote' ? prev.downvotes - 1 : prev.downvotes;

            return {
                ...prev,
                upvotes: newUpvotes,
                downvotes: newDownvotes,
                userVote: prev.userVote === 'upvote' ? null : 'upvote'
            };
        });
    };

    const handleDownvote = () => {
        setProblem(prev => {
            const newDownvotes = prev.userVote === 'downvote' ? prev.downvotes - 1 :
                prev.userVote === 'upvote' ? prev.downvotes + 2 : prev.downvotes + 1;

            const newUpvotes = prev.userVote === 'upvote' ? prev.upvotes - 1 : prev.upvotes;

            return {
                ...prev,
                upvotes: newUpvotes,
                downvotes: newDownvotes,
                userVote: prev.userVote === 'downvote' ? null : 'downvote'
            };
        });
    };

    // Comment functions
    const handleAddComment = () => {
        if (newComment.trim() === '') return;

        const comment = {
            id: Date.now().toString(),
            user: 'Current User',
            text: newComment.trim(),
            timestamp: 'Just now',
            likes: 0,
        };

        setComments(prev => [comment, ...prev]);
        setNewComment('');
    };

    const handleLikeComment = (commentId) => {
        setComments(prev =>
            prev.map(comment =>
                comment.id === commentId
                    ? { ...comment, likes: comment.likes + 1 }
                    : comment
            )
        );
    };

    // Render comment item
    const renderComment = ({ item }) => (
        <View style={styles.commentCard}>
            <View style={styles.commentHeader}>
                <Text style={styles.commentUser}>{item.user}</Text>
                <Text style={styles.commentTime}>{item.timestamp}</Text>
            </View>
            <Text style={styles.commentText}>{item.text}</Text>
            <View style={styles.commentFooter}>
                <TouchableOpacity
                    style={styles.likeButton}
                    onPress={() => handleLikeComment(item.id)}
                >
                    <Ionicons name="heart-outline" size={16} color={Colors.gray} />
                    <Text style={styles.likeCount}>{item.likes}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Ionicons name="arrow-back" size={24} color={Colors.primary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Problem Details</Text>
                <View style={styles.headerRight} />
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Problem Header */}
                <View style={styles.problemHeader}>
                    <View style={styles.titleRow}>
                        <Text style={styles.problemTitle}>{problem.title}</Text>
                        <View style={[
                            styles.statusBadge,
                            { backgroundColor: getStatusColor(problem.status) }
                        ]}>
                            <Text style={styles.statusText}>
                                {getStatusText(problem.status)}
                            </Text>
                        </View>
                    </View>
                    <Text style={styles.problemId}>ID: #{problem.id}</Text>
                </View>

                {/* Voting Section */}
                <View style={styles.votingSection}>
                    <Text style={styles.sectionTitle}>Community Support</Text>
                    <View style={styles.votingButtons}>
                        <TouchableOpacity
                            style={[
                                styles.voteButton,
                                styles.upvoteButton,
                                problem.userVote === 'upvote' && styles.activeUpvote
                            ]}
                            onPress={handleUpvote}
                        >
                            <Ionicons
                                name="thumbs-up"
                                size={20}
                                color={problem.userVote === 'upvote' ? Colors.white : Colors.primary}
                            />
                            <Text style={[
                                styles.voteText,
                                problem.userVote === 'upvote' && styles.activeVoteText
                            ]}>
                                Upvote ({problem.upvotes})
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.voteButton,
                                styles.downvoteButton,
                                problem.userVote === 'downvote' && styles.activeDownvote
                            ]}
                            onPress={handleDownvote}
                        >
                            <Ionicons
                                name="thumbs-down"
                                size={20}
                                color={problem.userVote === 'downvote' ? Colors.white : Colors.status.rejected}
                            />
                            <Text style={[
                                styles.voteText,
                                problem.userVote === 'downvote' && styles.activeVoteText
                            ]}>
                                Downvote ({problem.downvotes})
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Problem Details */}
                <View style={styles.detailsSection}>
                    <Text style={styles.sectionTitle}>Problem Details</Text>
                    <Text style={styles.problemDescription}>{problem.description}</Text>

                    <View style={styles.detailsGrid}>
                        <View style={styles.detailItem}>
                            <Ionicons name="location" size={16} color={Colors.gray} />
                            <Text style={styles.detailText}>{problem.location}</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Ionicons name="calendar" size={16} color={Colors.gray} />
                            <Text style={styles.detailText}>Reported: {problem.reportedDate}</Text>
                        </View>
                        <View style={styles.detailItem}>
                            <Ionicons name="person" size={16} color={Colors.gray} />
                            <Text style={styles.detailText}>By: {problem.reporter}</Text>
                        </View>
                    </View>
                </View>

                {/* Rejection Explanation */}
                {problem.status === 'rejected' && problem.explanation && (
                    <View style={styles.explanationContainer}>
                        <Text style={styles.explanationTitle}>Reason for Rejection</Text>
                        <Text style={styles.explanationText}>{problem.explanation}</Text>
                    </View>
                )}

                {/* Images */}
                {problem.images && problem.images.length > 0 && (
                    <View style={styles.imagesSection}>
                        <Text style={styles.sectionTitle}>Media ({problem.images.length})</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            <View style={styles.imagesList}>
                                {problem.images.map((image, index) => (
                                    <Image
                                        key={index}
                                        source={{ uri: image }}
                                        style={styles.problemImage}
                                    />
                                ))}
                            </View>
                        </ScrollView>
                    </View>
                )}

                {/* Comments Section */}
                <View style={styles.commentsSection}>
                    <View style={styles.commentsHeader}>
                        <Text style={styles.sectionTitle}>Comments ({comments.length})</Text>
                    </View>

                    {/* Add Comment */}
                    <View style={styles.addCommentContainer}>
                        <TextInput
                            style={styles.commentInput}
                            placeholder="Add your comment..."
                            value={newComment}
                            onChangeText={setNewComment}
                            multiline
                        />
                        <TouchableOpacity
                            style={styles.postButton}
                            onPress={handleAddComment}
                        >
                            <Text style={styles.postButtonText}>Post</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Comments List */}
                    <FlatList
                        data={comments}
                        renderItem={renderComment}
                        keyExtractor={item => item.id}
                        scrollEnabled={false}
                        style={styles.commentsList}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    backButton: {
        padding: 5,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.primary,
    },
    headerRight: {
        width: 24,
    },
    content: {
        flex: 1,
        padding: 20,
    },
    problemHeader: {
        marginBottom: 20,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 10,
    },
    problemTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.primary,
        flex: 1,
        marginRight: 10,
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
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
    votingSection: {
        backgroundColor: Colors.lightGray,
        padding: 15,
        borderRadius: 12,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.primary,
        marginBottom: 15,
    },
    votingButtons: {
        flexDirection: 'row',
        gap: 10,
    },
    voteButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
    },
    upvoteButton: {
        borderColor: Colors.primary,
        backgroundColor: Colors.white,
    },
    downvoteButton: {
        borderColor: Colors.status.rejected,
        backgroundColor: Colors.white,
    },
    activeUpvote: {
        backgroundColor: Colors.primary,
    },
    activeDownvote: {
        backgroundColor: Colors.status.rejected,
    },
    voteText: {
        marginLeft: 8,
        fontWeight: '600',
    },
    activeVoteText: {
        color: Colors.white,
    },
    detailsSection: {
        marginBottom: 20,
    },
    problemDescription: {
        fontSize: 16,
        color: Colors.black,
        lineHeight: 22,
        marginBottom: 15,
    },
    detailsGrid: {
        gap: 10,
    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    detailText: {
        fontSize: 14,
        color: Colors.gray,
    },
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
    imagesSection: {
        marginBottom: 20,
    },
    imagesList: {
        flexDirection: 'row',
        gap: 10,
    },
    problemImage: {
        width: 200,
        height: 150,
        borderRadius: 8,
    },
    commentsSection: {
        marginBottom: 30,
    },
    commentsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    addCommentContainer: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 20,
    },
    commentInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        minHeight: 50,
    },
    postButton: {
        backgroundColor: Colors.primary,
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 8,
        justifyContent: 'center',
    },
    postButtonText: {
        color: Colors.white,
        fontWeight: 'bold',
    },
    commentsList: {
        marginBottom: 20,
    },
    commentCard: {
        backgroundColor: Colors.lightGray,
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
    },
    commentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    commentUser: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.primary,
    },
    commentTime: {
        fontSize: 12,
        color: Colors.gray,
    },
    commentText: {
        fontSize: 14,
        color: Colors.black,
        lineHeight: 20,
        marginBottom: 10,
    },
    commentFooter: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    likeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    likeCount: {
        fontSize: 12,
        color: Colors.gray,
    },
});