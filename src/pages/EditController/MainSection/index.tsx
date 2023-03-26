import React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { colors } from '../../../colors';
import { useGlobalContext } from '../../../contexts/GlobalContext';
import { useEditContext } from '../../../contexts/EditContext';
import Sector from './Sector';


export default function MainSection(){
    const { grid } = useEditContext();
    
    const { language } = useGlobalContext();

    if(!grid) return (
        <Text style={style.text}>
            {language.editControllerText}
        </Text>
    )

    const sectors = [...Array(24)].map((x, i) => ({
        id: i,
        selected: false,
    }));

    return (
        <View style={style.mapView}>
            <FlatList
                keyExtractor={item => `${item.id}`}
                horizontal={false}
                numColumns={6}
                contentContainerStyle={style.center}
                style={style.mapView}
                data={sectors}
                renderItem={sectors => <Sector selected={sectors.item.selected}/>}
            />
        </View>
    )
}

const style = StyleSheet.create({
    text: {
        maxWidth: 200,
        color: colors.blue,
        fontSize: 16,
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
    }
});