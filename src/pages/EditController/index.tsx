import React from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { colors } from '../../colors';
import EditContext from '../../contexts/EditContext';
import PageContent from './PageContent';
// import Dummy from './Dummy';


export default function EditController(){
    return (
        <SafeAreaView>
            <StatusBar hidden barStyle={'dark-content'} backgroundColor={colors.darkWhite}/>
            <EditContext>
                <PageContent />
            </EditContext>
        </SafeAreaView>
    )
}

