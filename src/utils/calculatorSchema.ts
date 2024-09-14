import * as Yup from 'yup';

export const calculatorSchema = Yup.object().shape({
  depositAmount: Yup.number()
    .integer('Deposit amount must be an integer')
    .min(1, 'Deposit amount must be greater than 0')
    .max(1500000, 'Deposit amount cannot exceed $1.5 million')
    .required('Deposit amount is required'),

  interestRate: Yup.number()
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