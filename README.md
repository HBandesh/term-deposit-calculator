# Term Deposit Calculator
This is a simple Term Deposit Calculator built using React, react-hook-form, and Yup for form handling and validation. The calculator allows users to input details such as the deposit amount, interest rate, investment term, and interest payment frequency to compute the final balance.

## Features
- Input validation for deposit amount, interest rate, investment term, and interest payment frequency.
- Validation for decimal precision on the interest rate.
- Error handling to ensure smooth user experience and accurate results.

## Tech Stack
- **React**: For building the UI.
- **react-hook-form**: For managing form state and handling form validation.
- **Yup**: For schema-based validation of form inputs.
- **Jest**: For writing and running unit tests.

## Installation and Setup
1. Clone the repository:

```js
git clone https://github.com/your-repo/term-deposit-calculator.git
cd term-deposit-calculator
```
2. Install dependencies:

```js
pnpm install
```

3. Start the development server

```js
pnpm run dev
```

The app will be available at http://localhost:5173/



## Running the Tests
To run the test suite:

```js
pnpm run test
```
This command will run all unit tests using Jest. Make sure to check the test results to confirm that the form validation and balance calculations work as expected.


## Technical Decisions
1. **Form Handling with react-hook-form**
I chose react-hook-form for its efficient form handling and minimal re-renders. It integrates seamlessly with React and offers excellent performance, which is crucial for user experience in form-heavy applications.

2. **Validation with Yup**
I implemented schema-based validation using Yup to ensure that all form inputs are properly validated before performing any calculations.

3. **Separation of Concerns**
I structured the application to clearly separate concerns:
- Form validation is handled by Yup.
- Form management is handled by react-hook-form.
- Balance calculation logic is separate from form validation to keep each responsibility focused and testable.

4. **Testing Strategy**
I wrote unit tests using Jest to ensure the accuracy of both validation and balance calculation logic. The tests cover edge cases for deposit amounts, interest rates, and other input values, ensuring that errors are caught and handled gracefully.