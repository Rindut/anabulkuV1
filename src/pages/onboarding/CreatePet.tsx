
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonCustom } from "@/components/ui/button-custom";
import { ArrowLeft } from "lucide-react";

// Steps in the pet creation flow
type PetCreationStep = "name" | "details" | "completed";

const CreatePet = () => {
  const navigate = useNavigate();
  
  // State for the multi-step form
  const [step, setStep] = useState<PetCreationStep>("name");
  
  // Pet data state
  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState<"cat" | "dog">("cat");
  const [petGender, setPetGender] = useState<"Male" | "Female">("Male");
  const [petAge, setPetAge] = useState<string>("1");
  
  // Validation state
  const [isNameValid, setIsNameValid] = useState(false);
  const [isDetailsValid, setIsDetailsValid] = useState(false);
  
  // Validate name whenever it changes
  useEffect(() => {
    setIsNameValid(petName.trim() !== "");
  }, [petName]);
  
  // Validate details whenever they change
  useEffect(() => {
    setIsDetailsValid(
      petAge !== "" && 
      !isNaN(Number(petAge)) && 
      Number(petAge) > 0
    );
  }, [petType, petGender, petAge]);
  
  // Handle form submission for the name step
  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isNameValid) {
      setStep("details");
    }
  };
  
  // Handle form submission for the details step
  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isDetailsValid) {
      // Store pet info in localStorage
      const petData = {
        name: petName,
        type: petType,
        gender: petGender,
        age: petAge
      };
      
      // Get existing pets or create new array
      const existingPets = JSON.parse(localStorage.getItem("pets") || "[]");
      existingPets.push(petData);
      localStorage.setItem("pets", JSON.stringify(existingPets));
      
      navigate("/onboarding/pet-created");
    }
  };
  
  // Handle going back based on current step
  const handleBack = () => {
    if (step === "details") {
      setStep("name");
    } else {
      navigate(-1);
    }
  };
  
  // Name step content
  const renderNameStep = () => (
    <form onSubmit={handleNameSubmit} className="flex flex-col gap-6 mt-4">
      <div className="text-center mb-4">
        <h1 className="text-xl font-semibold text-[#304352]">What is your pet's name?</h1>
        <p className="text-xs text-gray-500 mt-1">You can add more pets later</p>
      </div>
      
      <div>
        <input
          type="text"
          className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-petapp-green"
          placeholder="Wijen Prasetyo"
          value={petName}
          onChange={(e) => setPetName(e.target.value)}
          required
        />
      </div>
      
      <div className="mt-auto pt-6">
        <ButtonCustom 
          type="submit" 
          disabled={!isNameValid}
          className={`rounded-lg ${!isNameValid ? 'bg-gray-300 text-gray-500' : 'bg-petapp-green text-white'}`}
          fullWidth
        >
          Next
        </ButtonCustom>
      </div>
    </form>
  );
  
  // Details step content
  const renderDetailsStep = () => (
    <form onSubmit={handleDetailsSubmit} className="flex flex-col gap-6 mt-4">
      <div className="text-center mb-4">
        <h1 className="text-xl font-semibold text-[#304352]">{petName} is a</h1>
      </div>
      
      <div>
        <p className="block text-sm text-gray-700 mb-3">Pet Type</p>
        <div className="flex justify-center gap-4 sm:gap-8">
          <div 
            className={`flex flex-col items-center cursor-pointer ${petType === "cat" ? "opacity-100" : "opacity-60"}`}
            onClick={() => setPetType("cat")}
          >
            <div className="w-24 h-36 bg-white border rounded-lg p-1 flex items-center justify-center">
              <img 
                src="/lovable-uploads/2849d71e-b0b1-4fd0-95e6-10898124372b.png" 
                alt="Cat"
                className="h-32 object-contain" 
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTE3LjYgMTFhOC41IDguNSAwIDAgMSAwIDJIMTlhNy41MSA3LjUxIDAgMCAwIDAtMnptLTEtMC41YTggOCAwIDAgMC0wLjgtMkg1YTE0IDE0IDAgMCAwIDMgMTAuMjYgNS41IDUuNSAwIDAgMCA0IDAuNzQgNS41IDUuNSAwIDAgMCA0LTAuNzRjMC40My0wLjcgMC44NS0xLjQ2IDEuMjItMi4yNmEzLjAzIDMuMDMgMCAwIDEtMC42NC0xLjc0IDMuNTMgMy41MyAwIDAgMSAwLTRBMi45OSAyLjk5IDAgMCAxIDE2LjYgMTAuNXptLTUuNiA3LjVjLTEuOTUgMC0zLjkyLTcuNS0zLjkyLTcuNWE3LjUgNy41IDAgMCAxIDcuODQgMHMtMS45NyA3LjUtMy45MiA3LjV6bTAtN2MtMS4xIDAtMiAwLjktMiAyczAuOSAyIDIgMiAyLTAuOSAyLTItMC45LTItMi0yem0tOS00SDVjLTAuMzEtMC43NS0wLjQ3LTEuNS0wLjUtMi4yNUM0LjM1IDQuMjUgNC4wOCAzIDQgM0MzLjgzIDMuMSAzLjUgNCAzLjUgNS41UzMuODMgOCA0IDh6bTctMmEzLjUgMy41IDAgMCAwLTMuNSAzLjVMMTEgMTVhMyAzIDAgMCAwIDYgMFYxMS41YTMuNSAzLjUgMCAwIDAtMy41LTMuNXoiLz48L3N2Zz4=";
                }}
              />
            </div>
            <span className="mt-2 text-sm font-medium">Cat</span>
            <div className={`mt-1 w-full h-8 rounded-full ${petType === "cat" ? "border-2 border-petapp-green" : "border border-gray-300"}`}></div>
          </div>
          
          <div 
            className={`flex flex-col items-center cursor-pointer ${petType === "dog" ? "opacity-100" : "opacity-60"}`}
            onClick={() => setPetType("dog")}
          >
            <div className="w-24 h-36 bg-white border rounded-lg p-1 flex items-center justify-center">
              <img 
                src="/lovable-uploads/c22508c8-76e4-40a4-824b-6a4b629a00c4.png" 
                alt="Dog"
                className="h-32 object-contain" 
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTE4IDljMC0zLjg3LTMuMTMtNy03LTdzLTcgMy4xMy03IDcgMy4xMyA3IDcgNyA3LTMuMTMgNy03ek04IDExaDJ2Mmgydi0yaC0ydi0yaC0ydjJ6bTgtMHY1YzAgMS42Ni0xLjM0IDMtMyAzaC0zYy0xLjY2IDAtMy0xLjM0LTMtM3YtNWw0LTREMTYgN2wtNS0xLTEtMi0xIDItNSAxIDIgNGgtMXY1YzIuNjYgMCA1LjMzLTEuMzMgOC0zLjY3VjExaDF6Ii8+PC9zdmc+";
                }}
              />
            </div>
            <span className="mt-2 text-sm font-medium">Dog</span>
            <div className={`mt-1 w-full h-8 rounded-full ${petType === "dog" ? "border-2 border-petapp-green" : "border border-gray-300"}`}></div>
          </div>
        </div>
      </div>
      
      <div>
        <p className="block text-sm text-gray-700 mb-3">{petName}'s gender is</p>
        <div className="flex justify-center gap-8">
          <div 
            className={`flex flex-col items-center cursor-pointer ${petGender === "Female" ? "opacity-100" : "opacity-60"}`}
            onClick={() => setPetGender("Female")}
          >
            <div className="w-24 h-10 bg-white border rounded-lg flex items-center justify-center">
              <span className="text-sm">Female</span>
            </div>
            <div className={`mt-1 w-full h-1 rounded-full ${petGender === "Female" ? "bg-petapp-green" : "bg-gray-300"}`}></div>
          </div>
          
          <div 
            className={`flex flex-col items-center cursor-pointer ${petGender === "Male" ? "opacity-100" : "opacity-60"}`}
            onClick={() => setPetGender("Male")}
          >
            <div className="w-24 h-10 bg-white border rounded-lg flex items-center justify-center">
              <span className="text-sm">Male</span>
            </div>
            <div className={`mt-1 w-full h-1 rounded-full ${petGender === "Male" ? "bg-petapp-green" : "bg-gray-300"}`}></div>
          </div>
        </div>
      </div>
      
      <div>
        <p className="block text-sm text-gray-700 mb-3">{petName}'s age is</p>
        <div className="flex justify-center items-center gap-2">
          <input
            type="number"
            min="1"
            className="w-16 px-3 py-2.5 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-1 focus:ring-petapp-green"
            value={petAge}
            onChange={(e) => setPetAge(e.target.value)}
            required
          />
          <span className="text-sm text-gray-500">years old</span>
        </div>
      </div>
      
      <div className="mt-auto pt-6">
        <ButtonCustom 
          type="submit" 
          disabled={!isDetailsValid}
          className={`rounded-lg ${!isDetailsValid ? 'bg-gray-300 text-gray-500' : 'bg-petapp-green text-white'}`}
          fullWidth
        >
          Create Pet's Profile
        </ButtonCustom>
      </div>
    </form>
  );
  
  return (
    <div className="min-h-screen flex flex-col p-4 sm:p-6 bg-white">
      
      <button 
        onClick={handleBack}
        className="absolute top-4 left-4 text-gray-600"
        aria-label="Go back"
      >
        <ArrowLeft size={24} />
      </button>
      
      <div className="flex-1 flex flex-col w-full">
        {step === "name" && renderNameStep()}
        {step === "details" && renderDetailsStep()}
      </div>
      
      {/* Bottom indicator dot */}
      <div className="flex justify-center mt-8 mb-4">
        <div className="w-16 h-1 bg-black rounded-full"></div>
      </div>
    </div>
  );
};

export default CreatePet;
