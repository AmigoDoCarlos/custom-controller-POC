import { Language } from "../contexts/GlobalContext"
import brazil from '../assets/flags/brazil.png';
import unitedStates from '../assets/flags/united-states.png';

export const Portuguese: Language = {
    flag: brazil,
    defaultUsername: 'Usuário',
    welcome: 'Bem vindo!',
    chooseLayout: 'Escolha o controle que você deseja usar (ou crie um novo).',
    login: 'Quem é você na fila do pão?',
    addUser: 'Novo',
    addLayout: 'Adicionar layout',
    editControllerText: `Aperte o ícone '+' para inserir um novo elemento...`, 
    button: 'Botão',
    screen: 'Tela',
}

export const English: Language = {
    flag: unitedStates,
    defaultUsername: 'User',
    welcome: 'Welcome!',
    chooseLayout: 'Pick the controller you wish to use (or create a new one).',
    login: 'Who are you in the line of bread?',
    addUser: 'New',
    addLayout: 'Add new layout',
    editControllerText: `Press the '+' icon to insert a new element...`, 
    button: 'Button',
    screen: 'Screen',
}