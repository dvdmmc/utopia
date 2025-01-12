import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const VerificationScreen = () => {
    const [code, setCode] = useState(["", "", "", ""]); // Store each digit
    const router = useRouter();

    const handleInputChange = (value: string, index: number) => {
        const newCode = [...code];
        newCode[index] = value.slice(-1); // Only allow the last digit typed
        setCode(newCode);

        // Automatically move to the next box if a digit is entered
        if (value && index < code.length - 1) {
            inputs[index + 1].focus();
        }
        if (newCode.every((digit) => digit !== "")) {
            // Add slight delay to allow the last input to render before navigating
            setTimeout(() => {
                router.push("/onboarding3"); // Replace with your target route
            }, 200);
        }
    };

    const inputs: any[] = []; // To store references to input boxes

    return (
        <LinearGradient
            colors={["#2B2B2B", "#000000"]} // Adjust colors for the gradient
            start={{ x: 0, y: 0 }} // Top-left
            end={{ x: 1, y: 1 }} // Bottom-right
            style={styles.gradientContainer}
        >
            <View style={styles.container}>
                {/* Back Button */}
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <View style={styles.backButtonCircle}>
                        <Text style={styles.backButtonChevron}>‹</Text>
                    </View>
                </TouchableOpacity>

                {/* Title */}
                <Text style={styles.title}>Please verify your phone number</Text>

                {/* Code Input Boxes */}
                <View style={styles.codeContainer}>
                    {code.map((digit, index) => (
                        <TextInput
                            key={index}
                            ref={(ref) => (inputs[index] = ref)} // Store input refs
                            style={styles.inputBox}
                            keyboardType="number-pad"
                            maxLength={1}
                            value={digit}
                            onChangeText={(value) => handleInputChange(value, index)}
                            autoFocus={index === 0} // Focus on the first input initially
                        />
                    ))}
                </View>

                {/* Resend Code */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Didn’t receive a code? </Text>
                    <TouchableOpacity>
                        <Text style={styles.resendText}>Resend Code</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </LinearGradient >
    );
};

const styles = StyleSheet.create({
    gradientContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
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
        backgroundColor: "#777777",
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
        color: "#DDDDDD",
        fontWeight: "600",
        textAlign: "center",
        marginTop: -8

    },
    title: {
        fontSize: 48,
        color: "#FFFFFF",
        fontWeight: "200",
        fontFamily: "SFPro",
        marginBottom: 0,
        marginTop: 100
    },
    codeContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 20,
    },
    inputBox: {
        width: 60,
        height: 60,
        borderWidth: 1,
        borderColor: "#333",
        borderRadius: 8,
        color: "#FFFFFF",
        fontSize: 24,
        fontWeight: "700",
        textAlign: "center",
        backgroundColor: "#1A1A1A",
    },
    footer: {
        flexDirection: "row",
        justifyContent: "flex-start",
        marginTop: 30,
    },
    footerText: {
        color: "#A1A1A1",
        fontSize: 18,
        fontFamily: "SFPro"
    },
    resendText: {
        marginLeft: 8,
        color: "#FFFFFF",
        fontSize: 18,
        textDecorationLine: "underline",
        fontFamily: "SFPro"
    },
});

export default VerificationScreen;
