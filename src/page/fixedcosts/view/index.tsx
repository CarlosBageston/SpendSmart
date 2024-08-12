import CustomButton from "@/components/custombutton";
import CustomInput from "@/components/custominput";
import ExpenseCard, { Expense } from "@/components/expensecard";
import GridContainer from "@/components/gridcontainer";
import GridItem from "@/components/griditem";
import ScreenLayout from "@/components/scheenLayout";
import { useState } from "react";
import { DivExpendCard } from "@/page/fixedcosts/style";


function FixedCosts() {

    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [amount, setAmount] = useState('');
    const [expenses, setExpenses] = useState<Expense[]>([]);

    const addExpense = () => {
        const newExpense: Expense = { description, dueDate, amount };
        setExpenses([...expenses, newExpense]);
        setDescription('');
        setDueDate('');
        setAmount('');
    };
    return (
        <>
            <ScreenLayout title='Tabela Despesas Mensais Fixas' buttonHref={'/home'} buttonTitle='Cadastrar'>
                <GridContainer >
                    <GridItem >
                        <CustomInput
                            label='Descrição'
                            onChange={(e) => { setDescription(e.target.value) }}
                            value={description}
                        />
                    </GridItem >
                    <GridItem >
                        <CustomInput
                            label='Data Vencimento'
                            onChange={(e) => { setDueDate(e.target.value) }}
                            value={dueDate}
                            keyboardType='number-pad'
                        />
                    </GridItem >
                    <GridItem >
                        <CustomInput
                            label='Valor a Pagar'
                            onChange={(e) => { setAmount(e.target.value) }}
                            value={amount}
                            keyboardType='number-pad'
                        />
                    </GridItem >
                    <GridItem >
                        <CustomButton
                            colorBackground='#6DB6FE'
                            colorLabel='#f1f1f1'
                            type='Button'
                            onClick={addExpense}
                            title='Adicionar'
                        />
                    </GridItem >
                    <DivExpendCard>
                        <GridItem direction="column" marginLeft={'24px'}>
                            {expenses.map((expense, index) => (
                                <ExpenseCard key={index} expense={expense} />
                            ))}
                        </GridItem>
                    </DivExpendCard>
                </GridContainer>
            </ScreenLayout>
        </>
    )
}
export default FixedCosts