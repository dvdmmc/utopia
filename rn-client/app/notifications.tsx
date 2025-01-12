import { useRouter } from "expo-router";
import React from "react";
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from "react-native";

const NotificationScreen = () => {
    const router = useRouter();

    const handleEnableNotifications = () => {
        console.log("Enable Notifications Pressed");
        router.push("/(tabs)/rewards");
        // Add notification permissions logic here
    };

    const handleMaybeLater = () => {
        console.log("Maybe Later Pressed");
        // Navigate or dismiss logic
        router.push("/(tabs)/rewards");
    };

    return (
        <View style={styles.container}>
            {/* Background Image */}
            <ImageBackground
                source={require("../assets/images/notifications.png")}
                style={styles.image}
            >
                {/* Text Content */}
                <View style={styles.textContainer}>
                    <Text style={styles.title}>Stay in the inner circle</Text>
                    <Text style={styles.description}>
                        Get notified when the most coveted rewards and opportunities drop. You deserve to be in the know.
                    </Text>
                </View>

                {/* Buttons */}
                <View style={styles.buttonContainer}>
                    {/* Primary Button */}
                    <TouchableOpacity style={styles.primaryButton} onPress={handleEnableNotifications}>
                        <Text style={styles.primaryButtonText}>Turn on Notifications</Text>
                    </TouchableOpacity>

                    {/* Secondary Button */}
                    <TouchableOpacity style={styles.secondaryButton} onPress={handleMaybeLater}>
                        <Text style={styles.secondaryButtonText}>Maybe Later</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        resizeMode: "cover", // Ensures the image fills the screen
        justifyContent: "space-between", // Separates text and buttons
    },
    textContainer: {
        flex: 1,
        justifyContent: "center", // Center the text vertically
        alignItems: "center", // Center the text horizontally
        paddingHorizontal: 20, // Add padding for text readability
    },
    title: {
        fontSize: 36,
        color: "#FFFFFF", // White text
        fontWeight: "300", // Semi-bold
        textAlign: "center",
        marginBottom: 10,
        fontFamily: "SFPro", // Use SF Pro Bold
    },
    description: {
        fontSize: 18,
        color: "#999999", // Light gray text
        textAlign: "center",
        lineHeight: 20,
        marginBottom: 20,
        fontFamily: "SFPro", // Use SF Pro Regular
    },
    buttonContainer: {
        paddingHorizontal: 20, // Add padding to the sides
        paddingBottom: 40, // Add padding to the bottom for spacing
    },
    primaryButton: {
        backgroundColor: "#FFFFFF", // White button
        borderRadius: 26, // Rounded button
        paddingVertical: 15,
        alignItems: "center",
        width: "100%", // Full width
        marginBottom: 10, // Space between buttons
    },
    primaryButtonText: {
        fontSize: 16,
        color: "#000000", // Black text for the button
        fontWeight: "300",
        fontFamily: "SFPro", // Use SF Pro Bold if available
    },
    secondaryButton: {
        alignItems: "center",
    },
    secondaryButtonText: {
        fontSize: 16,
        color: "#FFFFFF", // White text for the secondary button
        fontWeight: "400",
        fontFamily: "SFPro", // Use SF Pro Regular if available
    },
});

export default NotificationScreen;
