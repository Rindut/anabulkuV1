
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { PetAvatar } from "@/components/avatars/PetAvatar";
import { Pet3DAvatar } from "@/components/avatars/Pet3DAvatar";
import { Switch } from "@/components/ui/switch";
import { ButtonCustom } from "@/components/ui/button-custom";
import { usePets, type Pet } from "@/hooks/usePets";
import { toast } from "@/hooks/use-toast";

const PetDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPet, updatePet } = usePets();
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (id) {
      fetchPetDetails(id);
    }
  }, [id]);

  const fetchPetDetails = async (petId: string) => {
    setLoading(true);
    const petData = await getPet(petId);
    if (petData) {
      setPet(petData);
      setActive(petData.active);
    } else {
      toast({
        title: "Error",
        description: "Pet not found",
        variant: "destructive",
      });
      navigate("/pets");
    }
    setLoading(false);
  };

  const handleEditPet = () => {
    if (pet) {
      navigate(`/edit-pet/${pet.id}`);
    }
  };

  const handleActiveToggle = async (checked: boolean) => {
    if (pet) {
      setActive(checked);
      await updatePet(pet.id, { active: checked });
      toast({
        title: "Pet status updated",
        description: `${pet.name} is now ${checked ? 'active' : 'inactive'}`,
      });
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="p-6 flex justify-center items-center h-[80vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-petapp-teal"></div>
        </div>
      </MainLayout>
    );
  }

  if (!pet) {
    return (
      <MainLayout>
        <div className="p-6">
          <h1 className="text-2xl font-bold">Pet not found</h1>
          <p className="mt-4">The pet you're looking for doesn't exist or has been removed.</p>
          <ButtonCustom className="mt-6" onClick={() => navigate("/pets")}>
            Back to Pets
          </ButtonCustom>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="p-6 pb-24 bg-gray-50">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-[36px] font-bold font-rubik text-black tracking-tight">
            Pet Details
          </h1>
          <p className="text-[15px] font-rubik text-gray-400 mt-1">
            Manage your pet's information
          </p>
        </header>

        {/* Pet Avatar and Name */}
        <div className="flex flex-col items-center mb-8">
          {pet.pet_type === 'cat' ? (
            <PetAvatar 
              size="lg" 
              petType={pet.pet_type} 
              gender={pet.gender as "male" | "female"} 
            />
          ) : (
            <Pet3DAvatar 
              size="xl" 
              petType={pet.pet_type as "cat" | "dog"} 
              gender={pet.gender === "male" ? "Male" : "Female"} 
            />
          )}
          <h2 className="text-2xl font-bold mt-4 font-poppins">{pet.name}</h2>
        </div>

        {/* Pet Details */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
          <h3 className="text-lg font-semibold mb-4 font-poppins">Pet Information</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Type</span>
              <span className="font-medium capitalize">{pet.pet_type}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Gender</span>
              <span className="font-medium capitalize">{pet.gender}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Age</span>
              <span className="font-medium">{pet.age} years</span>
            </div>
            
            {pet.breed && (
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Breed</span>
                <span className="font-medium">{pet.breed}</span>
              </div>
            )}
            
            {pet.vaccination && (
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Vaccination</span>
                <span className="font-medium">{pet.vaccination}</span>
              </div>
            )}
          </div>
        </div>

        {/* Active Status */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold font-poppins">Active Status</h3>
              <p className="text-sm text-gray-500 mt-1">
                Toggle to set this pet as active or inactive
              </p>
            </div>
            <Switch 
              checked={active} 
              onCheckedChange={handleActiveToggle} 
              className="data-[state=checked]:bg-petapp-teal"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <ButtonCustom
            onClick={handleEditPet}
            className="w-full bg-petapp-teal text-white"
          >
            Edit Pet
          </ButtonCustom>
          
          <ButtonCustom
            onClick={() => navigate("/pets")}
            variant="outline"
            className="w-full"
          >
            Back to Pets
          </ButtonCustom>
        </div>
      </div>
    </MainLayout>
  );
};

export default PetDetails;
