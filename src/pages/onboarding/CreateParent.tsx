
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonCustom } from "@/components/ui/button-custom";
import { ArrowLeft } from "lucide-react";

const CreateParent = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [gender, setGender] = useState<"Male" | "Female">("Male");
  const [isFormValid, setIsFormValid] = useState(false);
  
  // Validate form whenever name or gender changes
  useEffect(() => {
    setIsFormValid(name.trim() !== "");
  }, [name, gender]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      // Store parent info in localStorage
      localStorage.setItem("parentName", name);
      localStorage.setItem("parentGender", gender);
      navigate("/onboarding/parent-created");
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col p-6 bg-white">
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
      
      <button 
        onClick={() => navigate(-1)}
        className="absolute top-14 left-4 text-gray-600"
        aria-label="Go back"
      >
        <ArrowLeft size={24} />
      </button>

      <div className="text-center mb-8 mt-6">
        <h1 className="text-xl font-semibold text-[#304352]">Let's get to know you first!</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-4">
        <div>
          <p className="text-sm text-gray-700 mb-1">Pawrent's Name</p>
          <input
            type="text"
            className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-petapp-green"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
        <div>
          <p className="block text-sm text-gray-700 mb-3">Gender</p>
          <div className="flex justify-center gap-8">
            <div 
              className={`flex flex-col items-center cursor-pointer ${gender === "Female" ? "opacity-100" : "opacity-60"}`}
              onClick={() => setGender("Female")}
            >
              <div className="w-24 h-36 bg-white border rounded-lg p-1 flex items-center justify-center">
                <img 
                  src="/lovable-uploads/81c3c494-0f56-4e8e-95b6-483f42e9ea69.png" 
                  alt="Female avatar"
                  className="h-32 object-contain" 
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEyIDEyQzEyIDEyIDEyIDEyIDEyIDEyQzEyIDEyIDEyIDEyIDEyIDEyWiIgZmlsbD0icmVkIi8+PC9zdmc+";
                  }}
                />
              </div>
              <span className="mt-2 text-sm font-medium">Female</span>
              <div className={`mt-1 w-full h-8 rounded-full ${gender === "Female" ? "border-2 border-petapp-green" : "border border-gray-300"}`}></div>
            </div>
            
            <div 
              className={`flex flex-col items-center cursor-pointer ${gender === "Male" ? "opacity-100" : "opacity-60"}`}
              onClick={() => setGender("Male")}
            >
              <div className="w-24 h-36 bg-white border rounded-lg p-1 flex items-center justify-center">
                <img 
                  src="/lovable-uploads/81c3c494-0f56-4e8e-95b6-483f42e9ea69.png" 
                  alt="Male avatar"
                  className="h-32 object-contain" 
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEyIDEyQzEyIDEyIDEyIDEyIDEyIDEyQzEyIDEyIDEyIDEyIDEyIDEyWiIgZmlsbD0icmVkIi8+PC9zdmc+";
                  }}
                />
              </div>
              <span className="mt-2 text-sm font-medium">Male</span>
              <div className={`mt-1 w-full h-8 rounded-full ${gender === "Male" ? "border-2 border-petapp-green" : "border border-gray-300"}`}></div>
            </div>
          </div>
        </div>
        
        <div className="mt-auto pt-6">
          <ButtonCustom 
            type="submit" 
            disabled={!isFormValid}
            className={`rounded-lg ${!isFormValid ? 'bg-gray-300 text-gray-500' : 'bg-petapp-green text-white'}`}
            fullWidth
          >
            Create Pawrent's Profile
          </ButtonCustom>
        </div>
      </form>
      
      {/* Bottom indicator dot */}
      <div className="flex justify-center mt-8 mb-4">
        <div className="w-16 h-1 bg-black rounded-full"></div>
      </div>
    </div>
  );
};

export default CreateParent;
