"use client"
import React, { useEffect, useState } from 'react';
import './FullPageROICalculator.css';

const FullPageROICalculator = ({ property }) => {
  // Initialize inputValues with property.price for purchasePrice
  const [inputValues, setInputValues] = useState({
    downPaymentPercent: '',
    closingCost: '',
    interestRate: '',
    loanTerm: '',
    monthlyRent: '',
    otherIncome: '',
    propertyTax: '',
    insurance: '',
    purchasePrice: property?.price?.toString() || '', // Use property.price as initial value
  });

  const [errors, setErrors] = useState({});
  const [results, setResults] = useState({});

  useEffect(() => {
    setInputValues(values => ({
      ...values,
      purchasePrice: property?.price?.toString() || ''
    }));
  }, [property]);
  

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    if (!value || isNaN(value) || parseFloat(value) < 0) {
      setErrors({ ...errors, [name]: 'Please enter a valid non-negative number.' });
    } else {
      let newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
      setInputValues({ ...inputValues, [name]: value });
    }
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (Object.keys(errors).length > 0) {
      alert('Please correct the errors before submitting.');
      return;
    }

    const {
      downPaymentPercent = 0,
      closingCost = 0,
      interestRate = 0,
      loanTerm = 0,
      monthlyRent = 0,
      otherIncome = 0,
      propertyTax = 0,
      insurance = 0,
      purchasePrice = 0,
    } = inputValues;

    const calculateMortgage = (principal: number, annualRate: number, years: number) => {
      const monthlyRate = annualRate / 100 / 12;
      const payments = years * 12;
      const x = Math.pow(1 + monthlyRate, payments);
      const monthly = (principal * x * monthlyRate) / (x - 1);
      return isFinite(monthly) ? monthly : 0;
    };

    const downPayment = (parseFloat(downPaymentPercent) / 100) * parseFloat(purchasePrice);
    const loanAmount = parseFloat(purchasePrice) - downPayment;
    const monthlyMortgage = calculateMortgage(loanAmount, parseFloat(interestRate), parseFloat(loanTerm));
    const grossOperatingIncome = (parseFloat(monthlyRent) + parseFloat(otherIncome)) * 12;
    const totalOperatingExpenses = (parseFloat(propertyTax) + parseFloat(insurance)) * 12;
    const netOperatingIncome = grossOperatingIncome - totalOperatingExpenses;
    const cashFlowBeforeTaxes = netOperatingIncome - (monthlyMortgage * 12);
    const capRate = parseFloat(purchasePrice) > 0 ? (netOperatingIncome / parseFloat(purchasePrice)) * 100 : 0;

    setResults({
      downPayment,
      loanAmount,
      monthlyMortgage,
      grossOperatingIncome,
      totalOperatingExpenses,
      netOperatingIncome,
      cashFlowBeforeTaxes,
      capRate,
    });
  };

  return (
    <div 
      className="roi-calculator-container"
      style={{
        backgroundImage: 'url("https://cdn.hero.page/wallpapers/18a03cd1-792b-4690-8278-6f4a026e89fb-hand-drawn-cityscape-monumental-emphasis-wallpaper-4.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        minWidth: '200vh'
      }}
    >
      <form onSubmit={handleSubmit} className="form-container">
        <CollapsibleSection title="Purchase Details">
          <InputField name="purchasePrice" label="Purchase Price ($)" placeholder="0" value={inputValues.purchasePrice} onChange={handleChange} error={errors.purchasePrice} />
          <InputField name="downPaymentPercent" label="Down Payment (%)" placeholder="25" value={inputValues.downPaymentPercent} onChange={handleChange} error={errors.downPaymentPercent} />
          <InputField name="closingCost" label="Closing Cost ($)" placeholder="4000" value={inputValues.closingCost} onChange={handleChange} error={errors.closingCost} />
        </CollapsibleSection>
        <CollapsibleSection title="Loan Details">
          <InputField name="interestRate" label="Interest Rate (%)" placeholder="4.0" value={inputValues.interestRate} onChange={handleChange} error={errors.interestRate} />
          <InputField name="loanTerm" label="Loan Term (years)" placeholder="30" value={inputValues.loanTerm} onChange={handleChange} error={errors.loanTerm} />
        </CollapsibleSection>
        <CollapsibleSection title="Income">
          <InputField name="monthlyRent" label="Monthly Rent ($)" placeholder="0" value={inputValues.monthlyRent} onChange={handleChange} error={errors.monthlyRent} />
          <InputField name="otherIncome" label="Other Income ($/month)" placeholder="0" value={inputValues.otherIncome} onChange={handleChange} error={errors.otherIncome} />
        </CollapsibleSection>
        <CollapsibleSection title="Expenses">
          <InputField name="propertyTax" label="Property Tax ($/month)" placeholder="300" value={inputValues.propertyTax} onChange={handleChange} error={errors.propertyTax} />
          <InputField name="insurance" label="Insurance ($/month)" placeholder="100" value={inputValues.insurance} onChange={handleChange} error={errors.insurance} />
        </CollapsibleSection>
        <button type="submit" className="submit-button">Analyze</button>
      </form>
      {/* Results display */}
      {Object.keys(results).length > 0 && (
        <div className="results-container">
          <h2>Results</h2>
          <p>Down Payment: ${results.downPayment.toFixed(2)}</p>
          <p>Loan Amount: ${results.loanAmount.toFixed(2)}</p>
          <p>Monthly Mortgage: ${results.monthlyMortgage.toFixed(2)}</p>
          <p>Gross Operating Income: ${results.grossOperatingIncome.toFixed(2)}</p>
          <p>Total Operating Expenses: ${results.totalOperatingExpenses.toFixed(2)}</p>
          <p>Net Operating Income: ${results.netOperatingIncome.toFixed(2)}</p>
          <p>Cash Flow Before Taxes: ${results.cashFlowBeforeTaxes.toFixed(2)}</p>
          <p>CAP Rate: {results.capRate.toFixed(2)}%</p>
        </div>
      )}
    </div>
  );
};

const InputField = ({ name, label, value, onChange, placeholder, error }) => (
  <div className="input-field">
    <label htmlFor={name}>{label}</label>
    <input
      id={name}
      name={name}
      type="number"
      min="0"
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className="input"
    />
    {error && <p className="error">{error}</p>}
  </div>
);

const CollapsibleSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="collapsible-section">
      <button type="button" onClick={() => setIsOpen(!isOpen)} className="section-title">
        <span className="section-title-text">{title}</span>
        <span className={`arrow ${isOpen ? 'down' : 'right'}`}>{isOpen ? '>' : '>'}</span>
      </button>
      <div className={`section-content ${isOpen ? 'open' : ''}`}>{isOpen && children}</div>
    </div>
  );
};




export default FullPageROICalculator;
