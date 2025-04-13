
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import { PetAvatar } from "@/components/avatars/PetAvatar";
import { Pet3DAvatar } from "@/components/avatars/Pet3DAvatar";
import { usePets, type Pet } from "@/hooks/usePets";
import { toast } from "@/hooks/use-toast";

const EditPet = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPet, updatePet } = usePets();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<Pet>>({
    name: "",
    pet_type: "cat",
    gender: "male",
    age: 0,
    breed: "",
    vaccination: "",
    active: true
  });

  useEffect(() => {
    if (id) {
      fetchPetDetails(id);
    }
  }, [id]);

  const fetchPetDetails = async (petId: string) => {
    setLoading(true);
    const petData = await getPet(petId);
    if (petData) {
      setFormData(petData);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'age' ? parseInt(value) || 0 : value }));
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    
    try {
      setSaving(true);
      
      // Validate form data
      if (!formData.name || !formData.pet_type || !formData.gender || formData.age === undefined) {
        throw new Error("Please fill all required fields");
      }
      
      const updatedPet = await updatePet(id, formData);
      
      if (updatedPet) {
        toast({
          title: "Success",
          description: "Pet updated successfully",
        });
        navigate(`/pet-details/${id}`);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update pet",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
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

  return (
    <MainLayout>
      <div className="p-6 pb-24 bg-gray-50">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-[36px] font-bold font-rubik text-black tracking-tight">
            Edit Pet
          </h1>
          <p className="text-[15px] font-rubik text-gray-400 mt-1">
            Update your pet's information
          </p>
        </header>

        {/* Pet Avatar Preview */}
        <div className="flex flex-col items-center mb-8">
          {formData.pet_type === 'cat' ? (
            <PetAvatar 
              size="lg" 
              petType={formData.pet_type as "cat" | "dog"} 
              gender={formData.gender as "male" | "female"} 
            />
          ) : (
            <Pet3DAvatar 
              size="lg" 
              petType={formData.pet_type as "cat" | "dog"} 
              gender={formData.gender === "male" ? "Male" : "Female"} 
            />
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputCustom
            label="Pet Name"
            name="name"
            value={formData.name || ""}
            onChange={handleInputChange}
            placeholder="Enter pet's name"
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pet Type
            </label>
            <Select 
              value={formData.pet_type} 
              onValueChange={(value) => handleSelectChange("pet_type", value)}
              disabled
            >
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
            <p className="text-xs text-gray-500 mt-1">Pet type cannot be changed</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender
            </label>
            <Select 
              value={formData.gender} 
              onValueChange={(value) => handleSelectChange("gender", value)}
            >
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
            value={formData.age?.toString() || ""}
            onChange={handleInputChange}
            placeholder="Enter pet's age"
            required
            min={0}
          />

          <InputCustom
            label="Breed (optional)"
            name="breed"
            value={formData.breed || ""}
            onChange={handleInputChange}
            placeholder="Enter pet's breed"
          />

          <InputCustom
            label="Vaccination Info (optional)"
            name="vaccination"
            value={formData.vaccination || ""}
            onChange={handleInputChange}
            placeholder="Enter vaccination information"
          />

          {/* Buttons */}
          <div className="pt-6 space-y-4">
            <ButtonCustom 
              type="submit" 
              className="w-full bg-petapp-teal text-white font-bold rounded-lg"
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Changes"}
            </ButtonCustom>
            
            <ButtonCustom 
              type="button" 
              variant="outline"
              className="w-full"
              onClick={() => navigate(`/pet-details/${id}`)}
            >
              Cancel
            </ButtonCustom>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default EditPet;
