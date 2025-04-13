
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { InputCustom } from "@/components/ui/input-custom";
import { ButtonCustom } from "@/components/ui/button-custom";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { ParentAvatar } from "@/components/avatars/ParentAvatar";

const Pawrent = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    relationship: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRelationshipChange = (value: string) => {
    setFormData(prev => ({ ...prev, relationship: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
  };

  return (
    <MainLayout>
      <div className="p-6 pb-24 bg-gray-50">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-[36px] font-bold font-rubik text-black tracking-tight">Pawrent Info</h1>
          
          {/* Avatar Display (Optional) */}
          <div className="mt-6 flex justify-center">
            <ParentAvatar size="lg" />
          </div>
        </header>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputCustom
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Enter your full name"
          />

          <InputCustom
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email address"
          />

          <InputCustom
            label="Phone Number"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Enter your phone number"
          />

          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Relationship to Pet
            </label>
            <Select onValueChange={handleRelationshipChange} value={formData.relationship}>
              <SelectTrigger className="h-12 rounded-lg">
                <SelectValue placeholder="Select relationship" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Owner">Owner</SelectItem>
                  <SelectItem value="Family">Family</SelectItem>
                  <SelectItem value="Friend">Friend</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Save Button */}
          <div className="pt-6">
            <ButtonCustom 
              type="submit" 
              className="w-full bg-blue-500 hover:bg-blue-600"
              fullWidth
            >
              Save Changes
            </ButtonCustom>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default Pawrent;
