
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { ButtonCustom } from "@/components/ui/button-custom";
import { PetAvatar } from "@/components/avatars/PetAvatar";
import { ChevronRight, Plus, X, Check, Pencil } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { InputCustom } from "@/components/ui/input-custom";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface Pet {
  id: number;
  name: string;
  type: string;
  petType: string;
  gender: string;
  age: number;
  breed: string;
  vaccination: string;
  active: boolean;
}

interface NewPet {
  name: string;
  petType: string;
  gender: string;
  age: number;
  breed: string;
  vaccination: string;
  active: boolean;
}

// Mock data for pet list
const petsList: Pet[] = [
  {
    id: 1,
    name: "Wijen",
    type: "Cat",
    petType: "cat",
    gender: "male",
    age: 3,
    breed: "Mixed",
    vaccination: "Completed",
    active: true
  },
  {
    id: 2,
    name: "Chia",
    type: "Cat",
    petType: "cat",
    gender: "female",
    age: 1,
    breed: "Domestic",
    vaccination: "Ongoing",
    active: true
  },
  {
    id: 3,
    name: "Oreo",
    type: "Dog",
    petType: "dog",
    gender: "male",
    age: 2,
    breed: "Poodle",
    vaccination: "Completed",
    active: true
  },
  {
    id: 4,
    name: "Kunyit",
    type: "Dog",
    petType: "dog",
    gender: "female",
    age: 4,
    breed: "Golden Retriever",
    vaccination: "Completed",
    active: true
  }
];

