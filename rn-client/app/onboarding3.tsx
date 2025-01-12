import React from "react";
import { View, Text, ImageBackground, StyleSheet, Animated, Dimensions } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { runOnJS } from "react-native-reanimated";

const SCREEN_WIDTH = Dimensions.get("window").width;

const OnboardingScreen3 = () => {
    const router = useRouter();
    console.log("Router Object:", router);

    const swipeGesture = Gesture.Pan()
        .onEnd((e) => {
            if (e.translationX < -SCREEN_WIDTH * 0.25) {
                runOnJS(router.push)("/onboarding4"); // Use runOnJS to call router.push safely
            }
        });

    return (
        <GestureDetector gesture={swipeGesture}>
            <View style={styles.container}>
                {/* Background Image */}
                <ImageBackground
                    source={require("../assets/images/onboarding-3.png")}
                    style={styles.image}
                >
                    {/* Bottom Content Overlay */}
                    <View style={styles.overlay}>
                        <Text style={styles.title}>Your World Unlocked</Text>
                        <Text style={styles.description}>
                            You have earned your VIP status. This is your gateway to a world of curated rewards, high-end goods, and unforgettable experiences.
                        </Text>

                        {/* Pagination Dots */}
                        <View style={styles.pagination}>
                            <View style={[styles.dot, styles.activeDot]} />
                            <View style={styles.dot} />
                            <View style={styles.dot} />
                        </View>
                    </View>
                </ImageBackground>
            </View>
        </GestureDetector>
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
    pagination: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: "#B3B3B3", // Default dot color
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: "#FFD700", // Yellow for active dot
    },
});

export default OnboardingScreen3;
