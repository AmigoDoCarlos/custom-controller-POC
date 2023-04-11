import React, { useEffect } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { colors } from '../../../colors';
import { useGlobalContext } from '../../../contexts/GlobalContext';
import { Element, useEditContext, numberOfCollumns, margin, sectors, ElementType } from '../../../contexts/EditContext';
import Sector from './Sector';

export default function MainSection(){
    const { floatingButton, buttons, setFloatingButton, setButtons } = useEditContext(); 
    const { language } = useGlobalContext();
    

    useEffect(() => {
        if(floatingButton.self && floatingButton.state === 'released'){
            const selfID = floatingButton.self.id;
            const selection = floatingButton.sectors.filter(s => s.selected);

            if(selection.length === 0){
               removeElement(selfID); 
            } else {   
                if(floatingButton.type === ElementType.button){              
                    const sector = selection[0];
                    if(selfID !== sector.element.id){                                //se o usuário NÃO devolveu o botão pro mesmo lugar, entra no if
                        if(buttons.find(b => b.id === selfID)){                      //se o usuário mudou um botão já existente para outro setor  
                            updateElement(selfID, sector.element);
                        } else {                                                     //já se o usuário simplesmente adicionou um novo botão
                            const {x, y, id} = sector.element;
                            newElement(ElementType.button, x, y, id);
                        }
                    }
                }
                else if(floatingButton.type === ElementType.screen){
                    const baseSector = selection[0];
                    if(selection.length === 4){
                        if(buttons.find(b => b.id === selfID)){                       
                            updateElement(selfID, baseSector.element);
                        } else {                                                     
                            const {x, y, id} = baseSector.element;
                            newElement(ElementType.screen, x, y, id);
                        }
                    }
                }
            }

            setFloatingButton(previous => ({
                ...previous,
                state: 'idle',
                type: undefined,
                self: undefined,
                sectors: previous.sectors.map(s => ({
                    ...s,
                    selected: false,
                })),
                hitbox: undefined,
            }))
        }
    }, [floatingButton.state]);


    const newElement = (type: ElementType, x: number, y: number, id: number) => {
        const props = (type === ElementType.button)? {
            text: language.button,
            color: colors.darkWhite,
            background: colors.acqua, 
            width: 89,
            height: 70,
            hitboxRatio: 0.05,
        } : {
            text: language.screen,
            color: colors.black,
            background: colors.darkWhite, 
            width: 178,
            height: 140,
            hitboxRatio: 0.45,
        };

        const nb = {
            type: type,
            X: x - (margin * 0.5),
            Y: y - (margin * 0.5),
            id: id,
            backgroundColor: props.background,
            borderColor: colors.black,
            command: '',
            text: props.text,
            textColor: props.color,
            hitboxRatio: props.hitboxRatio,
            width: props.width,
            height: props.height,
        }

        setButtons(previous => [...previous, nb]);
    }


    const updateElement = (fromID: number, destination: Element) => {
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

    
    const removeElement = (id: number) => {
        if(id){
            const index = buttons.findIndex(b => b.id === id);
            console.log('removendo elemento ', id, '->', buttons.map(b => b.id), index);
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