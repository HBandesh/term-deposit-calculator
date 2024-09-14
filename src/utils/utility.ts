import { CalculatorData } from "./calculatorSchema";

export const convertMonthsToYears = (months: number) => {
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

export const calculateBalance = (data: CalculatorData) => {

}