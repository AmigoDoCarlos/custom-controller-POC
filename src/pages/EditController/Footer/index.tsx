import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../../colors';
import { LogOut, Edit3, Trash2 } from 'react-native-feather';
import { useEditContext } from '../../../contexts/EditContext';

type Position = {
    x: number,
    y: number,
}

export default function Footer(){

    const { floatingButton, setFloatingButton } = useEditContext();
    const [XY, setXY] = useState<Position>({x: 0, y: 0});

    const backgroundStyle = useMemo(() => {
        if(floatingButton.self && floatingButton.hitbox && floatingButton.state === 'moving'){
            const hit = floatingButton.hitbox;
            const self = floatingButton.self;
            if(self.x + hit.w > XY.x){
                return style.redBackground;
            }
            return style.gridBackground;
        } return style.background;
    }, [floatingButton]);

    useEffect(() => {
        if(floatingButton.self && floatingButton.hitbox){
            const hit = floatingButton.hitbox;
            const self = floatingButton.self;
            if(self.x + hit.w > XY.x){
                return setFloatingButton(previous => ({
                    ...previous,
                    sectors: previous.sectors.map(s => ({
                        ...s,
                        selected: false,
                    }))
                }));
            }
        }
    }, [floatingButton.self])

    const definePosition = (e: any) => {
        e.target.measure((x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
            setXY({x: pageX, y: pageY});
        })
    }

    const Icons = useCallback(() => {
        const hit = floatingButton.hitbox;
        const self = floatingButton.self;
        
        if(floatingButton.state === 'moving') return (
            <Trash2
                color={(self && hit && self.x + hit.w > XY.x)? colors.darkGrey : colors.red}
                width={30}
                height={30}
            />
        ) 
        return (
            <>
                <View style={style.icon}>
                    <LogOut color={colors.acqua} width={30} height={30}/>
                </View>
                <View style={style.icon}>
                    <Edit3 color={colors.acqua} width={30} height={30}/>
                </View>
            </>
        )
    }, [floatingButton.self]);

    
    return (
        <View onLayout={definePosition} style={backgroundStyle}>
            <Icons />
        </View>
    )
}

const style = StyleSheet.create({
    background: {
        width: 60,
        height: '100%',
        alignItems: 'center',
        flexDirection: 'column',
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
    icon: {
        marginTop: 15,
        marginBottom: 15,
    }
});