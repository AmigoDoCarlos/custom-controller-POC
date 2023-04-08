import React, { useEffect } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { colors } from '../../../colors';
import { useGlobalContext } from '../../../contexts/GlobalContext';
import { Element, useEditContext } from '../../../contexts/EditContext';
import Sector from './Sector';

const numberOfButtons = 32;
const numberOfCollumns = 8;
const margin = 4;
const sectors = [...Array(numberOfButtons)].map((x, i) => (i));

export default function MainSection(){
    const { floatingButton, buttons, setFloatingButton, setButtons } = useEditContext(); 
    const { language } = useGlobalContext();
    

    useEffect(() => {
        if(floatingButton.self && floatingButton.state === 'released'){
            const selfID = floatingButton.self.id;

            if(!floatingButton.sector){
                removeButton(selfID);
            } else {    
                const sectorID = floatingButton.sector.id;
                
                if(selfID !== sectorID){                                //se o usuário NÃO devolveu o botão pro mesmo lugar, entra no if
                    if(buttons.find(b => b.id === selfID)){             //se o usuário mudou um botão já existente para outro setor  
                        updateButton(selfID, floatingButton.sector);
                    } else {                                            //já se o usuário simplesmente adicionou um novo botão
                        const {x, y, id} = floatingButton.sector;
                        newButton(x, y, id);
                    }
                }
            }


            setFloatingButton(previous => ({
                ...previous,
                state: 'idle',
                self: undefined,
                sector: undefined,
                hitbox: undefined,
            }))
        }
    }, [floatingButton.state]);

    const newButton = (x: number, y: number, id: number) => {
        const nb = {
            X: x - (margin * 0.5),
            Y: y - (margin * 0.5),
            id: id,
            backgroundColor: colors.acqua,
            borderColor: colors.black,
            command: '',
            text: language.button,
            textColor: colors.darkWhite,
            hitboxRatio: 0.05,
            width: 89,
            height: 70,
        }
        setButtons(previous => [...previous, nb]);
    }

    const updateButton = (fromID: number, destination: Element) => {
        return setButtons(buttons => buttons.map(button => {
            if (button.id === fromID){
                return {
                    ...button,
                    X: destination.x,
                    Y: destination.y,
                    id: destination.id,
                }    
            } return button;
        }))
    }

    const removeButton = (id: number) => {
        if(id){
            const index = buttons.findIndex(b => b.id === id);
            if(index >= 0){
                const newButtonList = buttons.slice();
                newButtonList.splice(index, 1);
                setButtons(newButtonList);
            }
        }
    }

    if(floatingButton.state !== 'moving'){
        if(buttons.length === 0) return (
            <Text style={style.text}>
                {language.editController.idleText}
            </Text>
        ) 
        return <></>
    }    

    return (
        <>
            <View>
                <View style={style.mapView}>
                    <FlatList
                        keyExtractor={item => `${item}`}
                        horizontal={false}
                        numColumns={numberOfCollumns}
                        contentContainerStyle={style.center}
                        style={style.mapView}
                        data={sectors}
                        renderItem={sectors => (
                            <View style={style.sectorContainer}>
                                <Sector 
                                    myID={sectors.item}
                                />
                            </View>
                        )}
                    />
                </View>
            </View>
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


















    // const addNewButton = (id: number, x: number, y: number) => {
    //     const newButton = {
    //         id: id,
    //         element: <EditableButton
    //             key={id}
    //             myID={id}
    //             backgroundColor={colors.acqua}
    //             borderColor={colors.black}
    //             command=''
    //             X={x - 0.5*margin}
    //             Y={y - 0.5*margin}
    //             text={language.button}
    //             textColor={colors.darkWhite}
    //         />
    //     }
    //     setButtons(previous => [...previous, newButton]);
    // }
























//isSelected={floatingButton.sector?.id === sectors.item}


// useEffect(() => {
//     console.log('Setores com botões:', buttons.map(b => b.id));
// }, [buttons])






// const floatingStyle = {
//     background: {
//         width: 108,
//         height: 66,
//         borderRadius: 20,
//         backgroundColor: colors.acqua,
//         borderColor: colors.black,
//         borderWidth: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     text: {
//         color: colors.darkWhite,
//         fontSize: 16,
//     },
// };

















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