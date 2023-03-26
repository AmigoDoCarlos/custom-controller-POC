import React, { ReactNode, useState } from 'react';


type DraggableButton = {
    x: number;
    y: number;
}

type LocalContext = {
    grid: boolean,
    setGrid: React.Dispatch<React.SetStateAction<boolean>>,
    floatingButton: DraggableButton,
    setFloatingButton: React.Dispatch<React.SetStateAction<DraggableButton>>
}

const initialButton:DraggableButton = {
    x: 0,
    y: 0,
}

const initialContext:LocalContext = {
    grid: false,
    setGrid: () => null,
    floatingButton: initialButton,
    setFloatingButton: () => null,
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
    const [floatingButton, setFloatingButton] = useState(initialButton);

    const { children } = props;
    
    const context: LocalContext = {
        grid,
        setGrid,
        floatingButton,
        setFloatingButton,
    }

return (
    <EditContext.Provider value={context}>
        {children}
    </EditContext.Provider>
    )
}