
import { useNavigate } from "react-router-dom";
import { ButtonCustom } from "@/components/ui/button-custom";
import { ArrowLeft } from "lucide-react";

const PetCreated = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col p-4 sm:p-6 bg-white">
      
      <button 
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 text-gray-600"
        aria-label="Go back"
      >
        <ArrowLeft size={24} />
      </button>
      
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <h1 className="text-xl font-semibold text-center text-[#304352] mb-8">
          Yay! Thanks for filling up your pet's data!
        </h1>
        
        <div className="w-full max-w-xs mb-8">
          <img 
            src="/lovable-uploads/87cc266f-0d21-47fc-9c24-6c582fe94a42.png" 
            alt="Happy family with pets"
            className="w-full object-contain" 
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEyIDEyQzEyIDEyIDEyIDEyIDEyIDEyQzEyIDEyIDEyIDEyIDEyIDEyWiIgZmlsbD0icmVkIi8+PC9zdmc+";
            }}
          />
        </div>

        <ButtonCustom 
          onClick={() => navigate("/")}
          size="lg"
          fullWidth
          className="max-w-xs rounded-lg bg-petapp-green text-white"
        >
          Go to Your Pet's Family
        </ButtonCustom>
      </div>
      
      {/* Bottom indicator dot */}
      <div className="flex justify-center mt-8 mb-4">
        <div className="w-16 h-1 bg-black rounded-full"></div>
      </div>
    </div>
  );
};

export default PetCreated;
