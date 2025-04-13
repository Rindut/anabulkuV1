
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
import { DatePicker } from "@/components/ui/date-picker";
import { PetAvatar } from "@/components/avatars/PetAvatar";
import { Upload } from "lucide-react";

const AddPet = () => {
  const [petData, setPetData] = useState({
    name: "",
    type: "",
    breed: "",
    gender: "",
    birthdate: undefined as Date | undefined,
    photo: null as File | null,
  });

  const [vaccinations, setVaccinations] = useState({
    rabies: { checked: false, date: undefined as Date | undefined, clinic: "" },
    parvo: { checked: false, date: undefined as Date | undefined, clinic: "" },
    distemper: { checked: false, date: undefined as Date | undefined, clinic: "" },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPetData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setPetData(prev => ({ ...prev, [field]: value }));
  };

  const handleDateChange = (date: Date | undefined) => {
    setPetData(prev => ({ ...prev, birthdate: date }));
  };

  const handleVaccinationToggle = (vaccine: keyof typeof vaccinations) => {
    setVaccinations(prev => ({
      ...prev,
      [vaccine]: {
        ...prev[vaccine],
        checked: !prev[vaccine].checked
      }
    }));
  };

  const handleVaccinationDateChange = (vaccine: keyof typeof vaccinations, date: Date | undefined) => {
    setVaccinations(prev => ({
      ...prev,
      [vaccine]: {
        ...prev[vaccine],
        date
      }
    }));
  };

  const handleVaccinationClinicChange = (vaccine: keyof typeof vaccinations, clinic: string) => {
    setVaccinations(prev => ({
      ...prev,
      [vaccine]: {
        ...prev[vaccine],
        clinic
      }
    }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPetData(prev => ({ ...prev, photo: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Pet data:", petData);
    console.log("Vaccinations:", vaccinations);
  };

  return (
    <MainLayout>
      <div className="p-6 pb-24 bg-gray-50">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-[36px] font-bold font-rubik text-black tracking-tight">Add New Pet</h1>
        </header>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Pet Info */}
          <InputCustom
            label="Pet Name"
            name="name"
            value={petData.name}
            onChange={handleInputChange}
            placeholder="Enter pet name"
          />

          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pet Type
            </label>
            <Select onValueChange={(value) => handleSelectChange("type", value)} value={petData.type}>
              <SelectTrigger className="h-12 rounded-lg">
                <SelectValue placeholder="Select pet type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Cat">Cat</SelectItem>
                  <SelectItem value="Dog">Dog</SelectItem>
                  <SelectItem value="Rabbit">Rabbit</SelectItem>
                  <SelectItem value="Hamster">Hamster</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <InputCustom
            label="Breed (optional)"
            name="breed"
            value={petData.breed}
            onChange={handleInputChange}
            placeholder="Enter breed"
          />

          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender
            </label>
            <Select onValueChange={(value) => handleSelectChange("gender", value)} value={petData.gender}>
              <SelectTrigger className="h-12 rounded-lg">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <DatePicker
            label="Birthdate"
            value={petData.birthdate}
            onChange={handleDateChange}
            placeholder="Select birthdate"
          />

          {/* Pet Photo Upload */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Picture
            </label>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                {petData.photo ? (
                  <img 
                    src={URL.createObjectURL(petData.photo)} 
                    alt="Pet preview" 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <PetAvatar 
                    petType={(petData.type?.toLowerCase() === "dog" ? "dog" : "cat") as "cat" | "dog"} 
                    size="md" 
                  />
                )}
              </div>
              <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 rounded-lg px-4 py-2 text-sm flex items-center">
                <Upload className="h-4 w-4 mr-2" />
                Upload Photo
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handlePhotoUpload}
                />
              </label>
            </div>
          </div>

          {/* Vaccination Info */}
          <div className="pt-4">
            <h2 className="text-lg font-semibold text-gray-800 font-rubik mb-4">Vaccination Info</h2>
            
            <div className="space-y-4">
              {/* Rabies */}
              <div className="bg-white p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id="rabies"
                    checked={vaccinations.rabies.checked}
                    onChange={() => handleVaccinationToggle("rabies")}
                    className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <label htmlFor="rabies" className="ml-2 text-sm font-medium text-gray-700">
                    Rabies
                  </label>
                </div>
                
                {vaccinations.rabies.checked && (
                  <div className="pl-6 space-y-3 mt-3">
                    <DatePicker
                      label="Vaccination Date"
                      value={vaccinations.rabies.date}
                      onChange={(date) => handleVaccinationDateChange("rabies", date)}
                      placeholder="Select date"
                    />
                    
                    <InputCustom
                      label="Veterinary Clinic"
                      value={vaccinations.rabies.clinic}
                      onChange={(e) => handleVaccinationClinicChange("rabies", e.target.value)}
                      placeholder="Enter clinic name"
                    />
                  </div>
                )}
              </div>
              
              {/* Parvo */}
              <div className="bg-white p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id="parvo"
                    checked={vaccinations.parvo.checked}
                    onChange={() => handleVaccinationToggle("parvo")}
                    className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <label htmlFor="parvo" className="ml-2 text-sm font-medium text-gray-700">
                    Parvo
                  </label>
                </div>
                
                {vaccinations.parvo.checked && (
                  <div className="pl-6 space-y-3 mt-3">
                    <DatePicker
                      label="Vaccination Date"
                      value={vaccinations.parvo.date}
                      onChange={(date) => handleVaccinationDateChange("parvo", date)}
                      placeholder="Select date"
                    />
                    
                    <InputCustom
                      label="Veterinary Clinic"
                      value={vaccinations.parvo.clinic}
                      onChange={(e) => handleVaccinationClinicChange("parvo", e.target.value)}
                      placeholder="Enter clinic name"
                    />
                  </div>
                )}
              </div>
              
              {/* Distemper */}
              <div className="bg-white p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id="distemper"
                    checked={vaccinations.distemper.checked}
                    onChange={() => handleVaccinationToggle("distemper")}
                    className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />
                  <label htmlFor="distemper" className="ml-2 text-sm font-medium text-gray-700">
                    Distemper
                  </label>
                </div>
                
                {vaccinations.distemper.checked && (
                  <div className="pl-6 space-y-3 mt-3">
                    <DatePicker
                      label="Vaccination Date"
                      value={vaccinations.distemper.date}
                      onChange={(date) => handleVaccinationDateChange("distemper", date)}
                      placeholder="Select date"
                    />
                    
                    <InputCustom
                      label="Veterinary Clinic"
                      value={vaccinations.distemper.clinic}
                      onChange={(e) => handleVaccinationClinicChange("distemper", e.target.value)}
                      placeholder="Enter clinic name"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-6">
            <ButtonCustom 
              type="submit" 
              className="w-full bg-green-500 hover:bg-green-600 text-white"
              fullWidth
            >
              Save Pet
            </ButtonCustom>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default AddPet;
