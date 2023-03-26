import React from 'react';
import { Image, StyleSheet } from 'react-native';
import select from './assets/selected.png';
import unselect from './assets/unselected.png';

interface SectorProps {
    selected: boolean,
}

export default function Sector({selected}: SectorProps){
    if(selected){
        return (
            <Image source={select} style={style.image}/>
        )
    } 
    return (
        <Image source={unselect} style={style.image}/>
    )
}

const style = StyleSheet.create({
    image: {
        width: 100,
        height: 60, 
        margin: 8,
    },
});