const Pets = () => {
  const [pets, setPets] = useState<Pet[]>(petsList);
  const [showAddPetDialog, setShowAddPetDialog] = useState(false);
  const [showEditPetDialog, setShowEditPetDialog] = useState(false);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [newPet, setNewPet] = useState<NewPet>({
    name: "",
    petType: "cat",
    gender: "male",
    age: 0,
    breed: "",
    vaccination: "",
    active: true
  });

  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleViewPetDetails = (pet: Pet) => {
    setSelectedPet(pet);
    setShowEditPetDialog(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (selectedPet) {
      // Update selected pet if in edit mode
      if (name === 'age') {
        setSelectedPet({
          ...selectedPet,
          [name]: Number(value) || 0
        });
      } else {
        setSelectedPet({
          ...selectedPet,
          [name]: value
        });
      }
    } else {
      // Update new pet if in add mode
      if (name === 'age') {
        setNewPet({
          ...newPet,
          [name]: Number(value) || 0
        });
      } else {
        setNewPet({
          ...newPet,
          [name]: value
        });
      }
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    if (selectedPet) {
      // Update selected pet if in edit mode
      setSelectedPet({
        ...selectedPet,
        [name]: value
      });
    } else {
      // Update new pet if in add mode
      setNewPet({
        ...newPet,
        [name]: value
      });
    }
  };

  const handleSwitchChange = (checked: boolean) => {
    if (selectedPet) {
      setSelectedPet({
        ...selectedPet,
        active: checked
      });
    } else {
      setNewPet({
        ...newPet,
        active: checked
      });
    }
  };

  const handleSavePet = () => {
    if (selectedPet) {
      // Update existing pet
      setPets(prev => prev.map(p => p.id === selectedPet.id ? selectedPet : p));
      setShowEditPetDialog(false);
    } else {
      // Add new pet
      const id = Math.max(0, ...pets.map(p => p.id)) + 1;
      const type = newPet.petType === "cat" ? "Cat" : "Dog";
      
      const newPetEntry: Pet = {
        id,
        type,
        petType: newPet.petType,
        name: newPet.name,
        gender: newPet.gender,
        age: newPet.age,
        breed: newPet.breed,
        vaccination: newPet.vaccination,
        active: newPet.active
      };
      
      setPets([...pets, newPetEntry]);
      setShowAddPetDialog(false);
      
      // Reset new pet form
      setNewPet({
        name: "",
        petType: "cat",
        gender: "male",
        age: 0,
        breed: "",
        vaccination: "",
        active: true
      });
    }
  };

  const isFormValid = () => {
    const pet = selectedPet || newPet;
    return pet.name && pet.petType && pet.gender && pet.age > 0;
  };

  return (
    <MainLayout>
      <div className="p-6 pb-24 bg-gray-50">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-[36px] font-bold font-rubik text-black tracking-tight">My Pets</h1>
        </header>

        {/* Pet List */}
        <div className="space-y-4">
          {pets.map((pet) => (
            <div 
              key={pet.id}
              className={`bg-white rounded-2xl shadow-sm overflow-hidden p-4 flex items-center justify-between cursor-pointer ${!pet.active ? 'opacity-50' : ''}`}
              onClick={() => handleViewPetDetails(pet)}
            >
              <div className="flex items-center space-x-4">
                <PetAvatar 
                  petType={pet.petType as "cat" | "dog"} 
                  gender={pet.gender as "male" | "female"}
                  size="sm"
                />
                <div>
                  <h3 className="font-medium text-gray-800 font-rubik">{pet.name}</h3>
                  <p className="text-sm text-gray-500">{pet.type} • {pet.age} yo</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          ))}

          {/* Empty state if no pets */}
          {pets.length === 0 && (
            <div className="bg-white rounded-2xl p-8 text-center">
              <p className="text-gray-500 mb-4">You haven't added any pets yet.</p>
            </div>
          )}
        </div>

        {/* Add Pet Button */}
        <div className="pt-6 mt-6">
          <ButtonCustom 
            className="w-full bg-[#43978D] hover:bg-[#3a847a] text-white"
            fullWidth
            onClick={() => setShowAddPetDialog(true)}
          >
            <Plus className="h-5 w-5 mr-2" />
            Add New Pet
          </ButtonCustom>
        </div>

        {/* Add Pet Dialog */}
        <Dialog open={showAddPetDialog} onOpenChange={setShowAddPetDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Add New Pet</DialogTitle>
              <DialogDescription>
                Enter your pet's information below
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <InputCustom
                label="Pet Name"
                name="name"
                value={newPet.name}
                onChange={handleInputChange}
                placeholder="Enter pet name"
                required
              />

              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pet Type <span className="text-red-500">*</span>
                </label>
                <Select onValueChange={(value) => handleSelectChange("petType", value)} value={newPet.petType}>
                  <SelectTrigger className="h-12 rounded-lg">
                    <SelectValue placeholder="Select pet type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="cat">Cat</SelectItem>
                      <SelectItem value="dog">Dog</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender <span className="text-red-500">*</span>
                </label>
                <Select onValueChange={(value) => handleSelectChange("gender", value)} value={newPet.gender}>
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
                label="Age (years)"
                name="age"
                type="number"
                value={newPet.age.toString()}
                onChange={handleInputChange}
                placeholder="Enter age in years"
                required
              />

              <InputCustom
                label="Breed (optional)"
                name="breed"
                value={newPet.breed}
                onChange={handleInputChange}
                placeholder="Enter breed"
              />

              <InputCustom
                label="Vaccination Info (optional)"
                name="vaccination"
                value={newPet.vaccination}
                onChange={handleInputChange}
                placeholder="Enter vaccination details"
              />
            </div>
            <DialogFooter>
              <ButtonCustom
                type="button"
                variant="outline"
                onClick={() => setShowAddPetDialog(false)}
              >
                Cancel
              </ButtonCustom>
              <ButtonCustom
                type="button"
                onClick={handleSavePet}
                disabled={!isFormValid()}
                className="bg-petapp-teal text-white font-bold rounded-lg"
              >
                Save Pet
              </ButtonCustom>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Pet Dialog */}
        <Dialog open={showEditPetDialog} onOpenChange={setShowEditPetDialog}>
          <DialogContent className="sm:max-w-md">
            {selectedPet && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-xl font-bold">Pet Details</DialogTitle>
                  <DialogDescription>
                    View or edit your pet's information
                  </DialogDescription>
                </DialogHeader>
                <div className="flex justify-center my-4">
                  <PetAvatar 
                    petType={selectedPet.petType as "cat" | "dog"} 
                    gender={selectedPet.gender as "male" | "female"}
                    size="lg"
                  />
                </div>
                <div className="space-y-4 py-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="pet-active" className="font-medium">Pet Active</Label>
                    <Switch
                      id="pet-active"
                      checked={selectedPet.active}
                      onCheckedChange={handleSwitchChange}
                    />
                  </div>

                  <InputCustom
                    label="Pet Name"
                    name="name"
                    value={selectedPet.name}
                    onChange={handleInputChange}
                    placeholder="Enter pet name"
                    required
                  />

                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Pet Type <span className="text-red-500">*</span>
                    </label>
                    <Select onValueChange={(value) => handleSelectChange("petType", value)} value={selectedPet.petType}>
                      <SelectTrigger className="h-12 rounded-lg">
                        <SelectValue placeholder="Select pet type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="cat">Cat</SelectItem>
                          <SelectItem value="dog">Dog</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="w-full">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender <span className="text-red-500">*</span>
                    </label>
                    <Select onValueChange={(value) => handleSelectChange("gender", value)} value={selectedPet.gender}>
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
                    label="Age (years)"
                    name="age"
                    type="number"
                    value={selectedPet.age.toString()}
                    onChange={handleInputChange}
                    placeholder="Enter age in years"
                    required
                  />

                  <InputCustom
                    label="Breed (optional)"
                    name="breed"
                    value={selectedPet.breed}
                    onChange={handleInputChange}
                    placeholder="Enter breed"
                  />

                  <InputCustom
                    label="Vaccination Info (optional)"
                    name="vaccination"
                    value={selectedPet.vaccination}
                    onChange={handleInputChange}
                    placeholder="Enter vaccination details"
                  />
                </div>
                <DialogFooter>
                  <ButtonCustom
                    type="button"
                    variant="outline"
                    onClick={() => setShowEditPetDialog(false)}
                  >
                    Cancel
                  </ButtonCustom>
                  <ButtonCustom
                    type="button"
                    onClick={handleSavePet}
                    disabled={!isFormValid()}
                    className="bg-petapp-teal text-white font-bold rounded-lg"
                  >
                    Save Pet
                  </ButtonCustom>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
};

export default Pets;
