import { OperationPaymentsEnum } from "@enums/operationPaymentsEnum";
import { Dayjs } from "dayjs";



export interface FormPaymentsModel {
    dtPayments: string | Dayjs
    vlPayments: string | number | null
    operationPayments: OperationPaymentsEnum
    dsPayments: string
}