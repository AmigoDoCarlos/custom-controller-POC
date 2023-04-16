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
        if(floatingButton.hitbox && floatingButton.state === 'released'){
            const selfID = floatingButton.hitbox.sectors[0];
            const selection = floatingButton.sectors.filter(s => s.selected);

            //PAREI AQUI todo resolver:
            // passar o tamanho dos botões em um contexto. Atualmente o floatingButton recebe um tamanho e este componente aqui usa outro não necessariamente relacionado.

            if((floatingButton.type === ElementType.button1x1 && selection.length === 1)
                || (floatingButton.type === ElementType.button1x2 && selection.length === 2)
                || (floatingButton.type === ElementType.button2x1 && selection.length === 2)
                || (floatingButton.type === ElementType.screen2x1 && selection.length === 2)
                || (floatingButton.type === ElementType.screen2x2 && selection.length === 4)
                || (floatingButton.type === ElementType.screen4x2 && selection.length === 8)
            ){
                const occupiedSectors = selection.map(s => s.element);
                manageElement(selfID, occupiedSectors, floatingButton.type);
            } else if(floatingButton.trashed){
                removeElement(selfID);
            }
             

            setFloatingButton(previous => ({
                ...previous,
                state: 'idle',
                type: undefined,
                sectors: previous.sectors.map(s => ({
                    ...s,
                    selected: false,
                })),
                hitbox: undefined,
                trashed: false,
            }))
        }
    }, [floatingButton.state]);


    const manageElement = (targetID: number, sectors: Element[], type: ElementType) => {
        if(buttons.find(b => b.sectorsOccupied[0] === targetID)){        //se o usuário mudou um botão já existente para outro setor  
            updateElement(targetID, sectors[0]);
        } else {                                                        //já se o usuário simplesmente adicionou um novo botão
            newElement(type, sectors);
        }
    }

    const newElement = (type: ElementType, sectors: Element[]) => {
        
        const sectorsIDs = sectors.map(s => s.id);
        
        let props = {                   //o valor padrão é o button 1x1
            text: language.button,
            color: colors.darkWhite,
            background: colors.blue, 
            width: 89,
            height: 72,
            hitboxRatio: [0.05, 0.05],
        };

        switch(type){
            case ElementType.button1x2:
                props = {
                    text: language.button,
                    color: colors.darkWhite,
                    background: colors.blue,
                    width: 89,
                    height: 150,
                    hitboxRatio: [0.05, 0.45],
                }
            break;
            case ElementType.button2x1:
                props = {
                    text: language.button,
                    color: colors.darkWhite,
                    background: colors.blue,
                    width: 185,
                    height: 74,
                    hitboxRatio: [0.45, 0.05],
                }
            break;
            case ElementType.screen2x1:
                props = {
                    text: language.screen,
                    color: colors.black,
                    background: colors.darkWhite, 
                    width: 185,
                    height: 74,
                    hitboxRatio: [0.45, 0.05],
                }
            break;
            case ElementType.screen2x2:
                props = {
                    text: language.screen,
                    color: colors.black,
                    background: colors.darkWhite, 
                    width: 185,
                    height: 150,
                    hitboxRatio: [0.45, 0.45],
                }
            break;
            case ElementType.screen4x2:
                props = {
                    text: language.screen,
                    color: colors.black,
                    background: colors.darkWhite, 
                    width: 380,
                    height: 150,
                    hitboxRatio: [0.65, 0.45],
                }
            break;
        }

        const nb = {
            type: type,
            X: sectors[0].x,
            Y: sectors[0].y,
            backgroundColor: props.background,
            borderColor: colors.black,
            command: '',
            text: props.text,
            textColor: props.color,
            hitboxRatio: props.hitboxRatio,
            width: props.width,
            height: props.height,
            sectorsOccupied: sectorsIDs,
        }

        setButtons(previous => [...previous, nb]);
    }


    const updateElement = (fromID: number, destination: Element) => {
        return setButtons(buttons => buttons.map(button => {
            if (button.sectorsOccupied[0] === fromID){

                const delta = destination.id - fromID;
                
                return {
                    ...button,
                    X: destination.x,
                    Y: destination.y,
                    sectorsOccupied: button.sectorsOccupied.map(s => (s + (delta))),
                }    
            } return button;
        }))
    }

    
    const removeElement = (id: number) => {
        if(id >= 0){
            const index = buttons.findIndex(b => b.sectorsOccupied[0] === id);
            console.log('removendo elemento ', id, '->', buttons.map(b => b.sectorsOccupied[0]), index);
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