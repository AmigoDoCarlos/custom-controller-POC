import React, { useEffect, useState, useRef } from "react";
import { Text, Animated, PanResponder } from "react-native";
import { useEditContext } from "../../../contexts/EditContext";

type Coords = {
    x: number,
    y: number,
}

type propsStyle = {
    background: any,
    text: any,
}

interface FloatingButtonProps {
    myID: number,
    idleStyle: propsStyle,
    movingStyle?: propsStyle,
    notMovingStyle?: propsStyle,
    children: string,
    onStop?: () => void,
}

const threshold = 20;

export default function FloatingButton({myID, idleStyle, movingStyle, notMovingStyle, children, onStop}: FloatingButtonProps){
    const { floatingButton, setFloatingButton } = useEditContext();
    const initialCoords = useRef<Coords>({x: 0, y: 0});
    const [moving, setMoving] = useState<boolean | undefined>(undefined);
    const pan = useRef(new Animated.ValueXY()).current;

    const panResponder = useRef(
        PanResponder.create({
          onMoveShouldSetPanResponder: () => true,
          onPanResponderGrant: () => {
            setMoving(true);
          },
          onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {useNativeDriver: false}),
          onPanResponderRelease: () => {
            pan.setValue({x: 0, y: 0});
            setMoving(false);
          },
        }),
    ).current;

    useEffect(() => {
        if(typeof moving === 'boolean'){
            if(moving){
                setFloatingButton({
                    ...floatingButton,
                    self: {x: initialCoords.current.x, y: initialCoords.current.y, id: myID},
                    sector: {x: -1, y: -1, id: myID},
                });
            } else {
                setFloatingButton({...floatingButton, state: 'released'});
                onStop && onStop();
            }
        }
    }, [moving]);

    const setInitialCoords = (e: any) => {
        e.target.measure((x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
            initialCoords.current = {x: pageX, y: pageY};
        })
    }

    const updateButtonLocation = (e: any) => {
        const pageX = e.nativeEvent.pageX;
        const pageY = e.nativeEvent.pageY;
        if(floatingButton.self){
            if((Math.abs(pageX - floatingButton.self.x) + Math.abs(pageY - floatingButton.self.y)) > threshold){
                setFloatingButton({...floatingButton,
                    state: 'moving',
                    self: {
                        id: floatingButton.self.id,
                        x: Math.round(e.nativeEvent.pageX),
                        y: Math.round(e.nativeEvent.pageY),
                    }
                })
            }
        }
    }

    let backgroundStyle = idleStyle.background;
    let textStyle = idleStyle.text;  

    if(floatingButton.state === 'moving'){
        if(moving){
            textStyle
            if(movingStyle){
                backgroundStyle = {
                    ...backgroundStyle,
                    ...movingStyle.background,
                }
                textStyle = {
                    ...textStyle,
                    ...movingStyle.text,
                }
            }
        } else if(notMovingStyle) {
            backgroundStyle = {
                ...backgroundStyle,
                ...notMovingStyle.background,
            }
            textStyle = {
                ...textStyle,
                ...notMovingStyle.text,
            }
        }
    }

    const translate = (moving)
    ? { transform: [{translateX: pan.x}, {translateY: pan.y}] } : {};

    return (
        <Animated.View 
            {...panResponder.panHandlers}
            style={[backgroundStyle, translate]}
            onLayout={setInitialCoords}
            onTouchMove={updateButtonLocation}
        >
            <Text style={textStyle}>
                {children}
            </Text>
        </Animated.View>
    )
}

























// const floatingStyle = (type === 'button')
    // ? style.draggableButton
    // : style.draggableScreen;

    // const floatingButtonStyle = useMemo(() => {
    //     if(grid){
    //         if(moving) return ({...floatingStyle, transform: [{translateX: pan.x}, {translateY: pan.y}]});
    //         return style.invisible;
    //     } return style.button;        
    // }, [grid, moving])

    // const textStyle = useMemo(() => {
    //     if (moving){
    //         if(type === 'button') return style.draggableButtonText;
    //         return style.draggableScreenText;
    //     }
    //     return style.buttonText;
    // }, [moving]);