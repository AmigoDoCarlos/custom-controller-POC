import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

interface EditableButtonProps {
    initialX: number,
    initialY: number,
    text: string,
    command: string,
    borderColor: string,
    backgroundColor: string,
}

const width = 108;
const height = 66;

export default function EditableButton({initialX, initialY, text, command, borderColor, backgroundColor}: EditableButtonProps){
    
    const backgroundStyle = {
        ...style.background,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        left: initialX,
        top: initialY,
    }

    return (
        <TouchableOpacity style={backgroundStyle}>
            <Text style={style.text}>
                {text}
            </Text>
        </TouchableOpacity>)
}

const style = StyleSheet.create({
    background: {
        width: width,
        height: height,
        borderWidth: 1,
        borderRadius: 16,
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 16,
        color: 'white',
    }
});