import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useEditContext } from '../../../contexts/EditContext';
import { colors } from '../../../colors';

export default function Hitbox(){                           //this is just for debugging; enable it on the main file to see where the hitbox of the floating button is being placed
    const { floatingButton } = useEditContext();
    if(floatingButton.location && floatingButton.hitbox){
        const hit = floatingButton.hitbox;
        const self = floatingButton.location;
        return (
            <View style={{
                ...style.dummy,
                width: hit.w,
                height: hit.h,
                transform: [{translateX: self.x}, {translateY: self.y}],
            }} />
        )
    }
    return <></>
}

const style = StyleSheet.create({
    dummy: {
        backgroundColor: colors.red,
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 8,
    },
});


