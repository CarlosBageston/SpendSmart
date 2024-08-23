/**
 * Hook personalizado para formatação e conversão de valores monetários em reais (BRL).
 *
 * @returns Objeto contendo funções para formatação e conversão de valores monetários.
 */
export default function useFormatCurrency() {
    /**
     * Formata um número como moeda brasileira (BRL).
     *
     * @param value - O valor a ser formatado.
     * @returns O valor formatado como moeda brasileira (R$).
     */
    function formatNumber(value: number): string {
        return Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
    }

    /**
     * Formata um valor monetário em tempo real.
     *
     * @param valor - O valor a ser formatado. Pode conter caracteres não numéricos.
     * @returns Uma string formatada como moeda brasileira (R$), em tempo real.
     */
    function formatCurrencyRealTime(valor: string): string {
        // Remove caracteres não numéricos
        const inputText = valor.replace(/\D/g, '');
        const numericValue = parseFloat(inputText) / 100;
        return formatNumber(numericValue);
    }

    /**
     * Converte uma string para um número de ponto flutuante.
     *
     * @param valor - A string contendo o valor a ser convertido.
     * @returns O valor convertido para número de ponto flutuante.
     */
    function convertToNumber(valor: string): number {
        const cleanedValue = valor.replace(/[^0-9,.]/g, '').replace(/[.]/g, '');

        // Converte a string de números para um número de ponto flutuante
        return parseFloat(cleanedValue.replace(',', '.')) || 0;
    }

    return {
        formatNumber,
        convertToNumber,
        formatCurrencyRealTime
    };
}
