import React from 'react';
import AddButton from '../AddButton';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../../colors';
import { LogOut, Edit3, Trash2 } from 'react-native-feather';
import { useEditContext } from '../../../contexts/EditContext';

export default function Footer(){
    const { grid } = useEditContext();

    if(!grid) return (
        <View style={style.background}>
            <View style={style.icons}>
                <LogOut color={colors.acqua} width={30} height={30}/>
                <Edit3 color={colors.acqua} width={30} height={30}/>
            </View>
            <View style={style.addButton}>
                <AddButton/>
            </View>
        </View>
    )
    return (
        <View style={style.gridBackground}>
            <TouchableOpacity>
                <Trash2 color={colors.red} width={30} height={30}/>
            </TouchableOpacity>
        </View>
    )
}

const style = StyleSheet.create({
    background: {
        width: 60,
        height: '100%',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: colors.darkGrey,
    },
    gridBackground: {
        width: 60,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.darkGrey,
    },
    icons: {
        marginTop: 15,
        flexDirection: 'column',
        height: 90,
        justifyContent: 'space-between',
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    }
});