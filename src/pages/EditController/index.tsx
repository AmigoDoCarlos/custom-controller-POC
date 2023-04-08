import React from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { colors } from '../../colors';
import EditContext from '../../contexts/EditContext';
import PageContent from './PageContent';
import Hitbox from './Hitbox';


export default function EditController(){
    return (
        <SafeAreaView>
            <StatusBar hidden barStyle={'dark-content'} backgroundColor={colors.darkWhite}/>
            <EditContext>
                <PageContent />
                <Hitbox />
            </EditContext>
        </SafeAreaView>
    )
}

