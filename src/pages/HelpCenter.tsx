
import { MainLayout } from "@/components/layout/MainLayout";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const faqItems = [
  {
    question: "How to add a new pet?",
    answer: "To add a new pet, go to the Pets page and click on the '+Add New Pet' button at the bottom of the screen. Fill in your pet's details in the form and click 'Save Pet'."
  },
  {
    question: "How to reset my password?",
    answer: "To reset your password, go to the login page and click on 'Forgot Password'. Enter your email address and follow the instructions sent to your email to create a new password."
  },
  {
    question: "How to contact customer support?",
    answer: "You can contact our customer support team by clicking the 'Contact Support' button at the bottom of this page. Alternatively, you can email us directly at support@anabulku.com."
  }
];

const HelpCenter = () => {
  return (
    <MainLayout>
      <div className="p-6 pb-24 bg-gray-50">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-[36px] font-bold font-rubik text-black tracking-tight">Help Center</h1>
          <p className="text-[15px] font-rubik text-gray-500 mt-2">
            Find answers to common questions and get support for your pet care needs.
          </p>
        </header>

        {/* FAQ Accordion */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden p-4 mb-8">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className={index !== faqItems.length - 1 ? "border-b border-gray-100" : ""}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-50 rounded-full mr-3">
                      <HelpCircle className="text-green-400 h-4 w-4" />
                    </div>
                    <span className="text-left font-medium">{item.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pl-12">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact Support Button */}
        <div className="flex justify-center">
          <Button 
            variant="outline" 
            className="flex items-center gap-2 border-green-400 text-green-600 hover:bg-green-50"
            onClick={() => window.location.href = "mailto:support@anabulku.com"}
          >
            <Mail className="h-4 w-4" />
            Contact Support
          </Button>
        </div>
      </div>
    </MainLayout>
  );
};

export default HelpCenter;
