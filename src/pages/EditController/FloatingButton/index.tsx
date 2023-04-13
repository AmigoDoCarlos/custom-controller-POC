import React, { useEffect, useState, useRef } from "react";
import { Text, Animated, PanResponder, View, StyleSheet } from "react-native";
import { ElementType, useEditContext } from "../../../contexts/EditContext";

type Coords = {
    x: number,
    y: number,
}

type Size = {
    w: number,
    h: number,
}

type propsStyle = {
    background: any,
    text: any,
}

interface FloatingButtonProps {
    type: ElementType
    myID: number,
    idleStyle: propsStyle,
    movingStyle?: propsStyle,
    notMovingStyle?: propsStyle,
    size: Size,
    hitboxRatio: number,
    children: string,
    onStop?: () => void,
}

export default function FloatingButton({type, myID, idleStyle, movingStyle, notMovingStyle, children, size, hitboxRatio, onStop}: FloatingButtonProps){
    const { floatingButton, setFloatingButton } = useEditContext();
    const [moving, setMoving] = useState<boolean | undefined>(undefined);
    const initial = useRef<Coords>({x: 0, y: 0});
    const pan = useRef(new Animated.ValueXY()).current;

    const panResponder = useRef(
        PanResponder.create({
          onMoveShouldSetPanResponder: () => floatingButton.state !== 'moving',
          onPanResponderGrant: () => {
            setFloatingButton(previous => ({
                ...previous,
                type: type,
                hitbox: {
                    w: size.w * hitboxRatio,
                    h: size.h * hitboxRatio,
                }
            }))
            setMoving(true);
          },
          onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {useNativeDriver: false}),
          onPanResponderRelease: () => {
            pan.setValue({x: 0, y: 0});
            setMoving(false);
          },
        }),
    ).current;
    
    pan.removeAllListeners();
    pan.addListener((value) => {
        if(moving && (initial.current.x > 0) && (initial.current.y > 0)){
            setFloatingButton(previous => ({
                ...previous,
                self: {
                    id: myID,
                    x: Math.floor(initial.current.x + value.x),
                    y: Math.floor(initial.current.y + value.y),
                }
            }))
        }
    })

    useEffect(() => {
        if(typeof moving === 'boolean'){
            if(moving){
                setFloatingButton({...floatingButton, state: 'moving'});
            } else {
                setFloatingButton({...floatingButton, state: 'released'});
                onStop && onStop();
            }
        }
    }, [moving]);

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

    const definePosition = (e: any) => {
        e.target.measure((x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
            initial.current = {
                x: pageX,
                y: pageY,
            }
        })
    }

    const translate = (moving)
    ? { transform: [{translateX: pan.x}, {translateY: pan.y}] } : {};

    return (
        <Animated.View 
            {...panResponder.panHandlers}
            style={[backgroundStyle, translate]}
        >   
            <View onLayout={definePosition}>
                <Text style={textStyle}>
                    {children}
                </Text>
            </View>
        </Animated.View>
    )
}



































// const definePosition = (e: any) => {
//     e.target.measure((x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
//         initial.current = {
//             x: pageX,
//             y: pageY,
//         }
//     })
// }