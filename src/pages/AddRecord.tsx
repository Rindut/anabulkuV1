
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { InputCustom } from "@/components/ui/input-custom";
import { ButtonCustom } from "@/components/ui/button-custom";
import { Check } from "lucide-react";

const careTypes = [
  { id: "vet", label: "Vet Visit" },
  { id: "grooming", label: "Grooming" },
  { id: "deworming", label: "Deworming" },
  { id: "vaccine", label: "Vaccine" },
];

const pets = [
  { id: 1, name: "Kitty" },
  { id: 2, name: "Max" },
  { id: 3, name: "Luna" },
];

const AddRecord = () => {
  const [selectedPet, setSelectedPet] = useState("");
  const [selectedCareTypes, setSelectedCareTypes] = useState<string[]>([]);
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");

  const toggleCareType = (id: string) => {
    if (selectedCareTypes.includes(id)) {
      setSelectedCareTypes(selectedCareTypes.filter(type => type !== id));
    } else {
      setSelectedCareTypes([...selectedCareTypes, id]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic
    alert("Record saved!");
  };

  return (
    <MainLayout>
      <div className="p-6">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">ADD RECORD</h1>
          <p className="text-sm text-gray-500">Create a new pet care record</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pet Care Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              {careTypes.map((care) => (
                <div
                  key={care.id}
                  className={`p-3 rounded-lg border flex items-center ${
                    selectedCareTypes.includes(care.id)
                      ? "border-petapp-green bg-petapp-green/10"
                      : "border-gray-200"
                  }`}
                  onClick={() => toggleCareType(care.id)}
                >
                  <div 
                    className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center ${
                      selectedCareTypes.includes(care.id)
                        ? "bg-petapp-green"
                        : "bg-gray-200"
                    }`}
                  >
                    {selectedCareTypes.includes(care.id) && (
                      <Check className="w-3 h-3 text-white" />
                    )}
                  </div>
                  <span className="text-sm">{care.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Pet
            </label>
            <select
              value={selectedPet}
              onChange={(e) => setSelectedPet(e.target.value)}
              className="w-full rounded-lg border border-gray-200 p-3"
              required
            >
              <option value="" disabled>
                Select a pet
              </option>
              {pets.map((pet) => (
                <option key={pet.id} value={pet.id}>
                  {pet.name}
                </option>
              ))}
            </select>
          </div>

          <InputCustom
            label="Location (optional)"
            placeholder="e.g., Happy Pets Clinic"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full rounded-lg border border-gray-200 p-3 min-h-[100px]"
              placeholder="Any additional notes..."
            />
          </div>

          <ButtonCustom type="submit" fullWidth>
            Save Record
          </ButtonCustom>
        </form>
      </div>
    </MainLayout>
  );
};

export default AddRecord;
