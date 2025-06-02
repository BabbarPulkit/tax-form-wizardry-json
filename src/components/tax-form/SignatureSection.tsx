
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface SignatureSectionProps {
  form: UseFormReturn<any>;
}

export const SignatureSection: React.FC<SignatureSectionProps> = ({ form }) => {
  const currentDate = new Date().toLocaleDateString();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Signatures and Third Party Designee</h2>
      
      {/* Third Party Designee */}
      <div className="bg-gray-50 p-4 rounded-lg space-y-4">
        <h3 className="font-semibold text-gray-900">Third Party Designee</h3>
        <p className="text-sm text-gray-600">
          Do you want to allow another person to discuss this return with the IRS?
        </p>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <input type="radio" id="designee-yes" name="thirdPartyDesignee" value="yes" />
            <label htmlFor="designee-yes" className="text-sm">Yes</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="radio" id="designee-no" name="thirdPartyDesignee" value="no" defaultChecked />
            <label htmlFor="designee-no" className="text-sm">No</label>
          </div>
        </div>
      </div>

      {/* Tax Preparer Information */}
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900">Tax Preparer Information</h3>
        
        <FormField
          control={form.control}
          name="preparerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Signature of Tax Preparer (Third Party Designee)</FormLabel>
              <FormControl>
                <Input 
                  placeholder="CL ROTZ & ASSOC P.C. 03-0518650" 
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="preparerPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preparer Phone Number</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="215-881-6740" 
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="preparerDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input 
                    type="date"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {/* Taxpayer Signatures */}
      <div className="space-y-6">
        <h3 className="font-semibold text-gray-900">Taxpayer Signatures</h3>
        
        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="text-sm text-yellow-800 mb-4">
            <strong>Under penalties of perjury,</strong> I declare that I have examined this return and accompanying schedules and statements, and to the best of my knowledge and belief, they are true, correct, and complete.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Taxpayer</h4>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Signature of Taxpayer
              </label>
              <div className="p-3 border-2 border-dashed border-gray-300 rounded text-center text-gray-500">
                Electronic signature required
              </div>
            </div>
            
            <FormField
              control={form.control}
              name="taxpayerSignatureDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input 
                      type="date"
                      defaultValue={currentDate}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Spouse (if filing jointly)</h4>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Signature of Spouse
              </label>
              <div className="p-3 border-2 border-dashed border-gray-300 rounded text-center text-gray-500">
                Electronic signature required
              </div>
            </div>
            
            <FormField
              control={form.control}
              name="spouseSignatureDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input 
                      type="date"
                      defaultValue={currentDate}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>

      {/* Final Review */}
      <div className="bg-green-50 p-4 rounded-lg">
        <h3 className="font-semibold text-green-900 mb-2">Final Review</h3>
        <p className="text-sm text-green-800">
          Please review all sections of your tax return before submitting. Make sure all information is accurate and complete.
        </p>
        <div className="mt-3 space-y-2">
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="review-personal" className="rounded" />
            <label htmlFor="review-personal" className="text-sm">Personal information reviewed</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="review-income" className="rounded" />
            <label htmlFor="review-income" className="text-sm">Income information reviewed</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="review-calculations" className="rounded" />
            <label htmlFor="review-calculations" className="text-sm">Tax calculations reviewed</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="review-wages" className="rounded" />
            <label htmlFor="review-wages" className="text-sm">Wage details reviewed</label>
          </div>
        </div>
      </div>
    </div>
  );
};
