
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

// Mock data for existing parent
const existingParent = {
  name: "Eko",
  gender: "Male",
  email: "eko@example.com",
  phone: "0812345678"
};

const Pawrent = () => {
  const [formData, setFormData] = useState({
    fullName: existingParent.name,
    gender: existingParent.gender.toLowerCase(),
    email: existingParent.email,
    phone: existingParent.phone
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGenderChange = (value: string) => {
    setFormData(prev => ({ ...prev, gender: value }));
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
          
          {/* Avatar Display */}
          <div className="mt-6 flex flex-col items-center">
            <ParentAvatar size="lg" />
            <h2 className="text-xl font-medium mt-3 font-poppins">{existingParent.name}</h2>
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

          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender
            </label>
            <Select onValueChange={handleGenderChange} value={formData.gender}>
              <SelectTrigger className="h-12 rounded-lg">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

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

          {/* Save Button */}
          <div className="pt-6">
            <ButtonCustom 
              type="submit" 
              className="w-full bg-petapp-teal text-white font-bold rounded-lg"
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
