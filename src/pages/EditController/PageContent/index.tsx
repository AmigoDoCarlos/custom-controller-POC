import React, { useMemo } from "react";
import { View, StyleSheet } from 'react-native';
import { useEditContext } from "../../../contexts/EditContext";
import { colors } from "../../../colors";
import Footer from "../Footer"; 
import MainSection from "../MainSection";
import EditableButton from "../EditableButton";
import AddButton from "../AddButton";

export default function PageContent(){

    const { buttons } = useEditContext();
    
    const positionedButtons = useMemo(() => (
        buttons.map(button => (
            <EditableButton
                type={button.type}
                key={button.id}
                myID={button.id}
                X={button.X}
                Y={button.Y}
                backgroundColor={button.backgroundColor}
                borderColor={button.borderColor}
                textColor={button.textColor}
                text={button.text}
                command=""
                hitboxRatio={button.hitboxRatio}
                width={button.width}
                height={button.height}
            />
        ))
    ), [buttons]);

    return (
            <View style={style.background}>
                <View />
                <MainSection/>
                <Footer />
                {positionedButtons}
                <View style={style.addButton}>
                    <AddButton/>
                </View>
            </View>
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
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
});