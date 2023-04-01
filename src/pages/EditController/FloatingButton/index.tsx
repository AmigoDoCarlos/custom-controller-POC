import React, { useRef, useState, useEffect, useMemo } from "react";
import { View, Text, Animated, PanResponder, StyleSheet } from "react-native";
import { colors } from "../../../colors";
import { useEditContext } from "../../../contexts/EditContext";

type Offset = {
    x: number,
    y: number,
}
interface FloatingButtonProps {
    type: 'button' | 'screen',
    children: any,
    onStop?: () => void,
}

export default function FloatingButton({type, children, onStop}: FloatingButtonProps){
    const {grid, floatingButton, setGrid, setFloatingButton} = useEditContext();
    const [moving, setMoving] = useState<boolean>(false);
    const pan = useRef(new Animated.ValueXY()).current;

    const panResponder = useRef(
        PanResponder.create({
          onMoveShouldSetPanResponder: () => true,
          onPanResponderGrant: () => {
            setGrid(true);
          },
          onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {useNativeDriver: false}),
          onPanResponderRelease: () => {
            setGrid(false);
            onStop && onStop();
          },
        }),
    ).current;

    const floatingStyle = (type === 'button')
    ? style.draggableButton
    : style.draggableScreen;

    const floatingButtonStyle = useMemo(() => {
        if(grid){
            if(moving) return ({...floatingStyle, transform: [{translateX: pan.x}, {translateY: pan.y}]});
            return style.invisible;
        } return style.button;        
    }, [grid, moving])

    const textStyle = useMemo(() => {
        if (moving){
            if(type === 'button') return style.draggableButtonText;
            return style.draggableScreenText;
        }
        return style.buttonText;
    }, [moving]);

    const updateButtonLocation = (e: any) => {
        const pageX = e.nativeEvent.pageX;
        const pageY = e.nativeEvent.pageY;
        if((Math.abs(pageX - floatingButton.x) + Math.abs(pageY - floatingButton.y)) > 10){
            setFloatingButton({...floatingButton, x: Math.round(e.nativeEvent.pageX), y: Math.round(e.nativeEvent.pageY)})
        }
    }

    return (
        <Animated.View 
            {...panResponder.panHandlers}
            style={floatingButtonStyle}
            onTouchStart={() => {setFloatingButton({...floatingButton, state: 'moving'}); setMoving(true);}}
            onTouchMove={updateButtonLocation}
            onTouchEnd={() => {setFloatingButton({...floatingButton, state: 'released'}); setMoving(false);}}
        >
            <Text style={textStyle}>
                {children}
            </Text>
        </Animated.View>
    )
}

const style = StyleSheet.create({
    button: {
        width: 80,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.blue,
        borderColor: colors.darkWhite,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    draggableButton: {
        backgroundColor: colors.blue,
        width: 95,
        height: 60,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
    },
    draggableScreen: {
        backgroundColor: colors.darkWhite,
        width: 214,
        height: 136,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
    },
    buttonText: {
        color: colors.darkWhite,
        fontSize: 14,
    },
    draggableButtonText: {
        color: colors.darkWhite,
        fontSize: 16,
    },
    draggableScreenText: {
        color: colors.black,
        fontSize: 16,
    },
    invisible: {
        display: 'none',
    }
});