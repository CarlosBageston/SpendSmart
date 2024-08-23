import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
    paletteColor: {
        primaryGreen: '#008f11',        // Cor verde principal
        secundGreen: '#00D09E',         // Cor Verde Claro Principal
        lightGreen: '#DFF7E2',          // Cor verde claro usada como background
        darkGreen: '#093030',           // Cor verde escuro usada para textos
        error: '#c72020',               // Cor vermelha para erros
        warning: '#FFC107',             // Cor amarela para avisos
        success: '#4CAF50',             // Cor verde para sucesso
        neutral: '#F5F5F5',             // Cor neutra para backgrounds e bordas
    },
    fontsDefault: {
        primaryFont: "'Baloo 2', Arial, sans-serif",
        secondaryFont: "'Lobster', cursive, Arial, sans-serif",
        fontSize: '16px',               // Tamanho padrão do texto
        fontWeight: '400',              // Peso padrão do texto
    }
};