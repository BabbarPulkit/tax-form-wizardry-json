
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface TaxCalculationSectionProps {
  form: UseFormReturn<any>;
}

export const TaxCalculationSection: React.FC<TaxCalculationSectionProps> = ({ form }) => {
  const formatCurrency = (value: string) => {
    const num = parseFloat(value.replace(/[^0-9.-]/g, ''));
    return isNaN(num) ? '0' : num.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const calculateTaxableIncome = () => {
    const qualifyingWages = parseFloat(form.watch('qualifyingWages') || '0');
    const selfEmployment = parseFloat(form.watch('selfEmploymentIncome') || '0');
    const rental = parseFloat(form.watch('rentalIncome') || '0');
    const otherIncome = parseFloat(form.watch('otherTaxableIncome') || '0');
    const carryforward = parseFloat(form.watch('priorYearLossCarryforward') || '0');
    
    return qualifyingWages + selfEmployment + rental + otherIncome - carryforward;
  };

  const calculateTaxDue = () => {
    return calculateTaxableIncome() * 0.02; // 2% tax rate
  };

  const calculateTotalPayments = () => {
    const dublinWithheld = parseFloat(form.watch('dublinTaxWithheld') || '0');
    const otherCities = parseFloat(form.watch('taxesWithheldOtherCities') || '0');
    const estimated = parseFloat(form.watch('estimatedTaxesPaid') || '0');
    const priorCredit = parseFloat(form.watch('priorYearCredit') || '0');
    
    return dublinWithheld + otherCities + estimated + priorCredit;
  };

  const calculateBalance = () => {
    return calculateTaxDue() - calculateTotalPayments();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Tax Calculations</h2>
      
      {/* Tax Due Calculation */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-3">Tax Due Calculation</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              8. Taxable Income
            </label>
            <div className="mt-1 p-2 bg-white border rounded">
              ${formatCurrency(calculateTaxableIncome().toString())}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              9. Tax Due on Income (2% of line 8)
            </label>
            <div className="mt-1 p-2 bg-white border rounded font-semibold">
              ${formatCurrency(calculateTaxDue().toString())}
            </div>
          </div>
        </div>
      </div>

      {/* Payments and Credits */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900">Payments and Credits</h3>
        
        <FormField
          control={form.control}
          name="dublinTaxWithheld"
          render={({ field }) => (
            <FormItem>
              <FormLabel>10. Dublin Tax Withheld</FormLabel>
              <FormControl>
                <Input 
                  placeholder="0.00" 
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9.-]/g, '');
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <div className="text-sm text-gray-600">
                Formatted: ${formatCurrency(field.value || '0')}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="taxesWithheldOtherCities"
          render={({ field }) => (
            <FormItem>
              <FormLabel>11. Taxes Withheld or Paid to Other Cities</FormLabel>
              <FormControl>
                <Input 
                  placeholder="0.00" 
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9.-]/g, '');
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <div className="text-sm text-gray-600">
                Formatted: ${formatCurrency(field.value || '0')}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="estimatedTaxesPaid"
          render={({ field }) => (
            <FormItem>
              <FormLabel>12. Estimated Taxes Paid</FormLabel>
              <FormControl>
                <Input 
                  placeholder="0.00" 
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9.-]/g, '');
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <div className="text-sm text-gray-600">
                Formatted: ${formatCurrency(field.value || '0')}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="priorYearCredit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>13. Prior Year Credit/Extension Payments</FormLabel>
              <FormControl>
                <Input 
                  placeholder="0.00" 
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9.-]/g, '');
                    field.onChange(value);
                  }}
                />
              </FormControl>
              <div className="text-sm text-gray-600">
                Formatted: ${formatCurrency(field.value || '0')}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Final Calculations */}
      <div className="bg-green-50 p-4 rounded-lg space-y-4">
        <h3 className="font-semibold text-gray-900">Final Tax Calculation</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              14. Total Payments and Credits
            </label>
            <div className="mt-1 p-2 bg-white border rounded">
              ${formatCurrency(calculateTotalPayments().toString())}
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700">
              15. Tax Due / (Overpayment)
            </label>
            <div className={`mt-1 p-2 bg-white border rounded font-semibold ${
              calculateBalance() > 0 ? 'text-red-600' : 'text-green-600'
            }`}>
              ${formatCurrency(Math.abs(calculateBalance()).toString())}
              {calculateBalance() > 0 ? ' DUE' : ' REFUND'}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              17. Total Tax Due (if $10 or less, enter 0)
            </label>
            <div className={`mt-1 p-2 bg-white border rounded font-semibold ${
              calculateBalance() > 10 ? 'text-red-600' : 'text-gray-600'
            }`}>
              ${formatCurrency((calculateBalance() > 10 ? calculateBalance() : 0).toString())}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
