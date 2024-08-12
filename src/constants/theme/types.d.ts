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
            darkGreen: string
        },
        fontsDefault: {
            primaryFont: string,
            secondaryFont: string
        }
    }
}