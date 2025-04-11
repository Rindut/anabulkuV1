
import { useNavigate } from "react-router-dom";
import { ButtonCustom } from "@/components/ui/button-custom";

const ParentCreated = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-petapp-green/20">
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <h1 className="text-3xl font-bold text-center mb-4">
          Yay! Now you have a profile!
        </h1>
        
        <div className="bg-petapp-peach rounded-2xl p-6 shadow-md w-full max-w-sm mb-8">
          <div className="w-full h-48 bg-petapp-pink/50 rounded-xl flex items-center justify-center mb-4">
            {/* This is where we'd display a 3D illustration */}
            <span className="text-6xl">👦 🐈 🐕</span>
          </div>
        </div>

        <ButtonCustom 
          onClick={() => navigate("/onboarding/create-pet")}
          size="lg"
          fullWidth
          className="max-w-xs"
        >
          Create Pet Family
        </ButtonCustom>
      </div>
    </div>
  );
};

export default ParentCreated;
