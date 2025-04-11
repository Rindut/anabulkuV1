
import { ButtonCustom } from "./button-custom";
import { useNavigate } from "react-router-dom";

export const JournalSection = () => {
  const navigate = useNavigate();
  
  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold mb-5">Pets Journal</h2>
      <p className="text-gray-700 mb-8 text-center px-4 leading-relaxed">
        Keep up with your pet's daily vibes! You can see your pet's 
        Sleep Style Prediction, Highlight Activities, and Today's Mood.
      </p>
      
      <div className="flex justify-center mt-8">
        <ButtonCustom 
          variant="secondary" 
          size="lg"
          onClick={() => navigate('/journal')}
          className="bg-amber-200 text-gray-800 hover:bg-amber-300 px-8 py-4 text-lg"
        >
          Go to Pets Journal
        </ButtonCustom>
      </div>
    </div>
  );
};
