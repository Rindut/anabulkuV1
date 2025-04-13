
import { useNavigate } from "react-router-dom";
import { ButtonCustom } from "@/components/ui/button-custom";

const Welcome = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col p-4 sm:p-6 bg-petapp-mint">
      
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <h1 className="text-2xl font-bold text-center mb-5 text-[#304352]">
          Welcome to Anabulku!
        </h1>
        
        <div className="w-full max-w-xs mb-6">
          <img 
            src="/lovable-uploads/8a1fae44-56a0-48e7-944c-e7c3a064c58d.png" 
            alt="Happy family with pets"
            className="w-full object-contain" 
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEyIDEyQzEyIDEyIDEyIDEyIDEyIDEyQzEyIDEyIDEyIDEyIDEyIDEyWiIgZmlsbD0icmVkIi8+PC9zdmc+";
            }}
          />
        </div>
        
        <p className="text-center text-gray-600 mb-8 max-w-xs">
          So happy you're here! We'll help you keep track of your pet's health, wellness, and little daily things. Let's start! 🌿
        </p>

        <ButtonCustom 
          onClick={() => navigate("/onboarding/create-parent")}
          size="lg"
          fullWidth
          className="max-w-xs rounded-lg bg-petapp-green text-white"
        >
          Start
        </ButtonCustom>
      </div>
      
      {/* Bottom indicator dot */}
      <div className="flex justify-center mt-8 mb-4">
        <div className="w-16 h-1 bg-black rounded-full"></div>
      </div>
    </div>
  );
};

export default Welcome;
