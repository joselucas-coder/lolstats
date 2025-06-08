LolStats
LolStats é um aplicativo móvel completo para entusiastas de League of Legends, desenvolvido com React Native e Expo. O aplicativo permite que os usuários explorem informações detalhadas sobre campeões, acompanhem notícias e classificações do cenário de e-sports, e personalizem seus perfis com seus campeões favoritos.

📋 Índice
Sobre o Projeto
✨ Funcionalidades
🚀 Tecnologias Utilizadas
🏁 Começando
🔧 Estrutura do Projeto
📖 Sobre o Projeto
O LolStats foi criado para ser um centro de informações para jogadores e fãs de League of Legends. Ele consome dados diretamente da API oficial da Riot Games (DDragon) para fornecer informações atualizadas sobre campeões e suas habilidades. Além disso, utiliza o Firebase para autenticação e armazenamento de dados do usuário, como campeões favoritos, criando uma experiência personalizada.

✨ Funcionalidades
Autenticação de Usuário: Sistema completo de login e registro usando Firebase Authentication, com suporte para e-mail/senha e login com Google.
Navegação Completa: Navegação intuitiva com um menu lateral (Drawer) e uma barra de abas inferior (Tab Navigator).
Tela Inicial Dinâmica: Apresenta um resumo com a "Partida da Semana", atalhos para notas de patch, e seções de Campeões e E-sports.
Estatísticas de Campeões:
Lista de campeões filtrada por rota (TOP, JUNGLE, MID, ADC, SUP) e uma lista com todos os campeões.
Tela de detalhes para cada campeão com lore, habilidades, skins e runas recomendadas (dados estáticos).
Imagens e dados dos campeões são carregados dinamicamente da API.
Seção de E-sports:
Acompanhamento de diversas ligas como LCK e LTA.
Tabelas de classificação detalhadas com dados das equipes.
Seções para destaques e notícias, com navegação para detalhes completos.
Busca Avançada: Funcionalidade de busca que permite encontrar jogadores (de um arquivo JSON local) e campeões (via API).
Perfil de Usuário:
Exibe informações do usuário como nome e e-mail.
Permite a personalização de até 3 campeões favoritos, com dados salvos no Firestore.
Exibe estatísticas (atualmente com dados estáticos) de KDA e taxa de vitórias/derrotas.
Funcionalidade de logout.
Tela de Configurações: Opções para gerenciar notificações e tema (funcionalidade da UI implementada).
🚀 Tecnologias Utilizadas
Este projeto foi construído utilizando as seguintes tecnologias:

Framework: React Native (com Expo)
Linguagem: JavaScript
Autenticação e Banco de Dados: Firebase (Authentication e Firestore)
Navegação: React Navigation (Native Stack, Bottom Tabs, Drawer)
Requisições HTTP: Axios e Fetch API
Componentes de UI:
react-native-vector-icons
react-native-table-component
expo-linear-gradient
Gerenciamento de Imagens: expo-image-picker para seleção de imagens de perfil.
🏁 Começando
Para executar este projeto localmente, siga os passos abaixo.

Pré-requisitos
Node.js (versão LTS recomendada)
npm ou Yarn
Expo CLI (npm install -g expo-cli)
Instalação
Clone o repositório:

Bash

git clone https://github.com/joselucas-coder/lolstats.git
cd lolstats
Instale as dependências:

Bash

npm install
ou

Bash

yarn install
Configure o Firebase:
O projeto utiliza Firebase para autenticação e banco de dados. Você precisará criar seu próprio projeto no Firebase Console.

Crie o arquivo firebaseConfig.js na raiz do projeto.
Adicione suas credenciais do Firebase, substituindo os valores de exemplo. O arquivo deve ter a seguinte estrutura:
<!-- end list -->

JavaScript

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; 

const firebaseConfig = {
  apiKey: "SUA_API_KEY", 
  authDomain: "SEU_AUTH_DOMAIN", 
  projectId: "SEU_PROJECT_ID", 
  storageBucket: "SEU_STORAGE_BUCKET", 
  messagingSenderId: "SEU_MESSAGING_SENDER_ID", 
  appId: "SEU_APP_ID", 
  measurementId: "SEU_MEASUREMENT_ID" 
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
Inicie o projeto:

Bash

expo start
Use o aplicativo Expo Go no seu celular para escanear o QR code gerado no terminal.

🔧 Estrutura do Projeto
O projeto está organizado da seguinte forma para facilitar a manutenção e escalabilidade:

lolstats/
├── src/
│   ├── assets/           # Imagens, fontes e outros recursos estáticos
│   ├── data/             # Dados estáticos como `championData.js` e `players.json`
│   ├── hooks/            # Hooks customizados, como `useChampionDetails.js`
│   ├── navigation/       # Stacks de navegação e configurações do React Navigation
│   ├── screens/          # Componentes de tela principais da aplicação
│   │   ├── HomeScreen.js
│   │   ├── ChampionsScreen.js
│   │   ├── ProfileScreen.js
│   │   └── ...
│   └── services/         # Funções para interagir com APIs externas
├── App.js                # Componente raiz e container de navegação principal
├── firebaseConfig.js     # Configuração e inicialização do Firebase
└── package.json          # Dependências e scripts do projeto
