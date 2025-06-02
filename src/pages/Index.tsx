
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FileText, Calculator, Users, CheckCircle } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Dublin Tax Return System
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Complete your City of Dublin tax return quickly and accurately with our comprehensive online form system.
          </p>
          <Button 
            onClick={() => navigate('/tax-form')}
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
          >
            Start Your Tax Return
            <FileText className="ml-2 h-5 w-5" />
          </Button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <Calculator className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Automatic Calculations</h3>
            <p className="text-gray-600">
              All tax calculations are performed automatically as you enter your information.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Joint & Individual Filing</h3>
            <p className="text-gray-600">
              Support for single, married filing joint, and married filing separate returns.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <CheckCircle className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Step-by-Step Guidance</h3>
            <p className="text-gray-600">
              Easy-to-follow sections guide you through each part of your tax return.
            </p>
          </div>
        </div>

        {/* Form Sections Preview */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            What's Included in Your Tax Return
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <h4 className="font-semibold text-gray-900">Personal Info</h4>
              <p className="text-sm text-gray-600 mt-2">Names, addresses, SSNs</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h4 className="font-semibold text-gray-900">Income Details</h4>
              <p className="text-sm text-gray-600 mt-2">Wages, self-employment, rental</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h4 className="font-semibold text-gray-900">Tax Calculations</h4>
              <p className="text-sm text-gray-600 mt-2">Withholdings, payments, credits</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h4 className="font-semibold text-gray-900">W-2 Details</h4>
              <p className="text-sm text-gray-600 mt-2">Multiple employer information</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <h4 className="font-semibold text-gray-900">Signatures</h4>
              <p className="text-sm text-gray-600 mt-2">Electronic signing & review</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-600">
          <p>City of Dublin Income Tax Division</p>
          <p className="text-sm mt-2">For assistance, please contact the tax office at (614) 410-4400</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
