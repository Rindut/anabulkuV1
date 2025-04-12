
import { useNavigate } from "react-router-dom";

export const JournalSection = () => {
  const navigate = useNavigate();
  
  return (
    <div className="mt-6">
      <h2 className="text-[15px] font-bold text-black text-center font-poppins mb-2">Pets Journal</h2>
      <p className="text-[10px] text-black text-center px-1 leading-relaxed max-w-sm mx-auto font-poppins">
        Keep up with your pet's daily vibes! You can see your pet's 
        Sleep Style Prediction, Highlight Activities, and Today's Mood.
      </p>
      
      <div className="flex justify-center mb-16">
        <button 
          onClick={() => navigate('/journal')}
          className="bg-petapp-beige text-black font-poppins font-bold text-[10px] py-4 px-8 rounded-full shadow-sm hover:shadow-md transition-shadow"
        >
          Go to Pets Journal
        </button>
      </div>
    </div>
  );
};
