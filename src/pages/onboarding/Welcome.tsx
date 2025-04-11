
import { useNavigate } from "react-router-dom";
import { ButtonCustom } from "@/components/ui/button-custom";

const Welcome = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-petapp-green/20">
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <h1 className="text-3xl font-bold text-center mb-4">
          Welcome to AnaBulku!
        </h1>
        
        <div className="bg-petapp-peach rounded-2xl p-6 shadow-md w-full max-w-sm mb-8">
          <div className="w-full h-48 bg-petapp-pink/50 rounded-xl flex items-center justify-center mb-4">
            {/* This is where we'd display a 3D illustration */}
            <span className="text-6xl">🐈 👧 👦 🐕</span>
          </div>
          <p className="text-center text-gray-700">
            The perfect place to track and manage your pet family!
          </p>
        </div>
        
        <p className="text-center text-gray-600 mb-8">
          We'll help you create your pet family and keep track of all your 
          furry friends' needs.
        </p>

        <ButtonCustom 
          onClick={() => navigate("/onboarding/create-parent")}
          size="lg"
          fullWidth
          className="max-w-xs"
        >
          START
        </ButtonCustom>
      </div>
    </div>
  );
};

export default Welcome;
