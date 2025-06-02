
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';

interface PersonalInfoSectionProps {
  form: UseFormReturn<any>;
}

export const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({ form }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Personal Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="taxpayerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Taxpayer Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="taxpayerSSN"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Social Security Number</FormLabel>
              <FormControl>
                <Input placeholder="XXX-XX-XXXX" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="spouseName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Spouse Name (If applicable)</FormLabel>
              <FormControl>
                <Input placeholder="Enter spouse's full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="spouseSSN"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Spouse Social Security Number</FormLabel>
              <FormControl>
                <Input placeholder="XXX-XX-XXXX" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="currentAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Current Home Address</FormLabel>
            <FormControl>
              <Input placeholder="Enter your current address" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="cityStateZip"
        render={({ field }) => (
          <FormItem>
            <FormLabel>City/State/Zip</FormLabel>
            <FormControl>
              <Input placeholder="City, State ZIP" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="taxpayerEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Taxpayer Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="(XXX) XXX-XXXX" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="filingStatus"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Filing Status</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="single" id="single" />
                  <label htmlFor="single">Single</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="marriedJoint" id="marriedJoint" />
                  <label htmlFor="marriedJoint">Married Filing Joint</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="marriedSeparate" id="marriedSeparate" />
                  <label htmlFor="marriedSeparate">Married Filing Separate</label>
                </div>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="movedOutOfDublin"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Did you move out of Dublin during the tax year?</FormLabel>
            <FormControl>
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <label className="text-sm">Yes, I moved out of Dublin</label>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="previousAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Previous Address (if moved)</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Enter your previous address if you moved during the tax year"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
