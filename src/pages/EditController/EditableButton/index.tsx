import React, { useState, useMemo } from "react";
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
    hitboxRatio: number,
    width: number,
    height: number,
}


export default function EditableButton({myID, X, Y, width, height, hitboxRatio, text, command, textColor, borderColor, backgroundColor}: EditableButtonProps){

    const [savedProps, setSavedProps] = useState({
        myID,
        X,
        Y,
        width, 
        height,
        hitboxRatio,
        text,
        command,
        textColor,
        borderColor,
        backgroundColor,
    });

    const floatingStyle:any = useMemo(() => ({
        background: {
            width: savedProps.width,
            height: savedProps.height,
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
            hitboxRatio={savedProps.hitboxRatio}
            size={{
                w: savedProps.width,
                h: savedProps.height,
            }}
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

