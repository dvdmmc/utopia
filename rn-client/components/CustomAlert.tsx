import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";

const { width: screenWidth } = Dimensions.get("window");

interface AlertProps {
    visible: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel?: () => void;
    confirmText?: string;
}

const CustomAlert: React.FC<AlertProps> = ({
    visible,
    title,
    message,
    onConfirm,
    confirmText = "OK",
}) => {
    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent={true}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.alertContainer}>
                    <Text style={styles.alertTitle}>{title}</Text>
                    <Text style={styles.alertMessage}>{message}</Text>
                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
                            <Text style={styles.confirmButtonText}>{confirmText}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    alertContainer: {
        width: screenWidth * 0.8,
        backgroundColor: "rgba(10, 10, 10, 0.5)",
        borderRadius: 10,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 6,
    },
    alertTitle: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 10,
        color: "#FFF",
        textAlign: "center",
    },
    alertMessage: {
        fontSize: 16,
        color: "#DDD",
        marginBottom: 20,
        textAlign: "center",
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "center",

    },
    confirmButton: {
        backgroundColor: "#FFD700",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        width: "80%"
    },
    confirmButtonText: {
        color: "#000",
        fontSize: 16,
        fontWeight: "600",
        textAlign: "center"
    },
});

export default CustomAlert;
