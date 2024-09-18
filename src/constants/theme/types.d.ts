import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        paletteColor: {
            /**
             * Cor Principal Verde Forte #008f11
             */
            primaryGreen: string,
            /**
             * Cor Verde Claro Principal #00D09E
             */
            secundGreen: string,
            /**
             * Cor verde claro usada como background #DFF7E2
             */
            lightGreen: string,
            /**
             * Cor verde escuro usada para textos #093030
             */
            darkGreen: string,
            /**
             * Cor de erro, usada para alertas e mensagens de erro #c72020
             */
            error: string,
            /**
             * Cor de aviso, usada para alertas e mensagens de aviso #FFC107
             */
            warning: string,
            /**
             * Cor de sucesso, usada para mensagens de sucesso #4CAF50
             */
            success: string,
            /**
             * Cor neutra para backgrounds e bordas #F5F5F5
             */
            neutral: string,
            /**
             * Cor Azul usada para informações #0068FF
             */
            info: string,
        },
        fontsDefault: {
            primaryFont: string,
            secondaryFont: string,
            /**
             * Tamanho padrão do texto
             */
            fontSize: string,
            /**
             * Peso padrão do texto
             */
            fontWeight: string,
        }
    }
}