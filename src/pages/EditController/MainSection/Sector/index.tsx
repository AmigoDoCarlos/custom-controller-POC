import React, { useEffect, useRef } from 'react';
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
    hasAButton: boolean,
    myID: number,
}

export default function Sector({hasAButton, myID}: SectorProps){

    const { floatingButton, setFloatingButton } = useEditContext();
    const XY = useRef<Position>({x: 0, y: 0});
    const selected = useRef<boolean>(false);
    
    useEffect(() => {
        if(floatingButton.x > XY.current.x && floatingButton.x < (XY.current.x + width)){
            if(floatingButton.y > XY.current.y && floatingButton.y < (XY.current.y + height)){
                selected.current = true;
            }
        } else {
            selected.current = false;
        }
    }, [floatingButton]);

    useEffect(() => {
        if(selected.current === true){
            setFloatingButton(previous => ({
                ...previous,
                sector: {
                    id: myID,
                    x: XY.current.x,
                    y: XY.current.y,
                }
            }))
        }
    }, [selected.current]);

    const definePosition = (e: any) => {
        e.target.measure((x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
            XY.current = ({x: pageX, y: pageY});
        })
    }

    if(!hasAButton) {
        if(myID === floatingButton.sector?.id){
            return <Image onLayout={definePosition} source={select} style={style.sector} />
        } return <Image onLayout={definePosition} source={unselect} style={style.sector} />
    }
    return <View onLayout={definePosition} style={style.sector} />
}

const style = StyleSheet.create({
    sector: {
        width: width,
        height: height,
    }
});