import React, { useMemo, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native';
import { useGlobalContext } from '../../../contexts/GlobalContext';
import { useEditContext } from '../../../contexts/EditContext';
import { colors } from '../../../colors';
import { Plus, X } from 'react-native-feather';
import FloatingButton from '../FloatingButton';

enum States {
    Retracted,
    Expanded,
}

export default function AddButton(){
    const { language } = useGlobalContext();
    const { floatingButton } = useEditContext();
    const [state, setState] = useState<States>(States.Retracted);
    
    const buttonStyle = useMemo(() => {
        if(state === States.Expanded){
            if(floatingButton.state === 'moving') return style.noBackground;
            return style.expandBackground;
        }
        return style.background;
    }, [state, floatingButton.state]);  

    const exitButtonStyle = useMemo(() => {
        if(floatingButton.state === 'moving') return style.invisible;
        return null;
    }, [floatingButton.state]);

    const screenButtonStyle = useMemo(() => {
        if(floatingButton.state === 'moving') return ({transform: [{translateX: 80}]});
        return null;
    }, [floatingButton.state]);

    switch(state){
        case States.Expanded: return (
            <View style={style.inline}>
                <TouchableOpacity style={exitButtonStyle} onPress={() => setState(States.Retracted)}>
                    <X color={colors.red} width={50} height={50}/>
                </TouchableOpacity>
                <View style={buttonStyle}>
                    <FloatingButton 
                        myID={100}
                        onStop={() => setState(States.Retracted)}
                        idleStyle={floatingStyle.idle}
                        movingStyle={floatingStyle.movingButton}
                        notMovingStyle={floatingStyle.invisible}
                    >
                        {language.button}
                    </FloatingButton>
                    <View style={screenButtonStyle}>
                        <FloatingButton
                            myID={200}
                            onStop={() => setState(States.Retracted)}
                            idleStyle={floatingStyle.idle}
                            movingStyle={floatingStyle.movingScreen}
                            notMovingStyle={floatingStyle.invisible}
                        >
                            {language.screen}
                        </FloatingButton>
                    </View>
                </View>
            </View>
        )
        default: return (
            <TouchableHighlight underlayColor={colors.clickBlue} style={buttonStyle} onPress={() => setState(States.Expanded)}>
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

const floatingStyle = {
    idle: {
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
    },
    movingButton: {
        background: {
            backgroundColor: colors.blue,
            width: 89,
            height: 70,
            borderRadius: 15,
            borderWidth: 1,
            borderColor: 'black',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
        },
        text: {
            color: colors.darkWhite,
            fontSize: 16,
        },
    },
    movingScreen: {
        background: {
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
        text: {
            color: colors.black,
            fontSize: 16,
        },
    },
    invisible: {
        background: {
            display: 'none',
        },
        text: {
            display: 'none',
        }
    }
};