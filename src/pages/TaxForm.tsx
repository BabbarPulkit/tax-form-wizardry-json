
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Form } from '@/components/ui/form';
import { PersonalInfoSection } from '@/components/tax-form/PersonalInfoSection';
import { IncomeSection } from '@/components/tax-form/IncomeSection';
import { TaxCalculationSection } from '@/components/tax-form/TaxCalculationSection';
import { SignatureSection } from '@/components/tax-form/SignatureSection';
import { WageDetailsSection } from '@/components/tax-form/WageDetailsSection';

const taxFormSchema = z.object({
  // Form type
  refund: z.boolean().default(false),
  amended: z.boolean().default(false),
  
  // Personal Information
  taxpayerName: z.string().min(1, "Taxpayer name is required"),
  taxpayerSSN: z.string().min(9, "Valid SSN required"),
  spouseName: z.string().optional(),
  spouseSSN: z.string().optional(),
  currentAddress: z.string().min(1, "Address is required"),
  cityStateZip: z.string().min(1, "City/State/Zip is required"),
  taxpayerEmail: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional(),
  movedOutOfDublin: z.boolean().default(false),
  
  // Filing status
  filingStatus: z.enum(["single", "marriedJoint", "marriedSeparate"]),
  previousAddress: z.string().optional(),
  
  // Income Information
  qualifyingWages: z.string().default("0"),
  otherAdjustments: z.string().optional(),
  selfEmploymentIncome: z.string().default("0"),
  rentalIncome: z.string().default("0"),
  otherTaxableIncome: z.string().default("0"),
  priorYearLossCarryforward: z.string().default("0"),
  
  // Tax Calculations
  dublinTaxWithheld: z.string().default("0"),
  taxesWithheldOtherCities: z.string().default("0"),
  estimatedTaxesPaid: z.string().default("0"),
  priorYearCredit: z.string().default("0"),
  
  // Signatures
  taxpayerSignatureDate: z.string().optional(),
  spouseSignatureDate: z.string().optional(),
  preparerName: z.string().optional(),
  preparerPhone: z.string().optional(),
  preparerDate: z.string().optional(),
});

type TaxFormData = z.infer<typeof taxFormSchema>;

const TaxForm = () => {
  const { toast } = useToast();
  const [currentSection, setCurrentSection] = useState(0);
  
  const form = useForm<TaxFormData>({
    resolver: zodResolver(taxFormSchema),
    defaultValues: {
      refund: false,
      amended: false,
      taxpayerName: "ADAM S. BARNETT",
      taxpayerSSN: "163-66-5575",
      spouseName: "DAWN BARNETT",
      spouseSSN: "296-86-7097",
      currentAddress: "4282 CLARK STREET",
      cityStateZip: "DUBLIN, OHIO 43017-9625",
      filingStatus: "marriedJoint",
      previousAddress: "8667 FINLARIG DRIVE\nDUBLIN, OHIO 43017",
      movedOutOfDublin: false,
      qualifyingWages: "244340.80",
      selfEmploymentIncome: "0",
      rentalIncome: "0",
      otherTaxableIncome: "0",
      priorYearLossCarryforward: "0",
      dublinTaxWithheld: "4886.92",
      taxesWithheldOtherCities: "0",
      estimatedTaxesPaid: "0",
      priorYearCredit: "0",
    },
  });

  const sections = [
    { title: "Personal Information", component: PersonalInfoSection },
    { title: "Income Details", component: IncomeSection },
    { title: "Tax Calculations", component: TaxCalculationSection },
    { title: "Wage Details", component: WageDetailsSection },
    { title: "Signatures", component: SignatureSection },
  ];

  const onSubmit = (data: TaxFormData) => {
    console.log("Tax form submitted:", data);
    toast({
      title: "Tax Form Submitted",
      description: "Your tax form has been successfully submitted for processing.",
    });
  };

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    }
  };

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const CurrentSectionComponent = sections[currentSection].component;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              City of Dublin Tax Return
            </h1>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  {...form.register("refund")}
                  className="rounded"
                />
                <label className="text-sm font-medium">Refund</label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  {...form.register("amended")}
                  className="rounded"
                />
                <label className="text-sm font-medium">Amended</label>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              {sections.map((section, index) => (
                <div
                  key={index}
                  className={`text-sm font-medium ${
                    index === currentSection
                      ? "text-blue-600"
                      : index < currentSection
                      ? "text-green-600"
                      : "text-gray-400"
                  }`}
                >
                  {section.title}
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${((currentSection + 1) / sections.length) * 100}%`,
                }}
              />
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <CurrentSectionComponent form={form} />

              {/* Navigation */}
              <div className="flex justify-between pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevSection}
                  disabled={currentSection === 0}
                >
                  Previous
                </Button>
                
                {currentSection === sections.length - 1 ? (
                  <Button type="submit" className="bg-green-600 hover:bg-green-700">
                    Submit Tax Return
                  </Button>
                ) : (
                  <Button type="button" onClick={nextSection}>
                    Next
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default TaxForm;
