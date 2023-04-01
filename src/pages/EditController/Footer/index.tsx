import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../../colors';
import { LogOut, Edit3, Trash2 } from 'react-native-feather';
import { useEditContext } from '../../../contexts/EditContext';
import AddButton from '../AddButton';

type Position = {
    x: number,
    y: number,
}

export default function Footer(){

    const { grid, floatingButton, setFloatingButton } = useEditContext();
    const [XY, setXY] = useState<Position>({x: 0, y: 0});

    const backgroundStyle = useMemo(() => {
        if(grid){
            if(floatingButton.x > XY.x){
                return style.redBackground;
            }
            return style.gridBackground;
        } return style.background;
    }, [grid, floatingButton]);

    useEffect(() => {
        if(floatingButton.x > XY.x){
            return setFloatingButton(previous => ({
                ...previous,
                sector: undefined
            }));
        }
    }, [floatingButton.x])

    const definePosition = (e: any) => {
        e.target.measure((x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
            setXY({x: pageX, y: pageY});
        })
    }

    const Icons = useCallback(() => {
        if(grid) return (
            <Trash2
                color={(floatingButton.x > XY.x)? colors.darkGrey : colors.red}
                width={30}
                height={30}
            />
        ) 
        return (
            <View style={style.icons}>
                <LogOut color={colors.acqua} width={30} height={30}/>
                <Edit3 color={colors.acqua} width={30} height={30}/>
            </View>
        )
    }, [grid, floatingButton]);

    
    return (
        <View onLayout={definePosition} style={backgroundStyle}>
            <Icons />
            <View style={style.addButton}>
                <AddButton/>
            </View>
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
    redBackground: {
        width: 60,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.red,
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














    // return (
    //     <View style={style.gridBackground}>
    //         <TouchableOpacity onPress={() => setGrid(false)}>
    //             <Trash2 color={colors.red} width={30} height={30}/>
    //         </TouchableOpacity>
    //     </View>
    // )