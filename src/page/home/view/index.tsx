import { useState } from 'react';
import ScreenLayout from '@/components/scheenLayout';
import CustomSelect, { ItemsSelectProps } from '@/components/customselect';
import CustomInput from '@/components/custominput';
import { OperacaoEnum } from '@enums/operacaoenum';
import { SelectTableEnum } from '@enums/selecttableenum';
import GridContainer from '@/components/gridcontainer';
import GridItem from '@/components/griditem';
import FormDespesas from './formdespesas';
import DashboardHeader from './dashboardheader';

function HomeScreen() {
    const [selectedValue, setSelectedValue] = useState<ItemsSelectProps>({ label: 'Despesas', value: OperacaoEnum.RECEITA });
    const [selectedValueTable, setSelectedValueTable] = useState<ItemsSelectProps>({ label: '', value: '' });
    const [selectedValueTableFixa, setSelectedValueTableFixa] = useState<ItemsSelectProps>({ label: '', value: '' });
    const [isSwitchOn, setIsSwitchOn] = useState(false);

    const pickerItems: ItemsSelectProps[] = [
        { label: 'Despesas', value: OperacaoEnum.DESPESA },
        { label: 'Receita', value: OperacaoEnum.RECEITA }
    ];

    const tabela: ItemsSelectProps[] = [
        { label: 'Fixa', value: SelectTableEnum.CONTA_FIXA },
        { label: 'Variável', value: SelectTableEnum.CONTA_VARIAVEL }
    ];

    const tabelaFixa: ItemsSelectProps[] = [
        { label: 'Empréstimo', value: SelectTableEnum.CONTA_FIXA },
        { label: 'Cartão de Crédito', value: SelectTableEnum.CONTA_VARIAVEL }
    ];

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

    return (
        <ScreenLayout
            styleHeader={{ padding: '20px', height: '185px' }}
            buttonTitle='Salvar'
            onClickButton={() => { }}
            childrenTitle={
                <DashboardHeader
                    despesas='4.544,88'
                    receita='8.255,25'
                    saldo='3.710,37'
                    title='Bem-Vindo(a) de Volta'
                />
            }
        >
            <GridContainer style={{ height: '26rem', display: 'block' }}>
                <GridItem>
                    <CustomSelect
                        selectedValue={selectedValue}
                        onValueChange={setSelectedValue}
                        items={pickerItems}
                    />
                </GridItem>
                {selectedValue.value === OperacaoEnum.DESPESA ? (
                    <FormDespesas
                        selectedValueTable={selectedValueTable}
                        setSelectedValueTable={setSelectedValueTable}
                        selectedValueTableFixa={selectedValueTableFixa}
                        setSelectedValueTableFixa={setSelectedValueTableFixa}
                        tabela={tabela}
                        tabelaFixa={tabelaFixa}
                        isSwitchOn={isSwitchOn}
                        onToggleSwitch={onToggleSwitch}
                    />
                ) : (
                    <>
                        <GridItem>
                            <CustomSelect
                                onValueChange={setSelectedValueTableFixa}
                                selectedValue={selectedValueTableFixa}
                                items={tabelaFixa}
                            />
                        </GridItem>
                        <GridItem>
                            <CustomInput
                                label='Data Recebido'
                                onChange={() => { }}
                                value="03/08/2024"
                                keyboardType='number-pad'
                            />
                        </GridItem>
                        <GridItem>
                            <CustomInput
                                label='Valor Pago'
                                onChange={() => { }}
                                value='R$ 4.200,00'
                                keyboardType='number-pad'
                            />
                        </GridItem>
                    </>

                )}
            </GridContainer>
        </ScreenLayout>
    );
}

export default HomeScreen;
