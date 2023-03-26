import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { colors } from '../../colors';
import EditContext from '../../contexts/EditContext';
import Footer from './Footer';
import MainSection from './MainSection';


export default function EditController(){

    return (
        <SafeAreaView>
            <StatusBar hidden barStyle={'dark-content'} backgroundColor={colors.darkWhite}/>
            <EditContext>
                <View style={style.background}>
                    <View />
                    <MainSection/>
                    <Footer />
                </View>
            </EditContext>
        </SafeAreaView>
    )
}

const style = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: colors.darkWhite,
    },
});