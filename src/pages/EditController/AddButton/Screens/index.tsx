import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "../../../../colors";
import { ElementType } from "../../../../contexts/EditContext";
import { useGlobalContext } from "../../../../contexts/GlobalContext";
import { X } from "react-native-feather";
import FloatingButton from "../../FloatingButton";

enum AddButtonStates {       //adicionei aqui em vez de importar do AddButton/index porque, se eu o fizer,
    Retracted,                      //o Metro dispara um warning de import cíclico. achei melhor evitar
    Expanded,
    ExpandedButtons,
    ExpandedScreens,
}

interface ScreensStyle {
    backgroundStyle: any,
    exitButtonStyle: any,
    changeState: (value: any) => void;
}

export default function Screens({backgroundStyle, exitButtonStyle, changeState}: ScreensStyle){

    const { language } = useGlobalContext();

    return (
        <View style={style.inline}>
            <TouchableOpacity style={exitButtonStyle} onPress={() => changeState(AddButtonStates.Expanded)}>
                <X color={colors.red} width={50} height={50}/>
            </TouchableOpacity>
            <View style={backgroundStyle}>
                <FloatingButton
                    type={ElementType.screen2x1} 
                    myID={100}
                    onStop={() => changeState(AddButtonStates.Retracted)}
                    idleStyle={floatingStyle.idle}
                    movingStyle={floatingStyle.movingScreen}
                    notMovingStyle={floatingStyle.invisible}
                    size= {{
                        w: 170,
                        h: 70,
                    }}
                    hitboxRatio={[0.45, 0.05]}
                >
                    {`${language.screen} 2x1`}
                </FloatingButton>
                <FloatingButton
                    type={ElementType.screen2x2} 
                    myID={100}
                    onStop={() => changeState(AddButtonStates.Retracted)}
                    idleStyle={floatingStyle.idle}
                    movingStyle={floatingStyle.movingScreen}
                    notMovingStyle={floatingStyle.invisible}
                    size= {{
                        w: 170,
                        h: 130,
                    }}
                    hitboxRatio={[0.45, 0.45]}
                >
                    {`${language.screen} 2x2`}
                </FloatingButton>
                <FloatingButton
                    type={ElementType.screen4x2} 
                    myID={100}
                    onStop={() => changeState(AddButtonStates.Retracted)}
                    idleStyle={floatingStyle.idle}
                    movingStyle={floatingStyle.movingScreen}
                    notMovingStyle={floatingStyle.invisible}
                    size= {{
                        w: 340,
                        h: 130,
                    }}
                    hitboxRatio={[0.75, 0.45]}
                >
                    {`${language.screen} 4x2`}
                </FloatingButton>
            </View>
        </View>
    );
}


const style = StyleSheet.create({
    inline: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});

const floatingStyle = {
    idle: StyleSheet.create({
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
            fontSize: 14,
        },
    }),
    movingScreen: StyleSheet.create({
        background: {
            backgroundColor: colors.darkWhite,
            borderRadius: 15,
            borderWidth: 1,
            borderColor: colors.black,
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
            opacity: 0.75,
        },
        text: {
            color: colors.black,
            fontSize: 16,
        },
    }),
    invisible: StyleSheet.create({
        background: {
            opacity: 0,
        },
        text: {
            display: 'none',
        }
    }),
};