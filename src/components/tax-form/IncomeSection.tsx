
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface IncomeSectionProps {
  form: UseFormReturn<any>;
}

export const IncomeSection: React.FC<IncomeSectionProps> = ({ form }) => {
  const formatCurrency = (value: string) => {
    const num = parseFloat(value.replace(/[^0-9.-]/g, ''));
    return isNaN(num) ? '0' : num.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Income Information</h2>
      
      <FormField
        control={form.control}
        name="qualifyingWages"
        render={({ field }) => (
          <FormItem>
            <FormLabel>1. Income from QUALIFYING WAGES (Attach ALL W2's)</FormLabel>
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
        name="otherAdjustments"
        render={({ field }) => (
          <FormItem>
            <FormLabel>2. Other adjustments explanation (Select reason and complete Page 2)</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Provide explanation for any adjustments"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="selfEmploymentIncome"
        render={({ field }) => (
          <FormItem>
            <FormLabel>3. Income from Self-Employment (Attach Federal Schedule C)</FormLabel>
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
        name="rentalIncome"
        render={({ field }) => (
          <FormItem>
            <FormLabel>4. Income from Rents or Leases (Attach Federal Schedule E)</FormLabel>
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
        name="otherTaxableIncome"
        render={({ field }) => (
          <FormItem>
            <FormLabel>5. Other Taxable Income (Attach applicable Federal Schedules)</FormLabel>
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
        name="priorYearLossCarryforward"
        render={({ field }) => (
          <FormItem>
            <FormLabel>6. Prior Year Loss Carryforward (See instructions)</FormLabel>
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

      {/* Calculated fields */}
      <div className="bg-gray-50 p-4 rounded-lg space-y-4">
        <h3 className="font-semibold text-gray-900">Calculated Values</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              7. Net Business/Rental Income
            </label>
            <div className="mt-1 p-2 bg-white border rounded">
              ${formatCurrency(
                (parseFloat(form.watch('selfEmploymentIncome') || '0') +
                 parseFloat(form.watch('rentalIncome') || '0') +
                 parseFloat(form.watch('otherTaxableIncome') || '0') -
                 parseFloat(form.watch('priorYearLossCarryforward') || '0')).toString()
              )}
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700">
              8. Taxable Income
            </label>
            <div className="mt-1 p-2 bg-white border rounded">
              ${formatCurrency(
                (parseFloat(form.watch('qualifyingWages') || '0') +
                 parseFloat(form.watch('selfEmploymentIncome') || '0') +
                 parseFloat(form.watch('rentalIncome') || '0') +
                 parseFloat(form.watch('otherTaxableIncome') || '0') -
                 parseFloat(form.watch('priorYearLossCarryforward') || '0')).toString()
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
