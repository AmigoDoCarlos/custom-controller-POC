import React, { useMemo, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, TouchableHighlight, Text } from 'react-native';
import { useGlobalContext } from '../../../contexts/GlobalContext';
import { useEditContext } from '../../../contexts/EditContext';
import { colors } from '../../../colors';
import { Plus, X } from 'react-native-feather';
import Buttons from './Buttons';
import Screens from './Screens';
import Expand from './Expand';

enum AddButtonStates {
    Retracted,
    Expanded,
    ExpandedButtons,
    ExpandedScreens,
}

export default function AddButton(){
    const { floatingButton } = useEditContext();
    const [state, setState] = useState<AddButtonStates>(AddButtonStates.Retracted);
    
    const buttonStyle = useMemo(() => {
        const invisible = (floatingButton.state === 'moving')
        ? { backgroundColor: 'rgba(0,0,0,0)'}
        : null;

        switch(state){
            case AddButtonStates.Expanded:
                return style.expandBackground;
            case AddButtonStates.ExpandedScreens:
                return {
                    ...style.expandBackground,
                    ...invisible,
                    width: 300,   
                }
            case AddButtonStates.ExpandedButtons:
                return {
                    ...style.expandBackground,
                    ...invisible,
                    width: 300,   
                }
            default: return style.background; 
        }
    }, [state, floatingButton.state]);  

    const exitButtonStyle = useMemo(() => {
        if(floatingButton.state === 'moving') return style.invisible;
        return null;
    }, [floatingButton.state]);

    switch(state){
        case AddButtonStates.Expanded: return (
            <Expand
                backgroundStyle={buttonStyle}
                exitButtonStyle={exitButtonStyle}
                changeState={setState}
            />
        );
        case AddButtonStates.ExpandedButtons: return (
            <Buttons
                backgroundStyle={buttonStyle}
                exitButtonStyle={exitButtonStyle}
                changeState={setState}
            />
        );
        case AddButtonStates.ExpandedScreens: return (
            <Screens
                backgroundStyle={buttonStyle}
                exitButtonStyle={exitButtonStyle}
                changeState={setState}
            />
        )
        default: return (
            <TouchableHighlight underlayColor={colors.clickBlue} style={buttonStyle} onPress={() => setState(AddButtonStates.Expanded)}>
                <Plus color={colors.darkWhite} width={50} height={50}/>
            </TouchableHighlight>
        )
    } 
}


const style = StyleSheet.create({
    background: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: colors.blue,
        alignItems: 'center',
        justifyContent: 'center',
    },
    expandBackground: {
        width: 220,
        height: 80,
        borderRadius: 40,
        backgroundColor: colors.blue,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    invisible: {
        display: 'none',
    },
});



