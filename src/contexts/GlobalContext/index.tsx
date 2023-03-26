import { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import { Portuguese, English } from '../../language';

export type Language = {
    flag: any,
    defaultUsername: string,
    welcome: string,
    chooseLayout: string,
    login: string,
    addUser: string,
    addLayout: string,
    editControllerText: string,
    button: string,
    screen: string,
}

interface GlobalContextValue {
    username: string | undefined,
    language: Language,
    setUsername: React.Dispatch<React.SetStateAction<string | undefined>>,
    setLanguage: React.Dispatch<React.SetStateAction<Language>>,
}

interface GlobalProviderProps {
    children: ReactNode;
}  

const initialValues: GlobalContextValue = {
    username: 'usuário',
    language: Portuguese,
    setUsername: () => null,
    setLanguage: () => null,
};

const GlobalContext = createContext<GlobalContextValue>(initialValues);

export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (typeof context !== 'undefined'){
    return context;
  } throw new Error(`useGlobalContext must be used within a GlobalContext`);
}

export default function GlobalProvider(props: GlobalProviderProps) {
  const [username, setUsername] = useState<string | undefined>(initialValues.username);
  const [language, setLanguage] = useState<Language>(initialValues.language);

  const { children } = props;

  const value:GlobalContextValue = {
    username,
    language,
    setUsername,
    setLanguage,
  }

  return (
    <GlobalContext.Provider value={value}>              
          {children}
    </GlobalContext.Provider>
  );
}