import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useEditContext } from '../../../contexts/EditContext';
import { colors } from '../../../colors';

export default function Dummy(){
    const { floatingButton } = useEditContext();

    return <View style={{...style.dummy, transform: [{translateX: floatingButton.x}, {translateY: floatingButton.y}]}} />
}

const style = StyleSheet.create({
    dummy: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: colors.red,
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 8,
    },
});


