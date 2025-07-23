'use client';

import { useFlight } from '@/context/FlightContext';
import PriceSummary from '@/components/shared/PriceSummary/PriceSummary';
import { useTranslations } from 'next-intl';

/**
 * Demo component to show how global price calculations work across any page
 * This demonstrates that subtotal, taxes/fees, and total are now accessible
 * from any component in the application via the FlightContext
 */
export default function GlobalPriceDemo() {
  const t = useTranslations('DetailPage');
  const { 
    selectedDepartFlight, 
    selectedReturnFlight, 
    priceCalculations,
    tripType 
  } = useFlight();

  const { subtotal, taxesAndFees, total } = priceCalculations;

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Global Price Calculations Demo</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Flight Selection Status:</h3>
        <p><strong>Trip Type:</strong> {tripType === 'round' ? 'Round Trip' : 'One Way'}</p>
        <p><strong>Departing Flight:</strong> {selectedDepartFlight ? `${selectedDepartFlight.airlineType} - ${selectedDepartFlight.price}` : 'Not selected'}</p>
        <p><strong>Return Flight:</strong> {selectedReturnFlight ? `${selectedReturnFlight.airlineType} - ${selectedReturnFlight.price}` : 'Not selected'}</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Direct Access to Global Calculations:</h3>
        <div style={{ background: '#f5f5f5', padding: '15px', borderRadius: '8px' }}>
          <p><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</p>
          <p><strong>Taxes & Fees (15%):</strong> ${taxesAndFees.toFixed(2)}</p>
          <p><strong>Total:</strong> ${total.toFixed(2)}</p>
        </div>
      </div>

      <div>
        <h3>Using Reusable PriceSummary Component:</h3>
        <PriceSummary />
      </div>

      <div style={{ marginTop: '20px', padding: '15px', background: '#e8f5e8', borderRadius: '8px' }}>
        <h4>✅ Success!</h4>
        <p>The price calculations are now globally accessible and update automatically when:</p>
        <ul>
          <li>Flights are selected or deselected</li>
          <li>Trip type changes (round trip vs one way)</li>
          <li>User navigates between pages</li>
        </ul>
        <p>This works on <strong>any page</strong> in the application!</p>
      </div>
    </div>
  );
}
