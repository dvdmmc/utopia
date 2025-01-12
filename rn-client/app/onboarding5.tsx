import { useRouter } from "expo-router";
import React from "react";
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from "react-native";

const OnboardingScreen5 = () => {
    const router = useRouter();

    const handleContinue = () => {
        console.log("Continue button pressed");
        // Navigate to the next screen, if applicable
        router.push("/notifications"); // Uncomment and replace with actual route if using navigation
    };

    return (
        <View style={styles.container}>
            {/* Background Image */}
            <ImageBackground
                source={require("../assets/images/onboarding-5.png")}
                style={styles.image}
            >
                {/* Bottom Content Overlay */}
                <View style={styles.overlay}>
                    <Text style={styles.title}>Made just for you</Text>
                    <Text style={styles.description}>
                        Access private events, early product releases, and luxury experiences tailored
                        to your unique tastes. Enjoy perks designed for those who stand out.
                    </Text>

                    {/* Continue Button */}
                    <TouchableOpacity style={styles.button} onPress={handleContinue}>
                        <Text style={styles.buttonText}>Continue</Text>
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
        justifyContent: "flex-end", // Positions the content at the bottom
    },
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 1)", // Semi-transparent black
        paddingHorizontal: 20,
        paddingVertical: 40,
        height: "40%"
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
    button: {
        backgroundColor: "#FFFFFF", // White button
        borderRadius: 18,
        paddingVertical: 12,
        paddingHorizontal: 32,
        alignItems: "center",
        width: "100%", // Centered button with proper width
    },
    buttonText: {
        fontSize: 16,
        color: "#000000", // Black text for the button
        fontWeight: "600",
        fontFamily: "SFPro-Bold", // Use SF Pro Bold if set up
    },
});

export default OnboardingScreen5;
