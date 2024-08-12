// FormFields.tsx
import React from 'react';
import { Typography, Switch as MUIButtonSwitch } from '@mui/material';
import { SelectTableEnum } from '@enums/selecttableenum';
import GridItem from '@/components/griditem';
import CustomInput from '@/components/custominput';
import CustomSelect, { ItemsSelectProps } from '@/components/customselect';

import {
    SwitchContainer,
} from '@/page/home/style';

interface FormContentProps {
    selectedValueTable: ItemsSelectProps;
    setSelectedValueTable: (value: ItemsSelectProps) => void;
    selectedValueTableFixa: ItemsSelectProps;
    setSelectedValueTableFixa: (value: ItemsSelectProps) => void;
    tabela: ItemsSelectProps[];
    tabelaFixa: ItemsSelectProps[];
    isSwitchOn: boolean;
    onToggleSwitch: () => void;
}

const FormDespesas: React.FC<FormContentProps> = ({
    selectedValueTable,
    setSelectedValueTable,
    selectedValueTableFixa,
    setSelectedValueTableFixa,
    tabela,
    tabelaFixa,
    isSwitchOn,
    onToggleSwitch,
}) => {
    return (
        <>
            <GridItem paddingTopMuiGrid='15px'>
                <CustomSelect
                    onValueChange={setSelectedValueTable}
                    selectedValue={selectedValueTable}
                    items={tabela}
                />
            </GridItem>
            {selectedValueTable.value === SelectTableEnum.CONTA_VARIAVEL ? (
                <>
                    <GridItem>
                        <CustomInput
                            label='Descrição'
                            onChange={() => { }}
                            value='IqFome'
                        />
                    </GridItem>
                    <GridItem>
                        <CustomInput
                            label='Data'
                            onChange={() => { }}
                            value="02/08/2024"
                            keyboardType='number-pad'
                        />
                    </GridItem>
                    <GridItem>
                        <CustomInput
                            label='Valor Pago'
                            onChange={() => { }}
                            value='R$ 89,90'
                            keyboardType='number-pad'
                        />
                    </GridItem>
                </>
            ) : (
                <>
                    <GridItem paddingTopMuiGrid='15px'>
                        <CustomSelect
                            onValueChange={setSelectedValueTableFixa}
                            selectedValue={selectedValueTableFixa}
                            items={tabelaFixa}
                        />
                    </GridItem>
                    <GridItem paddingTopMuiGrid='15px'>
                        <CustomInput
                            label='Data Vencimento'
                            onChange={() => { }}
                            value="03/08/2024"
                            keyboardType='number-pad'
                        />
                    </GridItem>
                    <GridItem paddingTopMuiGrid='15px'>
                        <CustomInput
                            label='Data Pagamento'
                            onChange={() => { }}
                            value="03/08/2024"
                            keyboardType='number-pad'
                        />
                    </GridItem>
                    <GridItem paddingTopMuiGrid='15px'>
                        <CustomInput
                            label='Valor Pago'
                            onChange={() => { }}
                            value='R$ 89,90'
                            keyboardType='number-pad'
                        />
                    </GridItem>
                    <GridItem paddingTopMuiGrid='15px'>
                        <SwitchContainer>
                            <Typography variant="body1">Foi Pago?</Typography>
                            <MUIButtonSwitch checked={isSwitchOn} onChange={onToggleSwitch} />
                        </SwitchContainer>
                    </GridItem>
                </>
            )}
        </>
    );
};

export default FormDespesas;
