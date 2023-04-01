import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { colors } from '../../../colors';
import { useGlobalContext } from '../../../contexts/GlobalContext';
import { States, useEditContext } from '../../../contexts/EditContext';
import EditableButton from '../EditableButton';
import Sector from './Sector';

type Button = {
    id: number,
    element: JSX.Element,
}

const sectors = [...Array(24)].map((x, i) => (i));
const margin = 4;

export default function MainSection(){
    const { grid, state, floatingButton, setFloatingButton } = useEditContext(); 
    const { language } = useGlobalContext();
    const [buttons, setButtons] = useState<Button[]>([]);

    useEffect(() => {
        if(floatingButton.sector && floatingButton.state === 'released'){
            const {id, x, y} = floatingButton.sector;
            addNewButton(id, x, y);
            setFloatingButton(previous => ({
                ...previous,
                state: 'idle',
                sector: undefined,
            }))
        }
    }, [floatingButton.state]);

    const addNewButton = (id: number, x: number, y: number) => {
        const newButton = {
            id: id,
            element: <EditableButton
                key={id}
                backgroundColor={colors.acqua}
                borderColor={colors.black}
                command=''
                initialX={x - 0.5*margin}
                initialY={y - 0.5*margin}
                text={language.button}
            />
        }
        setButtons(previous => [...previous, newButton]);
    }

    useEffect(() => {
        console.log('Setores com botões:', buttons.map(b => b.id));
    }, [buttons])

    const PositionedButtons = useCallback(() => (
        <>{buttons.map(b => b.element)}</>
    ), [buttons]);

    if(!grid){
        if(buttons.length === 0) return (
            <Text style={style.text}>
                {(state === States.Idle)? language.editController.idleText: language.editController.expandedText}
            </Text>
        )
        return <PositionedButtons/>
    }    

    return (
        <>
            <View>
                <View style={style.mapView}>
                    <FlatList
                        keyExtractor={item => `${item}`}
                        horizontal={false}
                        numColumns={6}
                        contentContainerStyle={style.center}
                        style={style.mapView}
                        data={sectors}
                        renderItem={sectors => (
                            <View style={style.sectorContainer}>
                                <Sector 
                                    hasAButton={buttons.findIndex(b => b.id === sectors.item) !== -1}
                                    myID={sectors.item}
                                />
                            </View>
                        )}
                    />
                </View>
            </View>
            <PositionedButtons/>
        </>
    )
}

const style = StyleSheet.create({
    text: {
        maxWidth: 200,
        color: colors.blue,
        fontSize: 16,
        textAlign: 'center',
    },
    coordinates: {
        color: colors.blue,
        textAlign: 'center',
    },
    mapView: {
        flexGrow: 0,
        backgroundColor: colors.darkWhite,    
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    center: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    sectorContainer: {
        margin: margin,
    }
});













//isSelected={floatingButton.sector?.id === sectors.item}



























// const manageSelection = (sectorID: number, state: boolean) => {
    //     const sects = selectedSectors.current.slice();
    //     const index = sects.findIndex(s => s === sectorID);
    //     if(state === true){
    //         if(index > -1) return;
    //         sects.push(sectorID);
    //     } else {
    //         if(index < 0) return;
    //         sects.splice(index, 1);
    //     }
    //     selectedSectors.current = sects;
    // }


// useEffect(() => {
    //     if(floatingButton.state === 'released'){
    //         const last = selectedSectors.current.length - 1;
    //         setFloatingButton({...floatingButton, state: 'idle'});  
    //         setButtons(previous => [...previous, newButton]);
    //         }
    //         selectedPosition.current = (undefined);
    //     }
    // }, [floatingButton]);



{/* <Text style={style.coordinates}>
    Posicione o elemento onde você deseja que ele fique.
</Text> */}