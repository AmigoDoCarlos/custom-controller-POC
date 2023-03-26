import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { colors } from '../../colors';

interface ButtonProps {
    width?: number,
    height?: number,
    borderRadius?: number,
    background?: boolean,
    onPress?: () => void,
    onPressOut?: () => void,
    onLongPress?: () => void,
    children: string,
}

export default function Button({onLongPress, onPressOut, width, height, borderRadius, background, children}: ButtonProps){
    return (
        <TouchableOpacity style={style.background} onLongPress={onLongPress} onPressOut={onPressOut}>
            <Text style={style.text}>
                {children}
            </Text>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    background: {
        width: 80,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.blue,
        borderColor: colors.darkWhite,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: colors.darkWhite,
    }
});