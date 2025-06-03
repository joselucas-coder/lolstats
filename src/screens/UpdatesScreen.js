import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Linking, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const openLink = (url) => {
    Linking.openURL(url).catch(err => console.error("Não foi possível abrir o link", err));
};
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
export default function UpdatesScreen() {
    const navigation = useNavigation();
    const patchVersion = "14.10.1";
    const imageUrlBeforeText = 'https://preview.redd.it/spirit-blossom-irelia-splash-art-v0-vyi36bf6bzue1.jpeg?width=1080&crop=smart&auto=webp&s=7354b31b966ee1171746e46ba0a09c7b56babc24';


    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>

                <Text style={styles.title}>Notas da Atualização 25.10</Text>
                <Text style={styles.subtitle}>A Atualização 25.10 está escrita nas estrelas✨</Text>
                <Text style={styles.meta}>Atualizações do jogo | Riot Sakaar | 13/05/2025</Text>

            {imageUrlBeforeText && <Image source={{ uri: imageUrlBeforeText }} style={styles.imageBeforeText}  />}

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

                <View style={styles.buttonContainer}>
                    
                </View>

            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    imageBeforeText: {
        width: '100%',
        height: 200,
        marginBottom: 20,
        borderRadius: 30,
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
        marginBottom:35
    }
});