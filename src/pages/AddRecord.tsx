
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Home, Scissors, Syringe, Stethoscope, XCircle } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { InputCustom } from "@/components/ui/input-custom";
import { DatePicker } from "@/components/ui/date-picker";
import { Textarea } from "@/components/ui/textarea";

// Mock data for pets
const pets = [
  { id: 1, name: "Wijen" },
  { id: 2, name: "Oreo" },
  { id: 3, name: "Chia" },
  { id: 4, name: "Kunyit" },
];

// Care type options with icons
const careTypes = [
  { value: "pethotel", label: "Pet Hotel", icon: Home },
  { value: "grooming", label: "Grooming", icon: Scissors },
  { value: "vaccine", label: "Vaccine", icon: Syringe },
  { value: "vet", label: "Vet Visit", icon: Stethoscope },
  { value: "sterilization", label: "Sterilization", icon: XCircle },
];

const AddRecord = () => {
  const [selectedPet, setSelectedPet] = useState<string>("Chia");
  const [selectedCareType, setSelectedCareType] = useState<string>("vet");
  const [location, setLocation] = useState<string>("");
  const [recordDate, setRecordDate] = useState<Date | undefined>(undefined);
  const [notes, setNotes] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Get the selected care type with icon information
    const selectedCareTypeInfo = careTypes.find(type => type.value === selectedCareType);
    
    // Handle form submission logic
    console.log({
      pet: selectedPet,
      careType: selectedCareType,
      careTypeLabel: selectedCareTypeInfo?.label,
      careTypeIcon: selectedCareTypeInfo?.icon.name,
      location,
      recordDate,
      notes,
    });

    // Save to localStorage for display in Journal
    const existingRecords = JSON.parse(localStorage.getItem('petCareRecords') || '[]');
    const newRecord = {
      id: Date.now(),
      petName: selectedPet,
      careType: selectedCareType,
      careTypeLabel: selectedCareTypeInfo?.label,
      location,
      date: recordDate ? recordDate.toISOString() : new Date().toISOString(),
      notes,
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('petCareRecords', JSON.stringify([...existingRecords, newRecord]));
    
    // Show success message and navigate back after a short delay
    alert("Record saved!");
    setTimeout(() => {
      navigate(-1); // Go back to the previous screen
    }, 500);
  };

  return (
    <MainLayout>
      <div className="p-6">
        <header className="mb-8">
          <h1 className="text-[36px] font-bold text-black font-rubik">ADD RECORD</h1>
          <p className="text-[15px] text-gray-400 font-rubik">Add a new record of your pet care</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Pet Selection Buttons */}
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {pets.map((pet) => (
              <button
                key={pet.id}
                type="button"
                onClick={() => setSelectedPet(pet.name)}
                className={`py-3 px-6 rounded-full border whitespace-nowrap font-poppins text-[12px] ${
                  selectedPet === pet.name
                    ? "bg-petapp-orange border-petapp-orange/70 text-black"
                    : "bg-white border-petapp-orange/30 text-black"
                }`}
              >
                {pet.name}
              </button>
            ))}
          </div>

          {/* Pet Care Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">
              Pet Care Type
            </label>
            <div className="relative">
              <select
                value={selectedCareType}
                onChange={(e) => setSelectedCareType(e.target.value)}
                className="h-12 w-full appearance-none rounded-lg border border-gray-200 bg-white pl-10 pr-10 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petapp-green"
              >
                {careTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
              
              {/* Display selected care type icon on the left side of the select */}
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                {(() => {
                  const selectedType = careTypes.find(type => type.value === selectedCareType);
                  const Icon = selectedType?.icon || Home;
                  return <Icon className="h-4 w-4 text-gray-500" />;
                })()}
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">
              Location
            </label>
            <InputCustom
              placeholder="Amore BSD"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="h-12 rounded-lg"
            />
          </div>

          {/* Record Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">
              Record Date
            </label>
            <DatePicker
              value={recordDate}
              onChange={setRecordDate}
              placeholder="dd/mm/yyyy"
              id="date-picker-trigger"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 font-poppins">
              Notes
            </label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[200px] rounded-lg border border-gray-200 p-3 focus-visible:ring-2 focus-visible:ring-petapp-green"
              placeholder=""
            />
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full py-4 bg-petapp-teal text-white font-bold rounded-lg"
          >
            Save Record
          </button>
        </form>
      </div>
    </MainLayout>
  );
};

export default AddRecord;
