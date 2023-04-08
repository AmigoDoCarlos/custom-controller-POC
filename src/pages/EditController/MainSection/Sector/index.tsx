import React, { useEffect, useRef, useMemo } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useEditContext } from '../../../../contexts/EditContext';
import select from './assets/selected.png';
import unselect from './assets/unselected.png';

export type Position = {
    x: number,
    y: number,
}

const width = 89;
const height = 0.7865 * width;

interface SectorProps {
    myID: number,
}

export default function Sector({myID}: SectorProps){
    const { buttons, floatingButton, setFloatingButton } = useEditContext();
    const XY = useRef<Position>({x: 0, y: 0});
    const selected = useRef<boolean>(false);

    const hasAButton = useMemo(() => (
        buttons.find(b => b.id === myID) &&
        floatingButton.self &&
        floatingButton.self.id !== myID
    ), [buttons, floatingButton.self]); 
    
    useEffect(() => {
        if(floatingButton.self && floatingButton.hitbox){
            const hitX = floatingButton.self.x + floatingButton.hitbox.x;
            const hitY = floatingButton.self.y + floatingButton.hitbox.y; 
            const hitW = floatingButton.hitbox.w;
            const hitH = floatingButton.hitbox.y;

            if((XY.current.x < hitX + hitW) && (XY.current.x + width > hitX)){
                if((XY.current.y < hitY + hitH) && (XY.current.y + height > hitY)){
                    selected.current = true;
                }
            } else {
                selected.current = false;
            }
        }
    }, [floatingButton.self]);

    useEffect(() => {
        if(!hasAButton && selected.current === true){
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