
import { useNavigate } from "react-router-dom";

export const JournalSection = () => {
  const navigate = useNavigate();
  
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-2 text-center text-petapp-text-strong">Pets Journal</h2>
      <p className="text-petapp-text-neutral text-sm mb-5 text-center px-1 leading-relaxed max-w-sm mx-auto">
        Keep up with your pet's daily vibes! You can see your pet's 
        Sleep Style Prediction, Highlight Activities, and Today's Mood.
      </p>
      
      <div className="flex justify-center mb-16">
        <button 
          onClick={() => navigate('/journal')}
          className="bg-petapp-beige text-petapp-text-strong font-bold py-4 px-8 rounded-full shadow-sm hover:shadow-md transition-shadow"
        >
          Go to Pets Journal
        </button>
      </div>
    </div>
  );
};
