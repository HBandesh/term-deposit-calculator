import * as Yup from 'yup';
import { CalculatorData, calculatorSchema } from "./calculatorSchema";

/**
 * @function convertMonthsToYears This function converts a number of months 
 * into a formatted string that represents the equivalent years and remaining months
 * @param months {number} The number of months input by the user
 * @returns {string} formatted string that represents the equivalent years and remaining months
 */
export const convertMonthsToYears = (months: number): string  => {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    let result = '';

    if (years > 0) {
        result += `${years} year${years > 1 ? 's' : ''}`;
    }

    if (remainingMonths > 0) {
        if (years > 0) result += ' ';
        result += `${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`;
    }

    if (years === 0 && remainingMonths === 0) {
        result = '0 months';
    }

    return result;
}


/**
 * @function calculateBalance This function calculates the compound interest on the term deposit
 * @param data {CalculatorData} deposit amount, interest rate, investment term and the interest paid prequency input by the user
 * @returns {number} The final balance of the term deposit
 */
export const calculateBalance = (data: CalculatorData): number => {
    try {
        //Validating the schema before performaning calculations
        const validatedData = calculatorSchema.validateSync(data);
        const { depositAmount, interestRate, investmentTerm, interestPaid } = validatedData;
        const termInYears = investmentTerm / 12;
        const rate = interestRate / 100;
        let finalBalance = depositAmount;

        // Calculate the compound interest based on the payment frequency
        // Using the formula for compound interest as:
        // A=P(1+ r/n)^(n*t)
        // Where:
        // A= final amount
        // P = principal amount (deposit)
        // r = annual interest rate (as a decimal)
        // n = number of times the interest is compounded per year
        // t = time the money is invested or borrowed (in years)
        switch (interestPaid) {
        case 'MONTHLY':
            finalBalance = depositAmount * Math.pow((1 + rate / 12), 12 * termInYears);
            break;
        case 'QUATERLY':
            finalBalance = depositAmount * Math.pow((1 + rate / 4), 4 * termInYears);
            break;
        case 'ANNUALY':
            finalBalance = depositAmount * Math.pow((1 + rate), termInYears);
            break;
        case 'MATURITY':
            finalBalance = depositAmount * (1 + rate * termInYears);
            break;
        default:
            break;
        }

        return Math.round(finalBalance);
    } catch (error) {
        if (error instanceof Yup.ValidationError) {
            throw new Error(`Validation failed: ${error.errors.join(', ')}`);
          }
        throw new Error('An unexpected error occurred');
    }
    
}