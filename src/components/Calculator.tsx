/**
 * @module Calculator.tsx This component contains the form which user fills to calculate the final balance of the term deposit
 * and it shows the final balance as well.
 */

import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { CalculatorData, calculatorSchema } from "../utils/calculatorSchema";
import { calculateBalance, convertMonthsToYears } from "../utils/utility";
import { useEffect, useState } from "react";


const defaultValues: CalculatorData = {
    depositAmount: 10000,       // Default deposit amount
    interestRate: 1.1,            // Default interest rate
    investmentTerm: 36,         // Default investment term (in months)
    interestPaid: 'MATURITY',   // Default interest paid option
}

export const Calculator = () => {
    const [balance, setBalance] = useState(0);
    const [interestEarned, setInterestEarned] = useState(0);
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(calculatorSchema),
        mode: 'onBlur',
        defaultValues,
    });
    const depositAmount = watch('depositAmount');
    const investmentTerm = watch('investmentTerm');

    useEffect(() => {
        const balance = calculateBalance(defaultValues);
        setBalance(balance);
        setInterestEarned(balance - depositAmount);
    }, []);

    /**
     * @function formCallBack This function calculates the final balance updates the react state
     * @param data {CalculatorData} The data input by the user in the term deposit form
     * @return Void
     */
    const formCallBack = (data: CalculatorData) => {
        const balance = calculateBalance(data);
        setBalance(balance);
        setInterestEarned(balance - depositAmount);
    }


    return (
        <section className="calculator-container">
            <div className="calculator">
                <div className="form-container">
                    <form onSubmit={handleSubmit(formCallBack)}>
                        <p className="form-section">
                            <label htmlFor="deposit">Deposit Amount</label>
                            <p className="deposit-input-wrapper">
                                <span>$</span><input {...register("depositAmount")} type="number" id="deposit" className="deposit-input" min="0" />
                            </p>

                            <p className="errors">{errors.depositAmount?.message}</p>
                        </p>
                        <p className="form-section">
                            <label htmlFor="rate">Intereset Rate</label>
                            <input {...register("interestRate")} type="number" id="rate" className="rate-input" step=".01" min="0" />
                            <p className="errors">{errors.interestRate?.message}</p>
                        </p>
                        <p className="form-section">
                            <label htmlFor="term">Investment Term</label>
                            <p className="term-value">{convertMonthsToYears(investmentTerm)}</p>
                            <input {...register("investmentTerm")} type="range" id="term" min="3" max="60" className="slider" />
                            <p className="errors">{errors.investmentTerm?.message}</p>
                        </p>
                        <p className="form-section">
                            <label htmlFor="frequency">Investment Paid</label>
                            <select {...register('interestPaid')} id="frequency" className="frequency">
                                <option value="MONTHLY">Monthly</option>
                                <option value="QUATERLY">Quarterly</option>
                                <option value="ANNUALY">Annually</option>
                                <option value="MATURITY">At Maturity</option>
                                <p className="errors">{errors.interestPaid?.message}</p>
                            </select>
                        </p>
                        <p className="form-section">
                            <button type="submit">Calculate</button>
                        </p>
                    </form>
                </div>
                <div className="result-container">
                    <div className="result">
                        <p className="label">Final Balance</p>
                        <p className="value">$ {balance}</p>
                    </div>
                    <div className="result">
                        <p className="label">Total interest earned</p>
                        <p className="value">$ {interestEarned}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}