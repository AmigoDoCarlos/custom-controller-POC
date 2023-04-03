import React, { useState, useMemo } from "react";
import { View, StyleSheet } from "react-native";
import FloatingButton from "../FloatingButton";

interface EditableButtonProps {
    myID: number,
    X: number,
    Y: number,
    text: string,
    command: string,
    textColor: string
    borderColor: string,
    backgroundColor: string,
}

const width = 89;
const height = 70;

export default function EditableButton({myID, X, Y, text, command, textColor, borderColor, backgroundColor}: EditableButtonProps){

    const [savedProps, setSavedProps] = useState({
        myID,
        X,
        Y,
        text,
        command,
        textColor,
        borderColor,
        backgroundColor,
    });

    const floatingStyle:any = useMemo(() => ({
        background: {
            width: width,
            height: height,
            borderRadius: 15,
            backgroundColor: savedProps.backgroundColor,
            borderColor: savedProps.borderColor,
            borderWidth: 1,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: savedProps.Y,
            left: savedProps.X,
            zindex: 10,
        },
        text: {
            color: savedProps.textColor,
            fontSize: 16,
        },
    }), [savedProps]);

    return (
        <FloatingButton
            myID={myID}
            idleStyle={floatingStyle}
        >
            {savedProps.text}
        </FloatingButton>
    )
}











































// const backgroundStyle = {
//     backgroundColor: backgroundColor,
//     borderColor: borderColor,
//     left: initialX,
//     top: initialY,
// }

