import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Linking, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Função auxiliar para abrir links
const openLink = (url) => {
    Linking.openURL(url).catch(err => console.error("Não foi possível abrir o link", err));
};

// --- Funções Auxiliares de Renderização ---
const renderLink = (text, url) => (
    <TouchableOpacity onPress={() => openLink(url)}>
        <Text style={styles.link}>{text}</Text>
    </TouchableOpacity>
);

const renderChampionChange = (champName, shortDesc, changes, longDesc, imageUrl) => (
    <View style={styles.sectionBlock}>
        <View style={styles.sectionHeader}>
            {imageUrl && <Image source={{ uri: imageUrl }} style={styles.sectionImage} />}
            <Text style={styles.sectionName}>{champName}</Text>
        </View>
        <Text style={styles.paragraphItalic}>{shortDesc}</Text>
        <Text style={styles.paragraph}>{longDesc}</Text>
        {changes.map((change, index) => (
            <View key={index} style={styles.changeItem}>
                <Text style={styles.abilityName}>{change.ability}</Text>
                <Text style={styles.abilityDesc}>{change.desc}</Text>
            </View>
        ))}
    </View>
);

const renderItemChange = (itemName, changes, description = null, imageUrl) => (
    <View style={styles.sectionBlock}>
         <View style={styles.sectionHeader}>
            {imageUrl && <Image source={{ uri: imageUrl }} style={styles.sectionImage} />}
            <Text style={styles.sectionName}>{itemName}</Text>
        </View>
        {description && <Text style={styles.paragraphItalic}>{description}</Text>}
        {changes.map((change, index) => (
            <Text key={index} style={styles.abilityDesc}>{change}</Text>
        ))}
    </View>
);

const renderSkin = (skinName, imageUrl, chromas = []) => (
     <View style={styles.skinBlock}>
        {imageUrl && <Image source={{ uri: imageUrl }} style={styles.skinImage} resizeMode="cover" />}
        <Text style={styles.skinName}>{skinName}</Text>
        {chromas.length > 0 && (
            <View style={styles.chromaContainer}>
                <Text style={styles.chromaTitle}>Cromas:</Text>
                {chromas.map((c, i) => <Text key={i} style={styles.chromaItem}>• {c}</Text>)}
            </View>
        )}
    </View>
);

