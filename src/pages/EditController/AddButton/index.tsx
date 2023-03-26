import React, { useState, useMemo } from 'react';
import { View, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native';
import { useGlobalContext } from '../../../contexts/GlobalContext';
import { colors } from '../../../colors';
import { Plus, X } from 'react-native-feather';
import Button from '../../../components/Button';
import FloatingButton from '../FloatingButton';


export default function AddButton(){
    const { language } = useGlobalContext();
    const [expand, setExpand] = useState<boolean>(false);

    const buttonStyle = useMemo(() => {
        if(expand) return style.expandBackground;
        return style.background;
    }, [expand]);

    const toggleExpand = () => {
        setExpand(prev => !prev);
    }

    if(expand){
        return (
            <View style={style.inline}>
                <TouchableOpacity onPress={toggleExpand}>
                    <X color={colors.red} width={50} height={50}/>
                </TouchableOpacity>
                <View style={buttonStyle}>
                    <FloatingButton>{language.button}</FloatingButton>
                    <Button>{language.screen}</Button>
                </View>
            </View>
        )
    } 
    return (
        <TouchableHighlight underlayColor={colors.clickBlue} style={buttonStyle} onPress={toggleExpand}>
            <Plus color={colors.darkWhite} width={50} height={50}/>
        </TouchableHighlight>
    )
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
});