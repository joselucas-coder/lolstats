
export const patchVersion = '14.10.1';
export const language = 'pt_BR';

export const getChampionImageUri = (championId) => `https://ddragon.leagueoflegends.com/cdn/${patchVersion}/img/champion/${championId}.png`;

const fakeWinRate = () => `${(Math.random() * (55 - 45) + 45).toFixed(1)}%`;

export const detailedRolesData = {
    TOP: {
        name: 'TOP',
        image: require('../assets/roles/top.png'), // <-- VOLTOU PARA ../assets/
        description: 'A Top Lane é geralmente ocupada por campeões tanques ou lutadores.',
        champions: [ { id: 'Garen', name: 'Garen', winRate: fakeWinRate() }, { id: 'Darius', name: 'Darius', winRate: fakeWinRate() }, { id: 'Teemo', name: 'Teemo', winRate: fakeWinRate() }, { id: 'Malphite', name: 'Malphite', winRate: fakeWinRate() }, { id: 'Ornn', name: 'Ornn', winRate: fakeWinRate() }, { id: 'Aatrox', name: 'Aatrox', winRate: fakeWinRate() }, { id: 'Camille', name: 'Camille', winRate: fakeWinRate() }, { id: 'Fiora', name: 'Fiora', winRate: fakeWinRate() }, { id: 'Irelia', name: 'Irelia', winRate: fakeWinRate() }, { id: 'Jax', name: 'Jax', winRate: fakeWinRate() } ],
    },
    JUNGLE: {
        name: 'JUNGLE',
        image: require('../assets/roles/jungle.png'), // <-- VOLTOU PARA ../assets/
        description: 'O Caçador se move pela selva.',
        champions: [ { id: 'LeeSin', name: 'Lee Sin', winRate: fakeWinRate() }, { id: 'Vi', name: 'Vi', winRate: fakeWinRate() }, { id: 'Kindred', name: 'Kindred', winRate: fakeWinRate() }, { id: 'KhaZix', name: 'Kha\'Zix', winRate: fakeWinRate() }, { id: 'Hecarim', name: 'Hecarim', winRate: fakeWinRate() }, { id: 'Viego', name: 'Viego', winRate: fakeWinRate() }, { id: 'Diana', name: 'Diana', winRate: fakeWinRate() }, { id: 'Graves', name: 'Graves', winRate: fakeWinRate() }, { id: 'XinZhao', name: 'Xin Zhao', winRate: fakeWinRate() }, { id: 'Nocturne', name: 'Nocturne', winRate: fakeWinRate() } ],
    },
    MID: {
        name: 'MID',
        image: require('../assets/roles/mid.png'), // <-- VOLTOU PARA ../assets/
        description: 'Campeões de dano mágico ou assassinos dominam o Mid.',
        champions: [ { id: 'Ahri', name: 'Ahri', winRate: fakeWinRate() }, { id: 'Yasuo', name: 'Yasuo', winRate: fakeWinRate() }, { id: 'Zed', name: 'Zed', winRate: fakeWinRate() }, { id: 'Seraphine', name: 'Seraphine', winRate: fakeWinRate() }, { id: 'Orianna', name: 'Orianna', winRate: fakeWinRate() }, { id: 'Viktor', name: 'Viktor', winRate: fakeWinRate() }, { id: 'Syndra', name: 'Syndra', winRate: fakeWinRate() }, { id: 'Akali', name: 'Akali', winRate: fakeWinRate() }, { id: 'Katarina', name: 'Katarina', winRate: fakeWinRate() }, { id: 'Anivia', name: 'Anivia', winRate: fakeWinRate() } ],
    },
    ADC: {
        name: 'ADC',
        image: require('../assets/roles/adc.png'), // <-- VOLTOU PARA ../assets/
        description: 'Atiradores causam dano à distância.',
        champions: [ { id: 'Jinx', name: 'Jinx', winRate: fakeWinRate() }, { id: 'Caitlyn', name: 'Caitlyn', winRate: fakeWinRate() }, { id: 'Ezreal', name: 'Ezreal', winRate: fakeWinRate() }, { id: 'Kaisa', name: 'Kai\'Sa', winRate: fakeWinRate() }, { id: 'Vayne', name: 'Vayne', winRate: fakeWinRate() }, { id: 'Jhin', name: 'Jhin', winRate: fakeWinRate() }, { id: 'Ashe', name: 'Ashe', winRate: fakeWinRate() }, { id: 'MissFortune', name: 'Miss Fortune', winRate: fakeWinRate() }, { id: 'Samira', name: 'Samira', winRate: fakeWinRate() }, { id: 'Lucian', name: 'Lucian', winRate: fakeWinRate() } ],
    },
    SUP: {
        name: 'SUP',
        image: require('../assets/roles/sup.png'), // <-- VOLTOU PARA ../assets/
        description: 'Suportes ajudam o time com utilidade ou proteção.',
        champions: [ { id: 'Thresh', name: 'Thresh', winRate: fakeWinRate() }, { id: 'Lulu', name: 'Lulu', winRate: fakeWinRate() }, { id: 'Leona', name: 'Leona', winRate: fakeWinRate() }, { id: 'Nami', name: 'Nami', winRate: fakeWinRate() }, { id: 'Soraka', name: 'Soraka', winRate: fakeWinRate() }, { id: 'Janna', name: 'Janna', winRate: fakeWinRate() }, { id: 'Blitzcrank', name: 'Blitzcrank', winRate: fakeWinRate() }, { id: 'Nautilus', name: 'Nautilus', winRate: fakeWinRate() }, { id: 'Rakan', name: 'Rakan', winRate: fakeWinRate() }, { id: 'Morgana', name: 'Morgana', winRate: fakeWinRate() } ],
    },
};

export const allChampionsList = Object.values(detailedRolesData)
    .flatMap(role => role.champions)
    .filter((champ, index, self) => index === self.findIndex((c) => c.id === champ.id));