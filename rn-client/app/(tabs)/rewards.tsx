import React, { useEffect, useState } from "react";
import Carousel from "react-native-reanimated-carousel";
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";

type LikeDislikeState = {
    [eventId: string]: "like" | "dislike" | null;
};

type Event = {
    id: string,
    title: string,
    image: string,
    points: number,
    location: string,
    date: string,
    description: string
}

const { width: screenWidth } = Dimensions.get("window");


export default function RewardsTab() {
    const [events, setEvents] = useState<Event[]>([]); // Store events fetched from Firebase

    const [likeDislikeState, setLikeDislikeState] = useState<LikeDislikeState>(() =>
        Object.fromEntries(events.map((event: Event) => [event.id, null]))
    );
    const [loading, setLoading] = useState(true); // Show loading indicator
    const [error, setError] = useState(""); // Store any fetch errors


    const handleButtonPress = (type: "like" | "dislike", eventId: string) => {
        const currentState = likeDislikeState[eventId];
        const newState = { ...likeDislikeState };

        // If the current state matches the pressed type, set it to neutral (null)
        newState[eventId] = currentState === type ? null : type;

        setLikeDislikeState(newState);
    };


    const router = useRouter();


    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                const response = await fetch("https://eventshandler-labzq5tqia-uc.a.run.app");
                const data = await response.json();
                setEvents(data);

                // Initialize like/dislike state
                const initialState = Object.fromEntries(data.map((event: Event) => [event.id, null]));
                setLikeDislikeState(initialState);
            } catch (err) {
                setError("Failed to fetch events. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (loading) {
        return (
            <View style={styles.activityContainer}>
                <ActivityIndicator size="large" color="#FFD700" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }
    return (
        <View style={styles.container}>
            {/* User Info */}
            <View style={styles.userInfo}>
                <View>
                    <Text style={styles.userName}>Adam Horwitz</Text>
                    <Text style={styles.userStatus}>VIP MEMBER</Text>
                </View>
                <View>
                    <Text style={styles.points}>5,000</Text>
                    <Text style={styles.pointsLabel}>POINTS</Text>
                </View>
            </View>

            {/* Carousel */}
            <Carousel
                width={screenWidth}
                height={screenWidth * 1.5}
                data={events}
                loop={true}
                renderItem={({ item }) => {


                    return (
                        <TouchableOpacity
                            style={styles.card}
                            onPress={() =>
                                router.push({
                                    pathname: "/details",
                                    params: { ...item },
                                })
                            }
                        >
                            <Image source={{ uri: item.image }} style={styles.cardImage} />
                            <View style={styles.overlay}>
                                <Text style={styles.eventTitle}>{item.title}</Text>
                                <Text style={styles.eventDetails}>
                                    <Text style={styles.eventPoints}>{item.points} Pts</Text>
                                    {item.location && <Text> · {item.location}</Text>}
                                    {item.date && <Text> · {item.date}</Text>}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    );
                }}
            />

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
                {likeDislikeState[events[0]?.id] === "dislike" ? (
                    <TouchableOpacity
                        style={[styles.dislikeButton, styles.fullWidthButton]}
                        onPress={() => handleButtonPress("dislike", events[0]?.id)}
                    >
                        <Text style={styles.dislikeButtonText}>✕</Text>
                    </TouchableOpacity>
                ) : likeDislikeState[events[0]?.id] === "like" ? (
                    <TouchableOpacity
                        style={[
                            styles.likeButton,
                            styles.fullWidthButton,
                            { backgroundColor: "#FED700" },
                        ]}
                        onPress={() => handleButtonPress("like", events[0]?.id)}
                    >
                        <Text style={styles.likeButtonText}>♡</Text>
                    </TouchableOpacity>
                ) : (
                    <View style={styles.sideBySideButtons}>
                        <TouchableOpacity
                            style={styles.dislikeButton}
                            onPress={() => handleButtonPress("dislike", events[0]?.id)}
                        >
                            <Text style={styles.dislikeButtonText}>✕</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.likeButton}
                            onPress={() => handleButtonPress("like", events[0]?.id)}
                        >
                            <Text style={styles.likeButtonText}>♡</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>




        </View>
    );
}

const styles = StyleSheet.create({
    activityContainer: {
        flex: 1, // Take up the entire screen
        justifyContent: "center", // Center vertically
        alignItems: "center", // Center horizontally
        backgroundColor: "#000", // Optional background color for better visibility
    },
    container: {
        flex: 1,
        backgroundColor: "#000",
    },
    userInfo: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    userName: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: "700",
    },
    userStatus: {
        color: "#B3B3B3",
        fontSize: 16,
    },
    points: {
        color: "#FFD700",
        fontSize: 20,
        fontWeight: "700",
    },
    pointsLabel: {
        color: "#B3B3B3",
        fontSize: 16,
    },
    card: {
        flex: 1,
        borderRadius: 10,
        overflow: "hidden",
    },
    cardImage: {
        width: "100%",
        height: "100%",
    },
    overlay: {
        position: "absolute",
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: "rgba(0, 0, 0, 0.0  )",
        borderRadius: 10,
        padding: 10,
    },
    eventTitle: {
        color: "#FFFFFF",
        fontSize: 32,
        fontWeight: "400",
        fontFamily: "SFPro",
        marginBottom: 5,
    },
    errorText: {
        color: "red",
        fontSize: 16,
        textAlign: "center",
    },
    eventDetails: {
        color: "#B3B3B3",
        fontSize: 20,
        fontFamily: "SFPro",
        marginBottom: 35
    },
    eventPoints: {
        color: "#FFD700",
        fontSize: 20,
        fontWeight: "400",
        fontFamily: "SFPro"
    },
    actionButtons: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 20,
    },
    dislikeButton: {
        backgroundColor: "#555555",
        borderRadius: 30,
        width: "45%",
        height: 60,
        alignItems: "center",
        justifyContent: "center",
    },
    likeButton: {
        backgroundColor: "#DDDDDD",
        borderRadius: 30,
        width: "45%",
        height: 60,
        alignItems: "center",
        justifyContent: "center",
    },
    likeButtonText: {
        fontSize: 28,
        fontWeight: "700",
        color: "#333333",
    },
    dislikeButtonText: {
        fontSize: 28,
        fontWeight: "700",
        color: "#DDDDDD",
    },
    activeLike: {
        backgroundColor: "#FED700",
    },
    activeDislike: {
        backgroundColor: "#333333",
    },
    sideBySideButtons: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "90%",
        alignSelf: "center",
    },
    fullWidthButton: {
        width: "90%", // Full width minus some margin
        alignSelf: "center",
    },

});
