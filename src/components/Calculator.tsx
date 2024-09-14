import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { CalculatorData, calculatorSchema } from "../utils/calculatorSchema";
import { convertMonthsToYears } from "../utils/utility";


const defaultValues: CalculatorData = {
    depositAmount: 10000,       // Default deposit amount
    interestRate: 5,            // Default interest rate
    investmentTerm: 12,         // Default investment term (in months)
    interestPaid: 'MATURITY',   // Default interest paid option
}

export const Calculator = () => {
    const { register, watch, formState: { errors } } = useForm({
        resolver: yupResolver(calculatorSchema),
        mode: 'onBlur',
        defaultValues,
    });
    const investmentTerm = watch('investmentTerm');

    return (
        <section className="calculator-container">
            <div className="calculator">
                <div className="form-container">
                    <form>
                        <p className="form-section">
                            <label htmlFor="deposit">Deposit Amount</label>
                            <p className="deposit-input-wrapper">
                                <span>$</span><input {...register("depositAmount")} type="number" id="deposit" className="deposit-input" />
                            </p>

                            <p className="errors">{errors.depositAmount?.message}</p>
                        </p>
                        <p className="form-section">
                            <label htmlFor="rate">Intereset Rate</label>
                            <input {...register("interestRate")} type="number" id="rate" className="rate-input" />
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
                            <button type="button">Calculate</button>
                        </p>
                    </form>
                </div>
                <div className="result-container">
                    <div className="result">
                        <p className="label">Final Balance</p>
                        <p className="value">$ 0</p>
                    </div>
                    <div className="result">
                        <p className="label">Total interest earned</p>
                        <p className="value">$ 0</p>
                    </div>
                </div>
            </div>
        </section>
    )
}