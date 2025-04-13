
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { ButtonCustom } from "@/components/ui/button-custom";
import { PetAvatar } from "@/components/avatars/PetAvatar";
import { ChevronRight, Plus } from "lucide-react";

// Mock data for pet list
const petsList = [
  {
    id: 1,
    name: "Whiskers",
    type: "Cat",
    petType: "cat",
    gender: "male"
  },
  {
    id: 2,
    name: "Buddy",
    type: "Dog",
    petType: "dog",
    gender: "male"
  },
  {
    id: 3,
    name: "Fluffy",
    type: "Rabbit",
    petType: "cat", // Using cat avatar for rabbits as fallback
    gender: "female"
  }
];

const Pets = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
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
          {petsList.map((pet) => (
            <div 
              key={pet.id}
              className="bg-white rounded-2xl shadow-sm overflow-hidden p-4 flex items-center justify-between cursor-pointer"
              onClick={() => console.log(`View pet details for ${pet.name}`)}
            >
              <div className="flex items-center space-x-4">
                <PetAvatar 
                  petType={pet.petType as "cat" | "dog"} 
                  gender={pet.gender as "male" | "female"}
                  size="sm"
                />
                <div>
                  <h3 className="font-medium text-gray-800 font-rubik">{pet.name}</h3>
                  <p className="text-sm text-gray-500">{pet.type}</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          ))}

          {/* Empty state if no pets */}
          {petsList.length === 0 && (
            <div className="bg-white rounded-2xl p-8 text-center">
              <p className="text-gray-500 mb-4">You haven't added any pets yet.</p>
            </div>
          )}
        </div>

        {/* Add Pet Button */}
        <div className="pt-6 mt-6">
          <ButtonCustom 
            className="w-full bg-green-500 hover:bg-green-600 text-white"
            fullWidth
            onClick={() => handleNavigation("/add-pet")}
          >
            <Plus className="h-5 w-5 mr-2" />
            Add New Pet
          </ButtonCustom>
        </div>
      </div>
    </MainLayout>
  );
};

export default Pets;
