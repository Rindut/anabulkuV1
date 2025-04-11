
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonCustom } from "@/components/ui/button-custom";
import { InputCustom } from "@/components/ui/input-custom";
import { ParentAvatar } from "@/components/avatars/ParentAvatar";

const CreateParent = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [gender, setGender] = useState<"boy" | "girl">("boy");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here we would store the parent data in a real app
    navigate("/onboarding/parent-created");
  };
  
  return (
    <div className="min-h-screen flex flex-col p-6 bg-petapp-green/20">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">Let's get to know you first!</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <InputCustom
          label="Parent's Name"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        
        <div>
          <p className="block text-sm font-medium text-gray-700 mb-3">Gender</p>
          <div className="flex justify-center gap-8">
            <div 
              className={`flex flex-col items-center ${gender === "boy" ? "opacity-100" : "opacity-60"}`}
              onClick={() => setGender("boy")}
            >
              <ParentAvatar gender="boy" size="md" />
              <span className="mt-2 text-sm font-medium">Boy</span>
              <div className={`mt-2 h-2 w-2 rounded-full ${gender === "boy" ? "bg-petapp-green" : "bg-gray-300"}`}></div>
            </div>
            
            <div 
              className={`flex flex-col items-center ${gender === "girl" ? "opacity-100" : "opacity-60"}`}
              onClick={() => setGender("girl")}
            >
              <ParentAvatar gender="girl" size="md" />
              <span className="mt-2 text-sm font-medium">Girl</span>
              <div className={`mt-2 h-2 w-2 rounded-full ${gender === "girl" ? "bg-petapp-green" : "bg-gray-300"}`}></div>
            </div>
          </div>
        </div>
        
        <div className="mt-auto pt-6">
          <ButtonCustom type="submit" fullWidth>
            Create Parent's Profile
          </ButtonCustom>
        </div>
      </form>
    </div>
  );
};

export default CreateParent;
