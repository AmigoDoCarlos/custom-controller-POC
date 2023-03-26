import React, { useRef } from "react";
import { View, Text, Animated, PanResponder, StyleSheet } from "react-native";
import { colors } from "../../../colors";
import Button from "../../../components/Button";
import { useEditContext } from "../../../contexts/EditContext";

interface FloatingButtonProps {
    children: any,
}

export default function FloatingButton({children}: FloatingButtonProps){
    const {grid, setGrid, setFloatingButton} = useEditContext();
    const pan = useRef(new Animated.ValueXY()).current;

    const panResponder = useRef(
        PanResponder.create({
          onMoveShouldSetPanResponder: () => true,
          onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {useNativeDriver: false}),
          onPanResponderRelease: () => {
            setGrid(false);
            setFloatingButton(previous => ({...previous, visible: false}));
          },
        }),
      ).current;

    return (
        <Animated.View 
            {...panResponder.panHandlers}
            style={{
                ...style.button,
                transform: [{translateX: pan.x}, {translateY: pan.y}]
            }}
            onTouchMove={(e) => setFloatingButton({x: Math.round(e.nativeEvent.pageX), y: Math.round(e.nativeEvent.pageY)})}
        >
            <Text style={style.text}>
                Botão
            </Text>
        </Animated.View>
    )
}

const style = StyleSheet.create({
    button: {
        backgroundColor: colors.blue,
        width: 104,
        height: 70,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
    },
    text: {
        color: colors.darkWhite,
        fontSize: 16,
    }
});