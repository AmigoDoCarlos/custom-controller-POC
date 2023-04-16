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
    const XY = useRef<undefined | Position>(undefined);
    const selected = useRef<boolean>(false);

    const hasAButton = useMemo(() => {
        if(!floatingButton.hitbox || buttons.length === 0) return false;
        
        const butts = buttons.map(b => b.sectorsOccupied);
        const flyingButts = floatingButton.hitbox.sectors;
        let hasOrNot = false;

        butts.forEach(butt => {
            if(butt.includes(myID)){
                hasOrNot = true;
            }
        })

        if(hasOrNot && flyingButts.findIndex(fb => fb === myID) > -1){
            hasOrNot = false;
        }

        return hasOrNot;
    }, [buttons, floatingButton.hitbox]); 
    

    useEffect(() => {
        if(XY.current && floatingButton.hitbox && floatingButton.location){
            const self = floatingButton.location;
            const hit = floatingButton.hitbox;

            if((XY.current.x < self.x + hit.w) &&
                (XY.current.x + width > self.x) &&
                (XY.current.y < self.y + hit.h) &&
                (XY.current.y + height > self.y)
            ){
                selected.current = true;
            } else {
                selected.current = false;
            }
        }
    }, [floatingButton.location]);


    useEffect(() => {
        if(XY.current && !hasAButton){
            const myElement = {
                id: myID,
                x: XY.current.x,
                y: XY.current.y,
            }
            setFloatingButton(previous => ({
                ...previous,
                sectors: previous.sectors.map(s => {
                    if(s.element.id === myID) return ({
                        element: (s.element.x === -1)? myElement : s.element,
                        selected: selected.current,
                    });
                    return s;
                })
            }))
        }
    }, [selected.current]);



    const definePosition = (e: any) => {
        if(!XY.current){
            e.target.measure((x: number, y: number, width: number, height: number, pageX: number, pageY: number) => {
                XY.current = ({x: pageX, y: pageY});
            })
        }
    }

    if(!hasAButton) {
        if(floatingButton.sectors.find(s => s.element.id === myID)?.selected){
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