import { useState, useEffect } from 'react';

const DDRAGON_BASE_URL = 'https://ddragon.leagueoflegends.com';
const LANGUAGE = 'pt_BR'; // Ou a língua que preferir

export default function useChampionDetails(championId) {
  const [championDetails, setChampionDetails] = useState(null);
  const [latestVersion, setLatestVersion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchVersion = async () => {
      setLoading(true); // Inicia o carregamento ao buscar a versão
      setError(null);   // Limpa erros anteriores
      try {
        const response = await fetch(`${DDRAGON_BASE_URL}/api/versions.json`);
        if (!response.ok) throw new Error('Falha ao buscar versões do DDragon.');
        const versions = await response.json();
        if (versions.length > 0) {
          setLatestVersion(versions[0]);
        } else {
          throw new Error('Nenhuma versão encontrada.');
        }
      } catch (e) {
        console.error("Erro buscando versão DDragon no hook:", e);
        setError(e.message);
        setLoading(false); // Para de carregar se não conseguir a versão
      }
    };
    fetchVersion();
  }, []); // Executa apenas uma vez para pegar a versão
  useEffect(() => {
    if (!latestVersion || !championId) {
      if (latestVersion && !championId && !loading) { // Se tem versão mas não ID, e não está já carregando
        setError("ID do campeão não fornecido.");
        setLoading(false);
      }
      return; // Não faz nada se não tiver versão ou ID do campeão
    }

    const fetchChampionDetails = async () => {
      setLoading(true); // Garante que está carregando ao buscar detalhes
      setError(null);   // Limpa erros anteriores
      try {
        const response = await fetch(`${DDRAGON_BASE_URL}/cdn/${latestVersion}/data/${LANGUAGE}/champion/${championId}.json`);
        if (!response.ok) {
          throw new Error(`Falha ao buscar dados para ${championId} (Status: ${response.status})`);
        }
        const jsonResponse = await response.json();
        setChampionDetails(jsonResponse.data[championId]);
      } catch (e) {
        console.error("Erro buscando detalhes do campeão no hook:", e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchChampionDetails();
  }, [latestVersion, championId]); // Re-executa se a versão ou ID mudar
  return { championDetails, loading, error, latestVersion };
}