
import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2 } from 'lucide-react';

interface WageEntry {
  employerEIN: string;
  isSpouseWages: boolean;
  cityEmployed: string;
  qualifyingWages: string;
  dublinTaxWithheld: string;
  otherCityTaxWithheld: string;
  adjustments: string;
  netTaxableWages: string;
  creditLimit: string;
}

interface WageDetailsSectionProps {
  form: UseFormReturn<any>;
}

export const WageDetailsSection: React.FC<WageDetailsSectionProps> = ({ form }) => {
  const [wageEntries, setWageEntries] = useState<WageEntry[]>([
    {
      employerEIN: '31-6401089',
      isSpouseWages: true,
      cityEmployed: 'DUBLIN',
      qualifyingWages: '105622.21',
      dublinTaxWithheld: '2112.55',
      otherCityTaxWithheld: '0',
      adjustments: '0',
      netTaxableWages: '105622.21',
      creditLimit: '0'
    },
    {
      employerEIN: '31-4379441',
      isSpouseWages: false,
      cityEmployed: 'COLUMBUS',
      qualifyingWages: '138718.59',
      dublinTaxWithheld: '2774.37',
      otherCityTaxWithheld: '0',
      adjustments: '0',
      netTaxableWages: '138718.59',
      creditLimit: '0'
    }
  ]);

  const formatCurrency = (value: string) => {
    const num = parseFloat(value.replace(/[^0-9.-]/g, ''));
    return isNaN(num) ? '0' : num.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const addWageEntry = () => {
    setWageEntries([...wageEntries, {
      employerEIN: '',
      isSpouseWages: false,
      cityEmployed: '',
      qualifyingWages: '0',
      dublinTaxWithheld: '0',
      otherCityTaxWithheld: '0',
      adjustments: '0',
      netTaxableWages: '0',
      creditLimit: '0'
    }]);
  };

  const removeWageEntry = (index: number) => {
    setWageEntries(wageEntries.filter((_, i) => i !== index));
  };

  const updateWageEntry = (index: number, field: keyof WageEntry, value: string | boolean) => {
    const updatedEntries = [...wageEntries];
    updatedEntries[index] = { ...updatedEntries[index], [field]: value };
    
    // Auto-calculate net taxable wages
    if (field === 'qualifyingWages' || field === 'adjustments') {
      const wages = parseFloat(updatedEntries[index].qualifyingWages || '0');
      const adjustments = parseFloat(updatedEntries[index].adjustments || '0');
      updatedEntries[index].netTaxableWages = (wages - adjustments).toString();
    }
    
    setWageEntries(updatedEntries);
  };

  const calculateTotals = () => {
    return wageEntries.reduce((totals, entry) => ({
      qualifyingWages: totals.qualifyingWages + parseFloat(entry.qualifyingWages || '0'),
      dublinTaxWithheld: totals.dublinTaxWithheld + parseFloat(entry.dublinTaxWithheld || '0'),
      otherCityTaxWithheld: totals.otherCityTaxWithheld + parseFloat(entry.otherCityTaxWithheld || '0'),
      adjustments: totals.adjustments + parseFloat(entry.adjustments || '0'),
      netTaxableWages: totals.netTaxableWages + parseFloat(entry.netTaxableWages || '0'),
      creditLimit: totals.creditLimit + parseFloat(entry.creditLimit || '0')
    }), {
      qualifyingWages: 0,
      dublinTaxWithheld: 0,
      otherCityTaxWithheld: 0,
      adjustments: 0,
      netTaxableWages: 0,
      creditLimit: 0
    });
  };

  const totals = calculateTotals();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-900">Wage Details (W-2 Information)</h2>
        <Button type="button" onClick={addWageEntry} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Employer
        </Button>
      </div>

      <div className="space-y-6">
        {wageEntries.map((entry, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-4 relative">
            {wageEntries.length > 1 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeWageEntry(index)}
                className="absolute top-2 right-2 text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
            
            <h3 className="font-semibold text-lg">Employer {index + 1}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Employer ID Number (EIN)
                </label>
                <Input
                  value={entry.employerEIN}
                  onChange={(e) => updateWageEntry(index, 'employerEIN', e.target.value)}
                  placeholder="XX-XXXXXXX"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City Where Physically Employed
                </label>
                <Input
                  value={entry.cityEmployed}
                  onChange={(e) => updateWageEntry(index, 'cityEmployed', e.target.value)}
                  placeholder="City name"
                />
              </div>

              <div className="flex items-center space-x-2 pt-6">
                <Checkbox
                  checked={entry.isSpouseWages}
                  onCheckedChange={(checked) => updateWageEntry(index, 'isSpouseWages', checked as boolean)}
                />
                <label className="text-sm font-medium text-gray-700">
                  Spouse's Wages
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Qualifying Wages
                </label>
                <Input
                  value={entry.qualifyingWages}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9.-]/g, '');
                    updateWageEntry(index, 'qualifyingWages', value);
                  }}
                  placeholder="0.00"
                />
                <div className="text-xs text-gray-500 mt-1">
                  ${formatCurrency(entry.qualifyingWages)}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dublin Tax Withheld
                </label>
                <Input
                  value={entry.dublinTaxWithheld}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9.-]/g, '');
                    updateWageEntry(index, 'dublinTaxWithheld', value);
                  }}
                  placeholder="0.00"
                />
                <div className="text-xs text-gray-500 mt-1">
                  ${formatCurrency(entry.dublinTaxWithheld)}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Other City Tax Withheld
                </label>
                <Input
                  value={entry.otherCityTaxWithheld}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9.-]/g, '');
                    updateWageEntry(index, 'otherCityTaxWithheld', value);
                  }}
                  placeholder="0.00"
                />
                <div className="text-xs text-gray-500 mt-1">
                  ${formatCurrency(entry.otherCityTaxWithheld)}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Adjustments to Income
                </label>
                <Input
                  value={entry.adjustments}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9.-]/g, '');
                    updateWageEntry(index, 'adjustments', value);
                  }}
                  placeholder="0.00"
                />
                <div className="text-xs text-gray-500 mt-1">
                  ${formatCurrency(entry.adjustments)}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Net Taxable Wages (Auto-calculated)
                </label>
                <div className="p-2 bg-gray-50 border rounded">
                  ${formatCurrency(entry.netTaxableWages)}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Credit Limit for Other Cities
                </label>
                <Input
                  value={entry.creditLimit}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9.-]/g, '');
                    updateWageEntry(index, 'creditLimit', value);
                  }}
                  placeholder="0.00"
                />
                <div className="text-xs text-gray-500 mt-1">
                  ${formatCurrency(entry.creditLimit)}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Totals Section */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-4">TOTALS</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-sm">
            <div>
              <label className="font-medium text-gray-700">Total Qualifying Wages</label>
              <div className="font-semibold">${formatCurrency(totals.qualifyingWages.toString())}</div>
            </div>
            <div>
              <label className="font-medium text-gray-700">Total Dublin Tax Withheld</label>
              <div className="font-semibold">${formatCurrency(totals.dublinTaxWithheld.toString())}</div>
            </div>
            <div>
              <label className="font-medium text-gray-700">Total Other City Tax</label>
              <div className="font-semibold">${formatCurrency(totals.otherCityTaxWithheld.toString())}</div>
            </div>
            <div>
              <label className="font-medium text-gray-700">Total Adjustments</label>
              <div className="font-semibold">${formatCurrency(totals.adjustments.toString())}</div>
            </div>
            <div>
              <label className="font-medium text-gray-700">Total Net Taxable Wages</label>
              <div className="font-semibold">${formatCurrency(totals.netTaxableWages.toString())}</div>
            </div>
            <div>
              <label className="font-medium text-gray-700">Total Credit Limit</label>
              <div className="font-semibold">${formatCurrency(totals.creditLimit.toString())}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
