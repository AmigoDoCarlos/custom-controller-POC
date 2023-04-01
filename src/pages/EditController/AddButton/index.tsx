import React, { useState, useMemo, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native';
import { useGlobalContext } from '../../../contexts/GlobalContext';
import { States, useEditContext } from '../../../contexts/EditContext';
import { colors } from '../../../colors';
import { Plus, X } from 'react-native-feather';
import FloatingButton from '../FloatingButton';

export default function AddButton(){
    const { language } = useGlobalContext();
    const { grid, state, setState } = useEditContext();
    
    const buttonStyle = useMemo(() => {
        if(state === States.Expand){
            if(grid) return style.noBackground;
            return style.expandBackground;
        }
        return style.background;
    }, [state, grid]);  

    const exitButtonStyle = useMemo(() => {
        if(grid) return style.invisible;
        return null;
    }, [grid]);

    const screenButtonStyle = useMemo(() => {
        if(grid) return ({transform: [{translateX: 80}]});
        return null;
    }, [grid]);

    switch(state){
        case States.Expand: return (
            <View style={style.inline}>
                <TouchableOpacity style={exitButtonStyle} onPress={() => setState(States.Idle)}>
                    <X color={colors.red} width={50} height={50}/>
                </TouchableOpacity>
                <View style={buttonStyle}>
                    <FloatingButton type='button' onStop={() => setState(States.Idle)}>
                        {language.button}
                    </FloatingButton>
                    <View style={screenButtonStyle}>
                        <FloatingButton type='screen' onStop={() => setState(States.Idle)}>
                            {language.screen}
                        </FloatingButton>
                    </View>
                </View>
            </View>
        )
        default: return (
            <TouchableHighlight underlayColor={colors.clickBlue} style={buttonStyle} onPress={() => setState(States.Expand)}>
                <Plus color={colors.darkWhite} width={50} height={50}/>
            </TouchableHighlight>
        )
    } 
}


const style = StyleSheet.create({
    inline: {
        flexDirection: 'row',
        alignItems: 'center',
    },
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
    noBackground: {
        width: 220,
        height: 80,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    invisible: {
        display: 'none',
    },
});