import React, { useEffect, useRef, useMemo } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useEditContext } from '../../../../contexts/EditContext';
import select from './assets/selected.png';
import unselect from './assets/unselected.png';

export type Position = {
    x: number,
    y: number,
}

const width = 104;
const height = 62;

interface SectorProps {
    myID: number;
    hasAButton: boolean,
    onToggleSelection: () => void;
}

export default function Sector({myID, hasAButton, onToggleSelection}: SectorProps){

    const { floatingButton, setFloatingButton } = useEditContext();
    const XY = useRef<Position>({x: 0, y: 0});
    const selected = useRef<boolean | undefined>(undefined);

    const source = useMemo(() => {
        if(floatingButton.x > XY.current.x && floatingButton.x < (XY.current.x + width)){
            if(floatingButton.y > XY.current.y && floatingButton.y < (XY.current.y + height)){
                if(!hasAButton) selected.current = true;
                return select;
            }
        } 
        if (!hasAButton && selected.current === true) selected.current = false;
        return unselect;
    }, [floatingButton]);

    useEffect(() => {
        if(typeof selected.current === 'boolean'){
            if(selected.current === true) {
                setFloatingButton(previous => ({...previous, sectorXY: XY.current}))
                onToggleSelection();
            } else {
                setFloatingButton(previous => ({...previous, sectorXY: undefined}))
            }
        }
    }, [selected.current]);

    const definePosition = (e: any) => {
        e.target.measure((x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
            XY.current = ({x: pageX, y: pageY});
        })
    }

    if(!hasAButton) return (
        <Image onLayout={definePosition} source={source} style={style.sector}/>
    )
    return <View onLayout={definePosition} style={style.sector} />
}

const style = StyleSheet.create({
    sector: {
        width: width,
        height: height,
    }
});