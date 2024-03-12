"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import ReactDOM from 'react-dom';
import './ROICalculatorPopup.css';
import FullPageROICalculator from '../../dashboard/page';

type PropertyData = {
  url: React.JSX.Element;
  imgSrc?: string;
  images?: string[];
  price?: number;
  rentZestimate?: number;
  address?: {
    streetAddress?: string;
    city?: string;
    state?: string;
    zipcode?: string;
  };
  description?: string;
};



const PropertyDetails = ({ params }: { params: { address: string } }) => {
  const [property, setProperty] = useState<PropertyData | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);

  useEffect(() => {
    if (params.address) {
      fetchHouseData(params.address);
    }
  }, [params.address]);

  const fetchHouseData = async (address: string) => {
    const propertyOptions = {
      method: 'GET',
      url: 'https://zillow-com1.p.rapidapi.com/property',
      params: { zpid: address },
      headers: {
        'X-RapidAPI-Key': 'c31fb36df2mshbf32ada61677af9p180734jsn0dcb38ea4a90',
        'X-RapidAPI-Host': 'zillow-com1.p.rapidapi.com',
      },
    };
  
    const imagesOptions = {
      method: 'GET',
      url: 'https://zillow-com1.p.rapidapi.com/images',
      params: { zpid: address },
      headers: {
        'X-RapidAPI-Key': 'c31fb36df2mshbf32ada61677af9p180734jsn0dcb38ea4a90',
        'X-RapidAPI-Host': 'zillow-com1.p.rapidapi.com',
      },
    };
  
    try {
      const propertyResponse = await axios.request(propertyOptions);
      const imagesResponse = await axios.request(imagesOptions);
  
      // Assuming imagesResponse.data contains an array of image URLs
      const images = imagesResponse.data.images || [];
  
      setProperty({ ...propertyResponse.data, images, url: propertyResponse.data.url });

    } catch (error) {
      toast.error('Something went wrong!');
    }
  };
  
  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : (property?.images?.length || 1) - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex < (property?.images?.length || 1) - 1 ? prevIndex + 1 : 0
    );
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const handleOpenCalculator = () => setShowCalculator(true);
  const handleCloseCalculator = () => setShowCalculator(false);

  return (
    <div className="container mx-auto px-4 py-8">
      {property ? (
        <>
          <div className="flex flex-wrap mt-2 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            {/* Fixed-height container for the image carousel */}
            <div className="w-full md:w-3/4 relative" style={{ height: '500px' }}> {/* Adjust the height as needed */}
              {property.images && property.images.length > 0 && (
                <img
                  src={property.images[currentImageIndex]}
                  alt={`Property ${currentImageIndex}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              )}

              {/* Navigation Buttons, absolutely positioned */}
              {property.images && property.images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-1 rounded-full"
                    aria-label="Previous image"
                  >
                    &lt;
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-1 rounded-full"
                    aria-label="Next image"
                  >
                    &gt;
                  </button>
                </>
              )}
            </div>



            <div className="w-full md:w-3/4 p-4 flex flex-col justify-between">
            
            <div className="w-full md:w-3/4 p-4 flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-4xl font-bold">
                    ${property.price ? new Intl.NumberFormat('en-US').format(property.price) : 'N/A'}
                  </h1>
                  <p className="text-lg mb-4">
                    {property.address ? `${property.address.streetAddress}, ${property.address.city}, ${property.address.state} ${property.address.zipcode}` : 'Address not available'}
                  </p>
                  {/* Conditionally render the Zillow link if it exists */}
                  {property.url && (
                    <a href={`https://www.zillow.com/${property.url}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
                      More Info
                    </a>
                  )}
                </div>

      {/* Analyze Button */}
      <button
        className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={handleOpenCalculator}
      >
        Analyze
      </button>
    </div>

    <div className={`description ${!showFullDescription ? 'line-clamp-15' : ''}`}> {/* Conditional class for line clamping */}
      {property.description || 'Description not available'}
    </div>
    {property.description && (
      <button onClick={toggleDescription} className="text-blue-500 hover:text-blue-700 mt-2">
        {showFullDescription ? 'Read Less' : 'Read More'}
      </button>
    )}
  </div>
</div>

          </div>

          {showCalculator && (
            <ROICalculatorPopup property={property} onClose={handleCloseCalculator} />
          )}
        </>
      ) : (
        <p>Loading property details...</p>
      )}
    </div>

  );
};


//START OF THE CALCULATOR POPUP

const ROICalculatorPopup = ({ property, onClose }) => {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div className="roi-calculator-container bg-white rounded-lg overflow-auto max-h-[85%] w-full max-w-[60%] mx-auto">
        <div className="flex justify-end p-2">
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500" aria-label="Close">
            <span className="text-2xl">&times;</span>
          </button>
        </div>
        <div className="form-container p-4">
          {/* Pass the property prop to FullPageROICalculator */}
          <FullPageROICalculator property={property} />
        </div>
      </div>
    </div>,
    document.body
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



// Function to calculate monthly mortgage payment
const calculateMortgage = (principal: number, annualRate: number, years: number): number => {
  const monthlyRate = annualRate / 100 / 12;
  const payments = years * 12;
  const x = Math.pow(1 + monthlyRate, payments);
  const monthly = (principal * x * monthlyRate) / (x - 1);
  return isFinite(monthly) ? monthly : 0;
};

const ROICalculator = ({ property }) => {
  const [downPaymentPercent, setDownPaymentPercent] = useState(25);
  const [closingCost, setClosingCost] = useState(4000);
  const [interestRate, setInterestRate] = useState(4.0);
  const [loanTerm, setLoanTerm] = useState(30);
  const [monthlyRent, setMonthlyRent] = useState(property.rentZestimate || 0);
  const [otherIncome, setOtherIncome] = useState(0);
  const [propertyTax, setPropertyTax] = useState(300);
  const [insurance, setInsurance] = useState(1000);
  const [purchasePrice, setPurchasePrice] = useState(property.price || 0);

  // Calculate derived values on the fly
  const downPayment = (downPaymentPercent / 100) * purchasePrice;
  const loanAmount = purchasePrice - downPayment;
  const monthlyMortgage = calculateMortgage(loanAmount, interestRate, loanTerm);
  const grossOperatingIncome = (monthlyRent + otherIncome) * 12;
  const totalOperatingExpenses = (propertyTax + insurance) * 12;
  const netOperatingIncome = grossOperatingIncome - totalOperatingExpenses;
  const cashFlowBeforeTaxes = netOperatingIncome - (monthlyMortgage * 12);
  const capRate = (netOperatingIncome / purchasePrice) * 100;

  useEffect(() => {
    setMonthlyRent(property.rentZestimate || 0);
    setPurchasePrice(property.price || 0);
  }, [property.rentZestimate, property.price]);

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
  
}
export default PropertyDetails;