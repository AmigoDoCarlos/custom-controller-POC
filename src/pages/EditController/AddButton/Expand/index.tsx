import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useGlobalContext } from "../../../../contexts/GlobalContext";
import { colors } from "../../../../colors";
import { X } from "react-native-feather";

enum AddButtonStates {       //adicionei aqui em vez de importar do AddButton/index porque, se eu o fizer,
    Retracted,                      //o Metro dispara um warning de import cíclico. achei melhor evitar
    Expanded,
    ExpandedButtons,
    ExpandedScreens,
}

interface ExpandStyle {
    backgroundStyle: any,
    exitButtonStyle: any,
    changeState: (value: any) => void;
}

export default function Expand({backgroundStyle, exitButtonStyle, changeState}: ExpandStyle){

    const { language } = useGlobalContext();

    return (
        <View style={style.inline}>
            <TouchableOpacity style={exitButtonStyle} onPress={() => changeState(AddButtonStates.Retracted)}>
                <X color={colors.red} width={50} height={50}/>
            </TouchableOpacity>
            <View style={backgroundStyle}>
                <TouchableOpacity style={style.innerButton} onPress={() => changeState(AddButtonStates.ExpandedButtons)}>
                    <Text style={style.innerButtonText}>
                        {language.button}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={style.innerButton} onPress={() => changeState(AddButtonStates.ExpandedScreens)}>
                    <Text style={style.innerButtonText}>
                        {language.screen}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    inline: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    innerButton: {
        width: 80,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.blue,
        borderColor: colors.darkWhite,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    innerButtonText: {
        color: colors.darkWhite,
        fontSize: 14,
    }
});