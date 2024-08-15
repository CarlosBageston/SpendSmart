import { SituacaoRegistroEnum } from "@enums/situacaoregistroenum";

/**
 * Modelo da Tela de Fixed Costs
 * @author Carlos Bageston
 */

export interface FixedCostsModel {
    id?: string;
    dsFixedCosts: string;
    dayVencimento: string;
    dtVigencia: string;
    dtIndefinida: boolean;
    stRegistro?: SituacaoRegistroEnum
}