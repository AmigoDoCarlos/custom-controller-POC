import brazil from '../assets/flags/brazil.png';
import unitedStates from '../assets/flags/united-states.png';

export type Language = {
    flag: any,
    defaultUsername: string,
    welcome: string,
    chooseLayout: string,
    login: string,
    addUser: string,
    addLayout: string,
    editController: {
      idleText: string,
      expandedText: string,
    },
    button: string,
    screen: string,
}

export const Portuguese: Language = {
    flag: brazil,
    defaultUsername: 'Usuário',
    welcome: 'Bem vindo!',
    chooseLayout: 'Escolha o controle que você deseja usar (ou crie um novo).',
    login: 'Quem é você na fila do pão?',
    addUser: 'Novo',
    addLayout: 'Adicionar layout',
    editController: {
        idleText: `Aperte o ícone '+' para inserir um novo elemento...`,
        expandedText: `Legal! Agora arraste pra cá o elemento escolhido.`,
    }, 
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
    editController: {
        idleText: `Press the '+' icon to insert a new element...`,
        expandedText: `Great! Now drag the chosen element over here.`,
    }, 
    button: 'Button',
    screen: 'Screen',
}