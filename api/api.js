import axios from 'axios';

const API_KEY = 'RGAPI-973bb639-0e9f-4af8-b6a3-8fea3aa4c324'; // Substitua pela sua chave da Riot
const REGION = 'br1'; // Região para APIs regionais (ex: summoner)
const CONTINENT = 'americas'; // Usado para Account API e Match API

// Obter conta pelo Riot ID
export const getAccountByRiotId = async (gameName, tagLine) => {
  const url = `https://${CONTINENT}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`;
  
  const response = await axios.get(url, {
    headers: {
      'X-Riot-Token': API_KEY,
    },
  });

  return response.data; // { puuid, gameName, tagLine }
};

// Obter lista de partidas por PUUID
export const getMatchList = async (puuid) => {
  const response = await axios.get(
    `https://${CONTINENT}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10`,
    {
      headers: {
        'X-Riot-Token': API_KEY,
      },
    }
  );
  return response.data;
};

// Obter detalhes de uma partida
export const getMatchDetails = async (matchId) => {
  const response = await axios.get(
    `https://${CONTINENT}.api.riotgames.com/lol/match/v5/matches/${matchId}`,
    {
      headers: {
        'X-Riot-Token': API_KEY,
      },
    }
  );
  return response.data;
};

// Obter lista de campeões
export const getChampionList = async () => {
  const versionRes = await axios.get('https://ddragon.leagueoflegends.com/api/versions.json');
  const version = versionRes.data[0]; // Versão mais recente
  const response = await axios.get(
    `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`
  );
  return response.data.data;
};
