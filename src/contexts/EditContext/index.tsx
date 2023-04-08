import React, { useEffect, ReactNode, useState } from 'react';

export type Element = {
    id: number,
    x: number,
    y: number,
}

export type Hitbox = {
    x: number,
    y: number,
    w: number,
    h: number,
}

type DraggableButton = {
    state: 'idle' | 'moving' | 'released'
    self: Element | undefined,                 //as próprias coordenadas X, Y e o ID do botão sendo movido.
    sector: Element | undefined,                //as coordenas X, Y e o ID do setor por onde o botão foi arrastado por último
    hitbox: Hitbox | undefined,
}

export type PositionedButton = {
    id: number,
    backgroundColor: string,
    borderColor: string,
    command: string,
    X: number,
    Y: number,
    text: string,
    textColor: string,
    hitboxRatio: number,
    width: number,
    height: number,
}

type LocalContext = {
    floatingButton: DraggableButton,
    buttons: PositionedButton[],
    setFloatingButton: React.Dispatch<React.SetStateAction<DraggableButton>>
    setButtons: React.Dispatch<React.SetStateAction<PositionedButton[]>>
}

const initialDraggableButton: DraggableButton = {state: 'idle', self: {x: -1, y: -1, id: -1}, sector: undefined, hitbox: undefined};

const initialContext:LocalContext = {
    floatingButton: initialDraggableButton,
    buttons: [],
    setFloatingButton: () => null,
    setButtons: () => null,
}


interface EditProviderProps {
    children: ReactNode;
}  

const EditContext = React.createContext<LocalContext>(initialContext);

export function useEditContext(){
    return React.useContext(EditContext);
}

export default function EditProvider(props: EditProviderProps){
    const [floatingButton, setFloatingButton] = useState<DraggableButton>(initialDraggableButton);
    const [buttons, setButtons] = useState<PositionedButton[]>([]);
    const { children } = props;

    useEffect(() => {
        console.log(buttons.map(b => b.id));
    }, [buttons]);
    
    const context: LocalContext = {
        floatingButton,
        buttons,
        setFloatingButton,
        setButtons,
    }

return (
    <EditContext.Provider value={context}>
        {children}
    </EditContext.Provider>
    )
}