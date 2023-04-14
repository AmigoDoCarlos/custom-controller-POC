import React, { ReactNode, useState } from 'react';

export enum ElementType {
    button1x1,
    button1x2,
    button2x1,
    screen2x1,
    screen2x2,
    screen4x2,
}

export type Element = {
    id: number,
    x: number,
    y: number,
}

export type Hitbox = {
    w: number,
    h: number,
}

export type SectorType = {
    element: Element,
    selected: boolean,
}

type DraggableButton = {
    state: 'idle' | 'moving' | 'released'
    type: ElementType | undefined,
    self: Element | undefined,                 //as próprias coordenadas X, Y e o ID do botão sendo movido.
    sectors: SectorType[],                     //as coordenas X, Y e o ID do setor por onde o botão foi arrastado por último
    hitbox: Hitbox | undefined,
    trashed: boolean,
}

export type PositionedElement = {
    id: number,
    type: ElementType,
    backgroundColor: string,
    borderColor: string,
    command: string,
    X: number,
    Y: number,
    text: string,
    textColor: string,
    hitboxRatio: number[],
    width: number,
    height: number,
}

type LocalContext = {
    floatingButton: DraggableButton,
    buttons: PositionedElement[],
    setFloatingButton: React.Dispatch<React.SetStateAction<DraggableButton>>
    setButtons: React.Dispatch<React.SetStateAction<PositionedElement[]>>
}

export const numberOfButtons = 32;
export const numberOfCollumns = 8;
export const margin = 4;
export const sectors = [...Array(numberOfButtons)].map((x, i) => (i));

const initialSectors: SectorType[] = sectors.map(id => ({
    selected: false,
    element: {
        id: id,
        x: -1,
        y: -1,
    }
}));

const initialDraggableButton: DraggableButton = {
    state: 'idle', 
    self: {
        x: -1,
        y: -1,
        id: -1
    }, 
    sectors: initialSectors,
    type: undefined,
    hitbox: undefined,
    trashed: false,
};

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
    const [buttons, setButtons] = useState<PositionedElement[]>([]);
    const { children } = props;

    // useEffect(() => {
    //     console.log(buttons.map(b => b.id));
    // }, [buttons]);

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