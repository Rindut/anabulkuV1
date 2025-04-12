
import { ButtonCustom } from "./button-custom";
import { useNavigate } from "react-router-dom";

interface JournalSectionProps {
  compact?: boolean;
}

export const JournalSection = ({ compact = false }: JournalSectionProps) => {
  const navigate = useNavigate();
  
  return (
    <div className={compact ? "mt-6" : "mt-12"}>
      <h2 className={compact ? "text-2xl font-bold mb-3" : "text-3xl font-bold mb-5"}>Pets Journal</h2>
      <p className={`text-gray-700 ${compact ? "mb-5 text-sm" : "mb-8"} text-center px-3 leading-relaxed`}>
        Keep up with your pet's daily vibes! You can see your pet's 
        Sleep Style Prediction, Highlight Activities, and Today's Mood.
      </p>
      
      <div className={`flex justify-center ${compact ? "mt-4" : "mt-8"}`}>
        <ButtonCustom 
          variant="secondary" 
          size={compact ? "md" : "lg"}
          onClick={() => navigate('/journal')}
          className={`bg-amber-200 text-gray-800 hover:bg-amber-300 ${compact ? "px-6 py-3 text-base" : "px-8 py-4 text-lg"}`}
        >
          Go to Pets Journal
        </ButtonCustom>
      </div>
    </div>
  );
};
