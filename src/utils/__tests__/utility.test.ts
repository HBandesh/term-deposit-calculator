import { CalculatorData, InterestPaid } from "../calculatorSchema";
import { convertMonthsToYears, calculateBalance } from "../utility";

describe('convertMonthsToYears', () => {
    it('should return the correct string if months < 12', () => {
      expect(convertMonthsToYears(3)).toBe("3 months");
      expect(convertMonthsToYears(1)).toBe("1 month");
    });
    it('should return the correct string if months = 12', () => {
        expect(convertMonthsToYears(12)).toBe("1 year");
    });
    it('should return the correct string if months > 12', () => {
        expect(convertMonthsToYears(13)).toBe("1 year 1 month");
        expect(convertMonthsToYears(14)).toBe("1 year 2 months");
        expect(convertMonthsToYears(24)).toBe("2 years");
        expect(convertMonthsToYears(25)).toBe("2 years 1 month");
        expect(convertMonthsToYears(26)).toBe("2 years 2 months");
    });
  })

  describe('calculateBalance', () => {
    it('throws correct error if deposit amount is incorrect', () => {
        const data: CalculatorData = {
            depositAmount: 0,
            interestRate: 1.1,
            investmentTerm: 36,
            interestPaid: 'MATURITY',
        }
        expect(() => calculateBalance(data)).toThrow("Validation failed: Deposit amount must be greater than 1000");
        expect(() => calculateBalance({...data, depositAmount: "abc" as unknown as number})).toThrow("Validation failed: Deposit amount must be a valid number");
        expect(() => calculateBalance({...data, depositAmount: "" as unknown as number})).toThrow("Validation failed: Deposit amount must be greater than 1000");
        expect(() => calculateBalance({...data, depositAmount: 300000000})).toThrow("Validation failed: Deposit amount must be less than or equal to 1.5 million");
        expect(() => calculateBalance({...data, depositAmount: 10000.234})).toThrow("Validation failed: Deposit amount must be a whole number");
        expect(() => calculateBalance({...data, depositAmount: null as unknown as number})).toThrow("Validation failed: Deposit amount is required");
      });

      it('throws correct error if interest rate is incorrect', () => {
        const data: CalculatorData = {
            depositAmount: 10000,
            interestRate: 0,
            investmentTerm: 36,
            interestPaid: 'MATURITY',
        }
        expect(() => calculateBalance(data)).toThrow("Validation failed: Interest rate must be at least 1%");
        expect(() => calculateBalance({...data, interestRate: "abc" as unknown as number})).toThrow("Validation failed: Interest Rate must be a valid number");
        expect(() => calculateBalance({...data, interestRate: "" as unknown as number})).toThrow("Validation failed: Interest rate must be at least 1%");
        expect(() => calculateBalance({...data, interestRate: 20})).toThrow("Validation failed: Interest rate cannot exceed 15%");
        expect(() => calculateBalance({...data, interestRate: 2.3456})).toThrow("Validation failed: Interest rate must be up to 2 decimal places");
        expect(() => calculateBalance({...data, interestRate: null as unknown as number})).toThrow("Validation failed: Interest rate is required");
      });

      it('throws correct error if investment term is incorrect', () => {
        const data: CalculatorData = {
            depositAmount: 10000,
            interestRate: 1.1,
            investmentTerm: 0,
            interestPaid: 'MATURITY',
        }
        expect(() => calculateBalance(data)).toThrow("Validation failed: Investment term must be at least 3 months");
        expect(() => calculateBalance({...data, investmentTerm: "abc" as unknown as number})).toThrow("Validation failed: Investment term must be a valid number");
        expect(() => calculateBalance({...data, investmentTerm: "" as unknown as number})).toThrow("Validation failed: Investment term must be at least 3 months");
        expect(() => calculateBalance({...data, investmentTerm: 100})).toThrow("Validation failed: Investment term cannot exceed 60 months (5 years)");
        expect(() => calculateBalance({...data, investmentTerm: null as unknown as number})).toThrow("Validation failed: Investment term is required");
      });

      it('throws correct error if investment Paid is incorrect', () => {
        const data: CalculatorData = {
            depositAmount: 10000,
            interestRate: 1.1,
            investmentTerm: 12,
            interestPaid: '' as InterestPaid,
        }
        expect(() => calculateBalance(data)).toThrow("Validation failed: Invalid interest paid option");
        expect(() => calculateBalance({...data, interestPaid: null as unknown as InterestPaid})).toThrow("Validation failed: Interest paid option is required");
      });

      it('returns the correct balance', () => {
        const dataOne: CalculatorData = {
            depositAmount: 10000,
            interestRate: 1.1,
            investmentTerm: 36,
            interestPaid: 'MATURITY',
        }
        expect(calculateBalance(dataOne)).toBe(10330);

        const dataTwo: CalculatorData = {
            depositAmount: 13489,
            interestRate: 3.67,
            investmentTerm: 14,
            interestPaid: 'QUATERLY',
        }
        expect(calculateBalance(dataTwo)).toBe(14076);

        const dataThree: CalculatorData = {
            depositAmount: 1500000,
            interestRate: 15,
            investmentTerm: 60,
            interestPaid: 'MATURITY',
        }
        expect(calculateBalance(dataThree)).toBe(2625000);

        const dataFour: CalculatorData = {
            depositAmount: 1000,
            interestRate: 1,
            investmentTerm: 3,
            interestPaid: 'MONTHLY',
        }
        expect(calculateBalance(dataFour)).toBe(1003);
      });
  })