import { IncomeTypeEnum } from "@/constants/enums/incomeTypeEnum";
import { Dayjs } from "dayjs";


export interface FormIncomeModel {
    dtIncome: string | Dayjs;
    vlIncome: string | number | null
    stIncome: IncomeTypeEnum | null;
}