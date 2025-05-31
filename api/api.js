import axios from 'axios';

import playersData from '../data/players.json';

export const getPlayerList = async () => {
  return playersData; // Simula resposta de API
  
};


export const getChampionList = async () => {
  const versionRes = await axios.get('https://ddragon.leagueoflegends.com/api/versions.json');
  const version = versionRes.data[0];

  const response = await axios.get(
    `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`
  );

  const championsData = response.data.data;

  const champions = Object.values(championsData).map((champion) => ({
    id: champion.id,
    key: champion.key, // 👈 isso aqui é fundamental
    name: champion.name,
    title: champion.title,
    tags: champion.tags,
    blurb: champion.blurb,
    stats: champion.stats,
    image: `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.id}_0.jpg`,
    icon: `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.image.full}`,
  }));

  return champions;
};

