import React, { ReactNode, useState } from 'react';

export enum States {
    Idle,
    Expand,
}

type DraggableButton = {
    state: 'idle' | 'moving' | 'released'
    x: number;
    y: number;
    sector: {
        id: number,
        x: number,
        y: number
    } | undefined, 
}

type LocalContext = {
    grid: boolean,
    floatingButton: DraggableButton,
    state: States,
    setFloatingButton: React.Dispatch<React.SetStateAction<DraggableButton>>
    setState: React.Dispatch<React.SetStateAction<States>>,
    setGrid: React.Dispatch<React.SetStateAction<boolean>>,
}

const initialDraggableButton: DraggableButton = {state: 'idle', x: 0, y: 0, sector: undefined};

const initialContext:LocalContext = {
    grid: false,
    floatingButton: initialDraggableButton,
    state: States.Idle,
    setGrid: () => null,
    setFloatingButton: () => null,
    setState: () => null,
}


interface EditProviderProps {
    children: ReactNode;
}  

const EditContext = React.createContext<LocalContext>(initialContext);

export function useEditContext(){
    return React.useContext(EditContext);
}

export default function EditProvider(props: EditProviderProps){
    const [grid, setGrid] = useState(false);
    const [floatingButton, setFloatingButton] = useState<DraggableButton>(initialDraggableButton);
    const [state, setState] = useState<States>(States.Idle);

    const { children } = props;
    
    const context: LocalContext = {
        grid,
        floatingButton,
        state,
        setGrid,
        setFloatingButton,
        setState,
    }

return (
    <EditContext.Provider value={context}>
        {children}
    </EditContext.Provider>
    )
}