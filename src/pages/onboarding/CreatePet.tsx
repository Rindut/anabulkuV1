
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonCustom } from "@/components/ui/button-custom";
import { InputCustom } from "@/components/ui/input-custom";
import { PetAvatar } from "@/components/avatars/PetAvatar";

const CreatePet = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [petType, setPetType] = useState<"cat" | "dog">("cat");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [age, setAge] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/onboarding/pet-created");
  };
  
  return (
    <div className="min-h-screen flex flex-col p-6 bg-petapp-green/20">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">What is your pet's name?</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <InputCustom
          label="Pet's Name"
          placeholder="Fluffy"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        
        <div>
          <p className="block text-sm font-medium text-gray-700 mb-3">Pet Type</p>
          <div className="flex justify-center gap-8">
            <div 
              className={`flex flex-col items-center ${petType === "cat" ? "opacity-100" : "opacity-60"}`}
              onClick={() => setPetType("cat")}
            >
              <PetAvatar petType="cat" size="md" gender={gender} />
              <span className="mt-2 text-sm font-medium">Cat</span>
              <div className={`mt-2 h-2 w-2 rounded-full ${petType === "cat" ? "bg-petapp-green" : "bg-gray-300"}`}></div>
            </div>
            
            <div 
              className={`flex flex-col items-center ${petType === "dog" ? "opacity-100" : "opacity-60"}`}
              onClick={() => setPetType("dog")}
            >
              <PetAvatar petType="dog" size="md" gender={gender} />
              <span className="mt-2 text-sm font-medium">Dog</span>
              <div className={`mt-2 h-2 w-2 rounded-full ${petType === "dog" ? "bg-petapp-green" : "bg-gray-300"}`}></div>
            </div>
          </div>
        </div>
        
        <div>
          <p className="block text-sm font-medium text-gray-700 mb-3">{name ? `${name}'s` : "Pet's"} gender is</p>
          <div className="flex justify-center gap-8">
            <div 
              className={`flex flex-col items-center ${gender === "male" ? "opacity-100" : "opacity-60"}`}
              onClick={() => setGender("male")}
            >
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">♂️</span>
              </div>
              <span className="mt-2 text-sm font-medium">Male</span>
              <div className={`mt-2 h-2 w-2 rounded-full ${gender === "male" ? "bg-petapp-green" : "bg-gray-300"}`}></div>
            </div>
            
            <div 
              className={`flex flex-col items-center ${gender === "female" ? "opacity-100" : "opacity-60"}`}
              onClick={() => setGender("female")}
            >
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">♀️</span>
              </div>
              <span className="mt-2 text-sm font-medium">Female</span>
              <div className={`mt-2 h-2 w-2 rounded-full ${gender === "female" ? "bg-petapp-green" : "bg-gray-300"}`}></div>
            </div>
          </div>
        </div>
        
        <div>
          <p className="block text-sm font-medium text-gray-700 mb-3">{name ? `${name}'s` : "Pet's"} age is</p>
          <div className="flex justify-center">
            <InputCustom
              type="number"
              placeholder="Years"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              className="w-32 text-center"
            />
          </div>
        </div>
        
        <div className="mt-auto pt-6">
          <ButtonCustom type="submit" fullWidth>
            Create Pet's Profile
          </ButtonCustom>
        </div>
      </form>
    </div>
  );
};

export default CreatePet;
