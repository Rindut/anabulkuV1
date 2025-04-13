
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info, Globe } from "lucide-react";

const About = () => {
  return (
    <MainLayout>
      <div className="p-6 pb-24 bg-gray-50">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-[36px] font-bold font-rubik text-black tracking-tight">About This App</h1>
        </header>

        {/* About Card */}
        <Card className="bg-white rounded-2xl shadow-sm overflow-hidden mb-8">
          {/* Icon at the top */}
          <div className="flex justify-center mt-6">
            <div className="p-3 bg-green-50 rounded-full">
              <Info className="text-green-500 h-8 w-8" />
            </div>
          </div>
          
          <CardContent className="pt-6 px-6 pb-8">
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2 text-sm">
                <span className="text-gray-500">App Name:</span>
                <span className="col-span-2 font-medium">Anabulku</span>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-sm">
                <span className="text-gray-500">Version:</span>
                <span className="col-span-2 font-medium">1.0.0</span>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-sm">
                <span className="text-gray-500">Developed by:</span>
                <span className="col-span-2 font-medium">Rindut Team</span>
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-sm">
                <span className="text-gray-500">Purpose:</span>
                <span className="col-span-2 font-medium">To help pet owners manage their pets' health and daily care.</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* About Text */}
        <div className="mb-8">
          <p className="text-center text-gray-600">
            Anabulku is your go-to companion for managing your pet family with ease.
          </p>
        </div>

        {/* Visit Website Button */}
        <div className="flex justify-center">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => window.open("https://anabulku.com", "_blank")}
          >
            <Globe className="h-4 w-4" />
            Visit Website
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
