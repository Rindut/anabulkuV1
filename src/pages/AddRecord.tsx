
import { useState } from "react";
import { ChevronDown } from "lucide-react";
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

// Care type options
const careTypes = [
  { value: "vet", label: "Vet Visit" },
  { value: "grooming", label: "Grooming" },
  { value: "deworming", label: "Deworming" },
  { value: "vaccine", label: "Vaccine" },
  { value: "pethotel", label: "Pet Hotel" },
];

const AddRecord = () => {
  const [selectedPet, setSelectedPet] = useState<string>("Chia");
  const [selectedCareType, setSelectedCareType] = useState<string>("vet");
  const [location, setLocation] = useState<string>("");
  const [recordDate, setRecordDate] = useState<Date | undefined>(undefined);
  const [notes, setNotes] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic
    console.log({
      pet: selectedPet,
      careType: selectedCareType,
      location,
      recordDate,
      notes,
    });
    alert("Record saved!");
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
                    ? "bg-amber-200 border-amber-300 text-black"
                    : "bg-white border-petapp-pink text-black"
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
                className="h-12 w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 py-2 pr-10 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petapp-green"
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
            className="w-full py-4 bg-[#5E9E94] text-white font-bold rounded-lg"
          >
            Save Record
          </button>
        </form>
      </div>
    </MainLayout>
  );
};

export default AddRecord;
