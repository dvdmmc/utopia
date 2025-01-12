import React, { useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import CustomAlert from "@/components/CustomAlert";

export default function Details() {
    const router = useRouter();
    const params = useLocalSearchParams();
    const [isAlertVisible, setIsAlertVisible] = useState(false);


    const { id, title, points, image, location, date, description } = params;
    const imageUrl = Array.isArray(image) ? image[0] : image; // Ensure `imageUrl` is a string

    const showAlert = () => setIsAlertVisible(true);
    const hideAlert = () => setIsAlertVisible(false);

    const handleConfirm = () => {
        hideAlert();
    };

    const handleBookExperience = async () => {
        try {
            const response = await fetch(`https://rsvpevent-labzq5tqia-uc.a.run.app/events/${id}/rsvp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: "12345", // Replace with the actual user ID
                    userName: "John Doe", // Replace with the actual user name
                    timestamp: new Date().toISOString(),
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                console.log(response)
                console.error("Failed to RSVP:", error.error);
                alert("Failed to book the experience. Please try again.");
                return;
            }

            const result = await response.json();
            console.log("RSVP successful:", result);
            showAlert();
        } catch (error) {

            console.error("Error booking experience:", error);
            alert("An error occurred. Please try again.");
        }
    };


    return (
        <View style={styles.container}>
            <CustomAlert
                visible={isAlertVisible}
                title="Booking Successful"
                onConfirm={handleConfirm}
                confirmText="OK"
                message="Your booking was successful."
            />
            {/* Scrollable Content */}
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Image */}
                <Image source={{ uri: imageUrl }} style={styles.image} />

                {/* Event Details */}
                <View style={styles.detailsContainer}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.points}>
                        {points} Pts{location && ` · ${location}`}{date && ` · ${date}`}
                    </Text>
                    <Text style={styles.descriptionHeader}>About</Text>
                    <Text style={styles.description}>{description}</Text>
                </View>
            </ScrollView>

            {/* Bottom Section: Book Button */}
            <View style={styles.bookButtonContainer}>
                <TouchableOpacity
                    style={styles.bookButton}
                    onPress={handleBookExperience}
                >
                    <Text style={styles.bookButtonText}>Book Experience</Text>
                </TouchableOpacity>
            </View>


            {/* Back Button */}
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <View style={styles.backButtonCircle}>
                    <Text style={styles.backButtonChevron}>‹</Text>
                </View>
            </TouchableOpacity>

        </View>
    );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
    },
    scrollContent: {
        paddingBottom: 80, // Ensure the content doesn't overlap with the button
    },
    image: {
        width: width, // Full width of the screen
        height: width * 0.75, // Maintain aspect ratio (4:3)
    },
    detailsContainer: {
        padding: 20,
        backgroundColor: "#000",
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        color: "#FFFFFF",
        marginBottom: 10,
    },
    points: {
        fontSize: 16,
        color: "#FFD700",
        marginBottom: 10,
    },
    descriptionHeader: {
        fontSize: 18,
        fontWeight: "700",
        color: "#FFFFFF",
        marginTop: 20,
    },
    description: {
        fontSize: 14,
        color: "#B3B3B3",
        marginTop: 10,
    },
    bookButtonContainer: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        backgroundColor: "#000",
        paddingVertical: 15,
        alignItems: "center",
        borderTopWidth: 1,
        borderTopColor: "#333",
    },
    bookButton: {
        backgroundColor: "#FFD700",
        borderRadius: 10,
        paddingVertical: 15,
        width: "90%",
        alignItems: "center",
    },
    bookButtonText: {
        color: "#000",
        fontSize: 16,
        fontWeight: "700",
    },
    backButton: {
        position: "absolute",
        top: 40,
        left: 20,
        zIndex: 10,
    },
    backButtonCircle: {
        width: 40, // Circle dimensions
        height: 40,
        borderRadius: 20, // Makes it a circle
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 4, // For Android shadow
    },
    backButtonChevron: {
        fontSize: 36,
        color: "black",
        fontWeight: "600",
        textAlign: "center",
        marginTop: -8

    },
});
