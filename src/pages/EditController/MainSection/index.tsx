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

            //PAREI AQUI todo resolver:
            // finalizar a adição do trecho de código deste lado para os novos botões adicionados;
            // passar o tamanho dos botões em um contexto. Atualmente o floatingButton recebe um tamanho e este componente aqui usa outro não necessariamente relacionado.
            // ajustar a detecção de colisão para os novos botões e telas

            if((floatingButton.type === ElementType.button1x1 && selection.length === 1)
                || (floatingButton.type === ElementType.button1x2 && selection.length === 2)
                || (floatingButton.type === ElementType.button2x1 && selection.length === 2)
                || (floatingButton.type === ElementType.screen2x1 && selection.length === 2)
                || (floatingButton.type === ElementType.screen2x2 && selection.length === 4)
                || (floatingButton.type === ElementType.screen4x2 && selection.length === 8)
            ){
                manageElement(selfID, selection[0].element, floatingButton.type);
            } else if(floatingButton.trashed){
                removeElement(selfID);
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
                trashed: false,
            }))
        }
    }, [floatingButton.state]);

    useEffect(() => {
        const selection = floatingButton.sectors.filter(s => s.selected);
        console.log(selection.map(s => s.element.id));
    }, [floatingButton.sectors]);



    const manageElement = (targetID: number, sectorElement: Element, type: ElementType) => {
        if(buttons.find(b => b.id === targetID)){                      //se o usuário mudou um botão já existente para outro setor  
            updateElement(targetID, sectorElement);
        } else {                                                        //já se o usuário simplesmente adicionou um novo botão
            const {x, y, id} = sectorElement;
            newElement(type, x, y, id);
        }
    }

    const newElement = (type: ElementType, x: number, y: number, id: number) => {
        
        let props = {                   //o valor padrão é o button 1x1
            text: language.button,
            color: colors.darkWhite,
            background: colors.blue, 
            width: 89,
            height: 70,
            hitboxRatio: [0.05, 0.05],
        };

        switch(type){
            case ElementType.button1x2:
                props = {
                    text: language.button,
                    color: colors.darkWhite,
                    background: colors.blue,
                    width: 89,
                    height: 140,
                    hitboxRatio: [0.05, 0.45],
                }
            break;
            case ElementType.button2x1:
                props = {
                    text: language.button,
                    color: colors.darkWhite,
                    background: colors.blue,
                    width: 180,
                    height: 70,
                    hitboxRatio: [0.45, 0.05],
                }
            break;
            case ElementType.screen2x1:
                props = {
                    text: language.screen,
                    color: colors.black,
                    background: colors.darkWhite, 
                    width: 180,
                    height: 70,
                    hitboxRatio: [0.45, 0.05],
                }
            break;
            case ElementType.screen2x2:
                props = {
                    text: language.screen,
                    color: colors.black,
                    background: colors.darkWhite, 
                    width: 180,
                    height: 140,
                    hitboxRatio: [0.45, 0.45],
                }
            break;
            case ElementType.screen4x2:
                props = {
                    text: language.screen,
                    color: colors.black,
                    background: colors.darkWhite, 
                    width: 360,
                    height: 140,
                    hitboxRatio: [0.65, 0.45],
                }
            break;
        }

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