// --- Componente Principal ---
export default function UpdatesScreen() {
    const navigation = useNavigation();

    // URLs de exemplo (substitua pelas suas) - AGORA USADAS DIRETAMENTE
    const patchVersion = "14.10.1"; // Apenas para referência, se precisar
    const imageUrlBeforeText = 'https://preview.redd.it/spirit-blossom-irelia-splash-art-v0-vyi36bf6bzue1.jpeg?width=1080&crop=smart&auto=webp&s=7354b31b966ee1171746e46ba0a09c7b56babc24'; // Substitua pela URL da sua imagem


    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>

                {/* --- Título e Meta Informações --- */}
                <Text style={styles.title}>Notas da Atualização 25.10</Text>
                <Text style={styles.subtitle}>A Atualização 25.10 está escrita nas estrelas✨</Text>
                <Text style={styles.meta}>Atualizações do jogo | Riot Sakaar | 13/05/2025</Text>

                 {/* --- IMAGEM ANTES DO TEXTO PRINCIPAL --- */}
            {imageUrlBeforeText && <Image source={{ uri: imageUrlBeforeText }} style={styles.imageBeforeText}  />}

                {/* --- Corpo da Notícia (Completo) --- */}
                <Text style={styles.paragraph}>
                    A 2ª Temporada já está a todo vapor e trouxemos sua dose quinzenal de Notas da Atualização!
                </Text>
                <Text style={styles.paragraph}>
                    Treta, nosso mais novo modo de jogo, finally chegou, então siga imediatamente para Bandópolis e tente proteger suas tropas! Além disso, temos Ícones Croma de antigos pacotes da Loja Mítica disponíveis na rotação, uma atualização para jogadores da região SEA envolvendo ajustes nas ranqueadas depois da fusão e os famosos balanceamentos de sempre.
                </Text>
                <Text style={styles.paragraph}>
                    Falando sobre o ambiente de jogo, trouxemos uma revisão para os itens de PdH, fortalecendo quem precisa, enfraquecendo alguns infratores e ajustando opções para atrair mais usuários. Também trouxemos um fortalecimento daqueles para o Livro de Feitiços Deslacrado, além dos conhecidos balanceamentos menores para Campeões.
                </Text>
                <Text style={styles.paragraph}>
                    Quer mais informações sobre o LoL? Visite a {renderLink('Wiki da Comunidade do League of Legends', 'https://leagueoflegends.fandom.com/pt-br/wiki/Wiki_da_Comunidade_do_League_of_Legends')}!
                </Text>
                 <Text style={styles.paragraph}>
                    Se está procurando as Notas da Atualização do TFT, basta acessá-las {renderLink('aqui', 'https://teamfighttactics.leagueoflegends.com/pt-br/latest-patch-notes/')}!
                </Text>
                <Text style={styles.signature}>Caden "Riot Sakaar" House</Text>

                <Text style={styles.heading}>Destaques da Atualização</Text>
                {renderSkin("Vex Astromante", 'https://cmsassets.rgpub.io/sanity/images/dsfx7636/news_live/ae2404d96f9091436426a4478c7049a8484fb6b6-1920x1080.jpg')}
                {renderSkin("Yorick Velho Oeste", 'https://cmsassets.rgpub.io/sanity/images/dsfx7636/news_live/04041796073e93839a3d3428ded167ad8dd68c06-1920x1080.jpg')}
                {renderSkin("Ryze Lua Sangrenta", 'https://cmsassets.rgpub.io/sanity/images/dsfx7636/news_live/d6ec8dc9ac1154af61863078dd38afb8e523fd95-1920x1080.jpg')}
                <Text style={styles.bulletPoint}>• Vex Astromante, Yorick Velho Oeste e Ryze Lua Sangrenta ficarão disponíveis em 14/05/2025 às 15:00 BRT.</Text>


                <Text style={styles.heading}>Novo modo de jogo: Treta!</Text>
                <Text style={styles.paragraph}>Nosso mais novo modo de jogo, Treta, está chegando nesta atualização! O Modo Treta foi criado para ser um modo rápido em que equipes de cinco se enfrentam em uma área reduzida para abater oponentes e conduzir tropas até a base inimiga para vencer. É um modo de muita ação e pouca estratégia, em que as partidas duram só cerca de 10 minutos. É tipo o ARAM, mas você pode escolher seu Campeão favorito, não precisa se preocupar com objetivos ou torres e pode focar nessa pegada de mata-mata em equipe.</Text>
                <Text style={styles.paragraph}>Cada equipe começa com 250 de Vida, e a primeira que reduzir a vida da adversária a 0 vence.</Text>
                <Text style={styles.paragraph}>Você pode reduzir a Vida da equipe inimiga das seguintes formas:</Text>
                <Text style={styles.bulletPoint}>  • Eliminar Campeões inimigos causa <Text style={styles.bold}>5 de dano</Text> à equipe inimiga.</Text>
                <Text style={styles.bulletPoint}>  • Enquanto a equipe inimiga não estiver com pouca Vida, eliminar tropas inimigas também causa <Text style={styles.bold}>1 de dano</Text>.</Text>
                <Text style={styles.bulletPoint}>  • Cada tropa levada ao portal de Bandópolis da equipe adversária causa <Text style={styles.bold}>1 de dano</Text>.</Text>
                <Text style={styles.paragraph}>Também temos alguns acampamentos interessantes na lateral da rota única que concedem efeitos e ouro, mas não se distraia, ou os oponentes vão avançar até o seu portal!</Text>
                <Text style={styles.paragraph}>Mal podemos esperar para ver a galera curtindo o modo Treta! Como sempre, conte para nós o que achou. Vamos monitorar os dados e feedbacks de perto para fazer ajustes conforme necessário. Aproveite, e nos vemos em Bandópolis!</Text>
                <Text style={styles.subHeading}>Cronograma da ativação do modo Treta:</Text>
                <Text style={styles.bulletPoint}>• EUW, EUN, RU, TR e ME1: <Text style={styles.bold}>14/05 às 12:00 BRT.</Text></Text>
                <Text style={styles.bulletPoint}>• Outras regiões da Riot: <Text style={styles.bold}>14/05 às 15:00 BRT.</Text></Text>
                <Text style={styles.paragraph}>O modo Treta ficará disponível até a implementação da Atualização 25.13 em 24/06/2025, então aproveite enquanto pode!</Text>

                <Text style={styles.heading}>Ganho de PdL em servidores da região SEA</Text>
                <Text style={styles.paragraph}>Com a chegada da 2ª Temporada, queremos resolver o problema de dificuldade em alcançar determinados ranques nos servidores SEA depois da fusão concluída no início do ano. Apesar de estarmos contentes com o resultado geral da fusão e com os objetivos alcançados, os servidores não são todos iguais, então variáveis como número de jogadores, amplitude dos níveis de habilidade etc. acabaram impactando a escalada ranqueada em alguns deles. Então, analisando os dados de uma Temporada Ranqueada na íntegra, trouxemos alguns ajustes. E, como acabamos passando do ponto, trouxemos uma pequena reversão. Os ganhos de PdL nesta atualização serão melhores para os jogadores do servidor de Singapura depois do ajuste.</Text>

                <Text style={styles.heading}>Campeões</Text>

                {renderChampionChange(
                    "Cho'Gath", "Velocidade de Ataque base aumentada. Dano do Q reduzido. Dano do E aumentado.",
                    [{ ability: 'Atributos base', desc: 'Velocidade de Ataque no nível 1: 0,625 ⇒ 0,658' }, { ability: 'Q - Ruptura', desc: 'Dano: 80/140/200/260/320 (+ 100% do PdH) ⇒ 80/135/190/245/300 (+ 100% do PdH)' }, { ability: 'E – Espinhos Vorpais', desc: 'Dano: 20/40/60/80/100 (+ 30% do PdH) (+ 2,5/2,75/3/3,25/3,5% (+ 0,5% por acúmulo de Banquete) da Vida máxima do alvo) ⇒ 20/40/60/80/100 (+ 30% do PdH) (+ 2,5/2,85/3,2/3,55/3,9% (+ 0,5% por acúmulo de Banquete) da Vida máxima do alvo)' }],
                    "Atualmente, o Cho'Gath está se dando bem na rota do meio, mas precisando de uma ajudinha na rota superior. As mudanças na Velocidade de Ataque e nos Espinhos Vorpais têm como objetivo reduzir as diferenças entre as itemizações de Chuva de Lâminas e Aperto dos Mortos Vivos, enquanto as mudanças em Ruptura são para enfraquecer o Campeão na rota do meio.",
                    'https://ddragon.leagueoflegends.com/cdn/14.10.1/img/champion/Chogath.png'
                )}

                {renderChampionChange(
                    "Kayn", "Crescimento de Vida reduzido.",
                    [{ ability: 'Atributos base', desc: 'Crescimento de Vida: 109 ⇒ 103' }],
                    "Kayn tem se mostrado um Campeão acima da média ultimamente, e as formas até que estão com taxas de vitórias similares! Sendo assim, trouxemos um enfraquecimento genérico para ambas as formas, algo que não afetará nem o início de jogo mais fraco, nem a sensação de jogar com o Campeão.",
                    'https://ddragon.leagueoflegends.com/cdn/14.10.1/img/champion/Kayn.png'
                )}

                {renderChampionChange(
                    "Lulu", "Crescimento de Armadura reduzido. Tempo de Recarga do R aumentado.",
                    [{ ability: 'Atributos base', desc: 'Crescimento de Armadura: 4,9 ⇒ 4,6' }, { ability: 'R – Crescimento Virente', desc: 'Tempo de Recarga: 100/90/80s ⇒ 120/100/80s' }],
                    "Lulu tem recebidos vários enfraquecimentos, mas continua poderosa na Fila Solo. Trouxemos mais alguns enfraquecimentos não convencionais para deixá-la em uma situação mais aceitável a longo prazo.",
                    'https://ddragon.leagueoflegends.com/cdn/14.10.1/img/champion/Lulu.png'
                )}

                {renderChampionChange(
                    "Fiddlesticks", "Duração do Temor do Q reduzida e dano ajustado. Dano do W aumentado.",
                    [{ ability: 'Q – Aterrorizar', desc: 'Duração do Temor: 1,25/1,5/1,75/2/2,25 ⇒ 1,2/1,4/1,6/1,8/2\nDano: 5/6/7/8/9% (+ 2% a cada 100 de PdH) da Vida atual do alvo ⇒ 4/4,5/5/5,5/6% (+ 3% a cada 100 de PdH) da Vida atual do alvo\nDano fortalecido: 10/12/14/16/18% (+ 4% a cada 100 de PdH) da Vida atual do alvo ⇒ 8/9/10/11/12% (+ 6% a cada 100 de PdH) da Vida atual do alvo' }, { ability: 'W – Colheita Farta', desc: 'Dano por segundo: 60/90/120/150/180 (+ 35% do PdH) ⇒ 60/90/120/150/180 (+ 40% do PdH)' }],
                    "O Fiddlesticks suporte está ficando mais popular que o caçador, o que não é exatamente um problema, exceto por estar poderoso demais lá na rota inferior. Trouxemos ajustes na tentativa de enfraquecê-lo como suporte e não alterar a força do caçador.",
                    'https://ddragon.leagueoflegends.com/cdn/14.10.1/img/champion/Fiddlesticks.png'
                )}

                {renderChampionChange(
                    "Naafiri", "Dano contra monstros da Passiva reduzido.",
                    [{ ability: 'Passiva – Em Maior Número', desc: 'Multiplicador de dano contra monstros da matilha: 155% ⇒ 135%' }],
                    "Tentaremos enfraquecer a Naafiri caçadora mais um pouco nesta atualização, já que ela ainda está bem forte e é uma das Campeãs mais banidas do jogo, mas não queremos impactar muito as coisas na rota do meio.",
                    'https://ddragon.leagueoflegends.com/cdn/14.10.1/img/champion/Naafiri.png'
                )}

                {renderChampionChange(
                    "Senna", "Chance de Acerto Crítico e chance de surgimento de almas da Passiva aumentadas. Cura do Q reduzida.",
                    [{ ability: 'Passiva – Absolvição', desc: 'Chance de Crítico a cada 20 acúmulos: 8% ⇒ 10%\nTaxa de surgimento de almas ao abater tropa/monstro: 8,4% ⇒ 14%' }, { ability: 'Q – Escuridão Perfurante', desc: 'Cura: 40/55/70/85/100 (+ 40% do DdA adicional) (+ 60% do PdH) ⇒ 40/55/70/85/100 (+ 40% do DdA adicional) (+ 55% do PdH)' }],
                    "Apesar de ser a itemização mais popular, a Senna de DdA tem um desempenho muito pior que a Senna encantadora. Queremos que as duas opções continuem igualmente viáveis, então vamos fortalecer a opção de DdA com mais dano de sustentação por meio de Chance de Crítico com as almas. Também queremos melhorar bastante a Senna carry, então a chance de surgimento de almas com o último golpe em tropas também aumentará. Como isso meio que fortalece todas as itemizações, vamos reduzir um pouco um multiplicador de PdH para compensar as coisas.",
                    'https://ddragon.leagueoflegends.com/cdn/14.10.1/img/champion/Senna.png'
                )}

                {renderChampionChange(
                    "Smolder", "Dano/queimadura do efeito passivo do Q e dano do E por acúmulo aumentados.",
                    [{ ability: 'Passiva – Treinamento Dracônico', desc: 'Q – dano por acúmulo: 0,3 ⇒ 0,4\nQ – dano de queimadura a cada 100 acúmulos: 0,4% ⇒ 0,5%\nE – dano do acerto por acúmulo: 0,1 ⇒ 0,12' }],
                    "Trouxemos uma forcinha para o Smolder nesta atualização. Como as últimas mudanças fizeram ele parar de protelar partidas no cenário profissional, concluímos que podemos devolver um pouco do escalamento por acúmulos de antes.",
                    'https://ddragon.leagueoflegends.com/cdn/14.10.1/img/champion/Smolder.png'
                )}

                {renderChampionChange(
                    "Vi", "Dano mínimo do Q reduzido e dano máximo aumentado. Custo de Mana e dano do R reduzidos.",
                    [{ ability: 'Q – Quebra-Cofres', desc: 'Dano mínimo: 45/70/95/120/145 (+ 80% do DdA adicional) ⇒ 40/60/80/100/120 (+ 60% do DdA adicional)\nDano máximo: 90/140/190/240/290 (+ 160% do DdA adicional) ⇒ 100/150/200/250/300 (+ 150% do DdA adicional)\nA restituição do Tempo de Recarga ao ser cancelado agora responde melhor.' }, { ability: 'E – Força Implacável', desc: 'Correção de bug: o E não causa mais Acerto Crítico de +100% do DdA total em vez de +75% do DdA total.' }, { ability: 'R – Saque e Enterrada', desc: 'Mana: 100/125/150 ⇒ 100\nDano: 150/275/400 (+ 90% do DdA adicional) ⇒ 150/250/350 (+90% do DdA adicional)' }],
                    "Vi se tornou uma presença um pouco estagnada na selva e está dominando principalmente ao explodir alvos frágeis no fim de jogo, deixando pouco espaço para contrajogadas. Queremos devolver a variedade para a mecânica de jogo da Campeã, mas sem enfraquecê-la em situações mais comuns.",
                    'https://ddragon.leagueoflegends.com/cdn/14.10.1/img/champion/Vi.png'
                )}

                {renderChampionChange(
                    "Xin Zhao", "Crescimento de Armadura reduzido.",
                    [{ ability: 'Atributos base', desc: 'Crescimento de Armadura: 5 ⇒ 4,4' }],
                    "Xin Zhao está forte tanto no cenário profissional quanto na Fila Solo. Vamos reduzir um pouco do Crescimento de Armadura para torná-lo menos resistente no fim de jogo, mas sem mudar demais as coisas para seus jogadores.",
                    'https://ddragon.leagueoflegends.com/cdn/14.10.1/img/champion/XinZhao.png'
                )}

                {renderChampionChange(
                    "Yuumi", "Cura do R reduzida.",
                    [{ ability: 'R – Capítulo Final', desc: 'Cura base por acerto: 35/50/65 ⇒ 30/40/50' }],
                    "Yuumi ainda está se mostrando uma das encantadoras mais fortes do jogo no momento. Tentaremos reduzir a segurança com que ela consegue curar a equipe aliada, principalmente nos confrontos de equipe.",
                    'https://ddragon.leagueoflegends.com/cdn/14.10.1/img/champion/Yuumi.png'
                )}

                <Text style={styles.heading}>Itens</Text>
                <Text style={styles.paragraph}>Nesta atualização, finally concluímos a revisão dos itens de PdH, o que acabou resultando em enfraquecimentos para os mais fortes, fortalecimentos para os mais fracos e uma reformulação de algumas opções para novos usuários.</Text>
                <Text style={styles.paragraph}>Os destaques são: Abraço de Seraph ficará mais forte para Campeões que usam muito Mana, como Cassiopeia e Kassadin, que também aproveitarão o Escudo com mais confiança; Foco do Horizonte está se tornando um item geral melhor para qualquer mago que aprecie PdH e Aceleração, mas, se algum usuário acabar ficando fraco, ficaremos contentes em trazer fortalecimentos na próxima atualização; Explocinturão Hextec está se tornando uma opção mais agressiva para assassinos e lutadores leves, como Evelynn e Ekko; Criptoflora está se tornando uma opção mais direta em comparação ao Cajado do Vazio. No geral, vamos acelerar o poder explosivo dos itens e, consequentemente, o pico de força dos assassinos.</Text>

                {renderItemChange("Maldição Sanguinária", ['Poder de Habilidade: 60 ⇒ 65', 'Vida: 350 ⇒ 400', 'Fragmentação de Resistência Mágica por acúmulo: 5% ⇒ 7,5%', 'Fragmentação máxima: 30% (inalterada)'], null, 'https://ddragon.leagueoflegends.com/cdn/14.10.1/img/item/3135.png')}
                {renderItemChange("Criptoflora", ['Poder de Habilidade: 60 ⇒ 75', 'Cura de Vida na Morte: 100 (+ 25% do PdH) ⇒ 100 (+ 20% do PdH)', 'Receita: Joia da Ruína + Códex Demoníaco + 900 de ouro ⇒ Joia da Ruína + Códex Demoníaco + Códex Demoníaco + 200 de ouro', 'Custo total em ouro: 2.850 ⇒ 3.000'], null, 'https://ddragon.leagueoflegends.com/cdn/14.10.1/img/item/4646.png')}
                {renderItemChange("Explocinturão Hextec", ['Poder de Habilidade: 60 ⇒ 70', 'Vida: 350 ⇒ 300', 'Aceleração de Habilidade: 15 ⇒ 20', 'Receita: Alternador Hextec + Gema Ardente + 700 de ouro ⇒ Alternador Hextec + Códex Demoníaco + Cristal de Rubi + 300 de ouro', 'Custo total em ouro: 2.600 ⇒ 2.650', 'O indicador de conjuração foi atualizado...', 'O item agora pode ser conjurado...'], null, 'https://ddragon.leagueoflegends.com/cdn/14.10.1/img/item/3152.png')}
                {renderItemChange("Foco do Horizonte", ['Poder de Habilidade: 75 ⇒ 110', 'Amplificação de Dano de Hiperdisparo: removida', 'Receita: ... ⇒ Códex Demoníaco + Códex Demoníaco + Varinha Explosiva + 350 de ouro', 'Custo total em ouro: 2.700 ⇒ 2.900'], null, 'https://ddragon.leagueoflegends.com/cdn/14.10.1/img/item/4628.png')}
                {renderItemChange("Tormento de Liandry", ['Poder de Habilidade: 70 ⇒ 60'], null, 'https://ddragon.leagueoflegends.com/cdn/14.10.1/img/item/6653.png')}
                {renderItemChange("Perdição de Lich", ['Poder de Habilidade: 115 ⇒ 100', 'Receita: ... ⇒ Fulgor + Cintilação Etérea + Varinha Explosiva + 250 de ouro', 'Custo total em ouro: 3.200 ⇒ 2.900'], null, 'https://ddragon.leagueoflegends.com/cdn/14.10.1/img/item/3100.png')}
                {renderItemChange("Companheiro de Luden", ['Custo total em ouro: 2.850 ⇒ 2.750', 'A dica flutuante agora exibe...'], null, 'https://ddragon.leagueoflegends.com/cdn/14.10.1/img/item/6655.png')}
                {renderItemChange("Malevolência", ['Poder de Habilidade: 85 ⇒ 90'], null, 'https://ddragon.leagueoflegends.com/cdn/14.10.1/img/item/4636.png')}
                {renderItemChange("Morellonomicon", ['Custo total em ouro: 2.950 ⇒ 2.850'], null, 'https://ddragon.leagueoflegends.com/cdn/14.10.1/img/item/3165.png')}
                {renderItemChange("Dente de Na'Shor", ['Custo total em ouro: 3.000 ⇒ 2.900'], null, 'https://ddragon.leagueoflegends.com/cdn/14.10.1/img/item/3115.png')}
                {renderItemChange("Capuz da Morte de Rabadon", ['Custo total em ouro: 3.600 ⇒ 3.500'], null, 'https://ddragon.leagueoflegends.com/cdn/14.10.1/img/item/3089.png')}
                {renderItemChange("Abraço de Seraph", ['Escudo de Salva-Vidas: 200 (+ 20% do Mana atual) ⇒ 18% do Mana máximo'], null, 'https://ddragon.leagueoflegends.com/cdn/14.10.1/img/item/3040.png')}
                {renderItemChange("Ápice da Tempestade", ['Custo total em ouro: 2.900 ⇒ 2.800', 'Velocidade de Movimento: 4% ⇒ 6%', 'Ouro se o alvo morrer antes: removido', 'Velocidade de Movimento de Dilúvio: removida'], null, 'https://ddragon.leagueoflegends.com/cdn/14.10.1/img/item/6657.png')}


                <Text style={styles.heading}>Runas</Text>
                {renderItemChange("Livro de Feitiços Deslacrado", ['Tempo de Recarga base do recarregamento: 5min ⇒ 4min', 'Tempo de Recarga do recarregamento com o máximo de trocas: 2,5min ⇒ 1,5min'], "Temos aqui uma runa que não tem aparecido muito no jogo já faz um tempinho. A parte divertida dela é usar vários Feitiços de Invocador, então trouxemos para teste uma versão com trocas mais frequentes.", 'https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/Inspiration/UnsealedSpellbook/UnsealedSpellbook.png')}

                <Text style={styles.heading}>Atualização do conteúdo da Loja Mítica</Text>
                <Text style={styles.paragraph}>Nesta atualização, trouxemos uma boa quantidade de ícones (um total de 457 itens que podem aparecer a cada dia!) que acompanhavam pacotes com cromas para a categoria diária da Loja Mítica. Eles ficarão disponíveis por 5 EM cada e devem dar aquela revitalizada nas ofertas diárias. Como sempre, ficaremos de olho na experiência envolvendo a Loja e continuaremos trazendo ajustes e novidades no futuro!</Text>

                <Text style={styles.heading}>Correções de bugs e mudanças de qualidade de vida</Text>
                <Text style={styles.subHeading}>Mudanças de qualidade de vida</Text>
                <Text style={styles.bulletPoint}>• Fizemos algumas mudanças nos bastidores para a lista de amigos e o saguão social, assim poderemos preparar as coisas para mais atualizações planejadas para o futuro. Isso pode resultar em alguns bugs, mas estamos de olho em qualquer ocorrência e vamos corrigi-los conforme forem encontrados.</Text>
                <Text style={styles.bulletPoint}>• O W da Irelia agora pausa a duração da Passiva em vez de esperar até os últimos 0,5s e congelar. Se o Tempo de Recarga estiver abaixo de 1s quando o W for conjurado, ele será ajustado para 1s depois de soltar o W. Também corrigimos um bug raro que fazia a habilidade não redefinir os acúmulos da Passiva ao causar dano a um inimigo.</Text>
                <Text style={styles.bulletPoint}>• A Cria Aracnídea do W da Elise (Forma Humana) agora buscará alvos logo depois de ser conjurada em vez de ir até o local da conjuração.</Text>
                <Text style={styles.bulletPoint}>• A interface de tela de morte de espectador agora pode ser movida, assim como o Relatório de Combate.</Text>
                <Text style={styles.subHeading}>Correções de bugs</Text>
                <Text style={styles.bulletPoint}>• Não é mais possível vender Retornos. Foi mal, mas os lojistas não têm a menor ideia do que fazer com eles (eles já moram na base!).</Text>
                <Text style={styles.bulletPoint}>• O Q do Mordekaiser não é mais conjurado na direção do mouse em vez de em frente a ele depois de usar Flash ou ser deslocado. Pensamos ter corrigido esse bug na 25.07, então esperamos que ele não volte mais!</Text>
                <Text style={styles.bulletPoint}>• Usar a opção "Reiniciar partida" no Modo de Treino depois que o Atakhan surge não faz mais o arbusto único no rio ficar sem funcionar.</Text>
                <Text style={styles.bulletPoint}>• No Modo de Treino, efeitos de tropas com base em vantagens de equipe (dano, resistências e Velocidade de Movimento) voltaram a ser redefinidos depois de usar a opção "Reiniciar partida".</Text>
                <Text style={styles.bulletPoint}>• Segurar várias teclas "F alguma coisa" ao mesmo tempo não fazem mais a câmera voltar pra seu Campeão em vez de aliados. Agora, a câmera permanecerá no aliado da primeira tecla que foi pressionada.</Text>
                <Text style={styles.bulletPoint}>• O Tempo de Recarga das dicas flutuantes das Passivas do Zac, Gangplank e Nocturne voltaram a funcionar corretamente.</Text>
                <Text style={styles.bulletPoint}>• Conseguir o efeito do Barão enquanto está com Solas Simbióticas equipadas não concede mais Retornos Fortalecidos infinitos.</Text>
                <Text style={styles.bulletPoint}>• O Arauto do Vale voltou a ganhar uma segunda investida depois de destruir um inibidor com a primeira.</Text>
                <Text style={styles.bulletPoint}>• Os efeitos visuais do E da Ashe (base e skins) não desaparecem mais se a visão do jogador não segue a habilidade.</Text>
                <Text style={styles.bulletPoint}>• O E da Elise não revela mais sentinelas se o Campeão atingido estiver próximo a uma.</Text>
                <Text style={styles.bulletPoint}>• A Passiva da Mel voltou a aplicar acúmulos no Mundo quando a Passiva dele está ativa.</Text>
                <Text style={styles.bulletPoint}>• Florividente voltou a revelar as Vastilarvas corretamente.</Text>
                <Text style={styles.bulletPoint}>• O Veigar Chefão Final não exibe mais o ouro de abate de tropas com o Q sobre a própria cabeça.</Text>
                <Text style={styles.bulletPoint}>• Sylas voltou a converter o R do Olaf em PdH ao conjurar Usurpar.</Text>
                <Text style={styles.bulletPoint}>• O efeito passivo do E do Nocturne voltou a ser acionado quando o Campeão se move na direção de um inimigo com Temor.</Text>
                <Text style={styles.bulletPoint}>• O dano contra monstros da selva dos Andarilhos da Névoa do Yorick voltou ao normal.</Text>
                <Text style={styles.bulletPoint}>• O dano do R+W da LeBlanc voltou ao normal ao ser conjurado rapidamente depois do W.</Text>
                <Text style={styles.bulletPoint}>• As habilidades do Hwei não são mais bloqueadas por tropas.</Text>
                <Text style={styles.bulletPoint}>• O Q do Mordekaiser voltou a ser conjurado na direção para qual ele está virado, não na direção do mouse.</Text>
                <Text style={styles.bulletPoint}>• A reconjuração do Q e conjuração do E da Aurora voltaram a acionar Foco do Horizonte corretamente.</Text>


                <Text style={styles.heading}>Atualizações de skins</Text>
                <Text style={styles.paragraph}>Normalmente não falamos do PBE nas Notas da Atualização, mas queríamos compartilhar que as antigas skins Baile da Rosa Negra de Elise, Vladimir, Samira e Renata Glasc aparecerão na 25.11. Quem já tiver adquirido essas skins não precisará fazer nada.</Text>
                <Text style={styles.paragraph}>Pausamos essas skins (que normalmente seriam lançadas no próximo período) para que pudéssemos fazer um ajuste fino em algumas coisas: uma mistura de atualizações de modelos, texturas e efeitos visuais dignos da Rosa Negra. Falaremos das skins aqui quando elas forem lançadas na próxima atualização.</Text>

                <Text style={styles.heading}>Cromas e skins futuros</Text>
                <Text style={styles.paragraph}>As skins abaixo serão lançadas nesta atualização:</Text>
                {renderSkin("Vex Astromante", 'https://cmsassets.rgpub.io/sanity/images/dsfx7636/news_live/ae2404d96f9091436426a4478c7049a8484fb6b6-1920x1080.jpg')}
                {renderSkin("Yorick Velho Oeste", 'https://cmsassets.rgpub.io/sanity/images/dsfx7636/news_live/04041796073e93839a3d3428ded167ad8dd68c06-1920x1080.jpg')}
                {renderSkin("Ryze Lua Sangrenta", 'https://cmsassets.rgpub.io/sanity/images/dsfx7636/news_live/d6ec8dc9ac1154af61863078dd38afb8e523fd95-1920x1080.jpg')}

                <Text style={styles.paragraph}>Os cromas abaixo serão lançados nesta atualização:</Text>
                {renderSkin("Vex Astromante", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news_live/a78fe83ac317bbbf6300ff734ca8ce6a557f4df0-1610x590.jpg", ["Rubi", "Safira", "Esmeralda"])}
                {renderSkin("Yorick Velho Oeste", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news_live/6c7fc4bff72e439d7f5cf2fe9db1790f0b20ccbe-1610x590.jpg", ["Obsidiana", "Pérola"])}
                {renderSkin("Ryze Lua Sangrenta", "https://cmsassets.rgpub.io/sanity/images/dsfx7636/news_live/3202495ea98ac61044d2eb9996400fc78f18e24d-1610x590.jpg", ["Citrino"])}


                {/* --- Botão Voltar --- */}
                <View style={styles.buttonContainer}>
                   <Button title="Voltar" onPress={() => navigation.goBack()} color="#00d9ff" />
                </View>

            </ScrollView>
        </View>
    );
}

// --- ESTILOS ---
const styles = StyleSheet.create({
    imageBeforeText: {
        width: '100%',
        height: 200, // Ajuste a altura conforme necessário
        marginBottom: 20,
        borderRadius: 30, // Opcional: para bordas arredondadas
    },
    container: {
        flex: 1,
        backgroundColor: '#18181C',
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    title: {
        fontSize: 24, fontWeight: 'bold', color: '#fff', marginBottom: 5, textAlign: 'center',
    },
    subtitle: {
        fontSize: 18, color: '#ccc', marginBottom: 15, textAlign: 'center',
    },
    meta: {
        fontSize: 12, color: '#888', marginBottom: 20, textAlign: 'center',
    },
    heading: {
        fontSize: 20, fontWeight: 'bold', color: '#00d9ff', marginTop: 25, marginBottom: 15,
        borderBottomWidth: 1, borderBottomColor: '#00d9ff', paddingBottom: 5,
    },
    subHeading: {
        fontSize: 16, fontWeight: 'bold', color: '#eee', marginTop: 15, marginBottom: 10,
    },
    paragraph: {
        fontSize: 15, color: '#ddd', marginBottom: 15, lineHeight: 22,
    },
    paragraphItalic: {
        fontSize: 15, color: '#bbb', marginBottom: 10, lineHeight: 22, fontStyle: 'italic',
    },
    signature: {
        fontSize: 15, color: '#ddd', marginBottom: 15, lineHeight: 22, fontStyle: 'italic', textAlign: 'right',
    },
    bulletPoint: {
        fontSize: 15, color: '#ddd', marginBottom: 8, marginLeft: 10, lineHeight: 22,
    },
    bold: {
        fontWeight: 'bold', color: '#fff',
    },
    link: {
        color: '#61dafb', textDecorationLine: 'underline',
    },
    sectionBlock: {
        backgroundColor: '#2B2B33', padding: 15, borderRadius: 10,
        marginBottom: 15, borderLeftWidth: 3, borderLeftColor: '#00d9ff',
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    sectionImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 15,
        borderWidth: 1,
        borderColor: '#00d9ff',
    },
    sectionName: {
        fontSize: 17, fontWeight: 'bold', color: '#fff', flex: 1,
    },
    changeItem: {
        marginLeft: 10, marginBottom: 8,
    },
    abilityName: {
        fontWeight: 'bold', color: '#ccc',
    },
    abilityDesc: {
        color: '#bbb', marginLeft: 5, lineHeight: 20,
    },
    skinBlock: {
        marginBottom: 20,
        backgroundColor: '#2B2B33',
        borderRadius: 10,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#444',
    },
    skinImage: {
        width: '100%',
        height: 180,
        marginBottom: 10,
    },
    skinName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        paddingHorizontal: 15,
        marginBottom: 5,
    },
    chromaContainer:{
        paddingHorizontal: 15,
        paddingBottom: 15,
    },
    chromaTitle:{
        color: '#ccc',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    chromaItem:{
        color: '#bbb',
        marginLeft: 10,
    },
    buttonContainer: {
        
        marginTop: 30,
        marginBottom:50
    }
});