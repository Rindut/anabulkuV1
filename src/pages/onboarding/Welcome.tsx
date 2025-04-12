
import { useNavigate } from "react-router-dom";
import { ButtonCustom } from "@/components/ui/button-custom";

const Welcome = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col p-6 bg-petapp-mint">
      {/* Status bar mockup */}
      <div className="flex justify-between text-xs text-gray-500 mb-4">
        <span>00:00</span>
        <div className="flex items-center gap-1">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 10C18 13.3137 15.3137 16 12 16C8.68629 16 6 13.3137 6 10C6 6.68629 8.68629 4 12 4C15.3137 4 18 6.68629 18 10Z" fill="currentColor"/>
          </svg>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5Z" fill="currentColor"/>
          </svg>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <h1 className="text-2xl font-bold text-center mb-5 text-[#304352]">
          Welcome to Anabulku!
        </h1>
        
        <div className="w-full max-w-xs mb-6">
          <img 
            src="/lovable-uploads/81c3c494-0f56-4e8e-95b6-483f42e9ea69.png" 
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
