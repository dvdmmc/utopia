import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const IndexScreen = () => {
    const [input, setInput] = useState("");
    const router = useRouter();

    const handleLogin = () => {
        router.push("/verify"); // Navigate to the next screen after login
    };

    return (
        <LinearGradient
            colors={["#2B2B2B", "#000000"]} // Adjust colors for the gradient
            start={{ x: 0, y: 0 }} // Top-left
            end={{ x: 1, y: 1 }} // Bottom-right
            style={styles.gradientContainer}
        >
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                {/* Top Logo */}
                <View style={styles.logoContainer}>
                    <Image source={require("../assets/images/utopia-logo.png")} style={styles.logoImage} />
                </View>


                {/* Input Field */}
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email or mobile number"
                        placeholderTextColor="#A1A1A1"
                        value={input}
                        onChangeText={setInput}
                    />
                </View>

                {/* Log In Button */}
                <TouchableOpacity onPress={handleLogin} style={styles.button}>
                    <Text style={styles.buttonText}>Log In</Text>
                </TouchableOpacity>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>POWERED BY</Text>
                    <Image source={require("../assets/images/utopia-logo.png")} style={styles.footerImage} />
                </View>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    gradientContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },
    logoContainer: {
        position: "absolute",
        top: 150, // Adjust the distance from the top
        alignItems: "center",
    },
    logoImage: {
        width: 220, // Adjust width based on your image
        height: 80, // Adjust height based on your image
        resizeMode: "contain", // Ensures the image scales proportionally
    },
    inputContainer: {
        width: "100%",
        marginBottom: 20,
    },
    input: {
        backgroundColor: "#1A1A1A", // Darker background for input
        borderRadius: 8,
        color: "#FFFFFF",
        paddingHorizontal: 15,
        paddingVertical: 12,
        fontFamily: "SFPro",
        fontSize: 16,
        borderColor: "#333333", // Subtle border
        borderWidth: 1,
    },
    button: {
        backgroundColor: "#FFFFFF", // White button
        borderRadius: 26,
        paddingVertical: 12,
        paddingHorizontal: 32,
        alignItems: "center",
        marginTop: 10,
        width: "100%", // Full width button
    },
    buttonText: {
        fontSize: 16,
        color: "#000000", // Black text for the button
        fontFamily: "SFPro",
        fontWeight: "600",
    },
    footer: {
        position: "absolute",
        bottom: 50, // Adjust for footer placement
        alignItems: "center",
    },
    footerText: {
        color: "#A1A1A1", // Gray text for "POWERED BY"
        fontFamily: "SFPro",
        fontSize: 12,
    },
    footerImage: {
        width: 100, // Adjust width based on your image
        height: 30, // Adjust height based on your image
        resizeMode: "contain", // Ensures the image scales proportionally
    },
});

export default IndexScreen;

