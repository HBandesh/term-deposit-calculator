import * as Yup from 'yup';

// This is the schema for the fields that are used to calculate the final balance of the term deposit
export const calculatorSchema = Yup.object().shape({
  depositAmount: Yup.number()
    .transform((value, originalValue) => originalValue === '' ? 0 : value) // Convert empty string to 0
    .typeError('Deposit amount must be a valid number') // Handle non-number inputs
    .min(1, 'Deposit amount must be greater than 0')
    .max(1500000, 'Deposit amount must be less than or equal to 1.5 million')
    .integer('Deposit amount must be a whole number')
    .required('Deposit amount is required'),

  interestRate: Yup.number()
    .transform((value, originalValue) => originalValue === '' ? 0 : value) // Convert empty string to 0
    .typeError('Deposit amount must be a valid number') // Handle non-number inputs
    .min(1, 'Interest rate must be at least 1%')
    .max(15, 'Interest rate cannot exceed 15%')
    .required('Interest rate is required'),

  investmentTerm: Yup.number()
    .integer('Investment term must be in months')
    .min(3, 'Investment term must be at least 3 months')
    .max(60, 'Investment term cannot exceed 60 months (5 years)')
    .required('Investment term is required'),

  interestPaid: Yup.string()
    .oneOf(['MONTHLY', 'QUATERLY', 'ANNUALY', 'MATURITY'], 'Invalid interest paid option')
    .required('Interest paid option is required'),
});

export type CalculatorData = Yup.InferType<typeof calculatorSchema>;