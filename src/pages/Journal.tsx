
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { ButtonCustom } from "@/components/ui/button-custom";
import { useNavigate } from "react-router-dom";
import { Moon, Star, Rainbow } from "lucide-react";

// Mock pet data from Home.tsx
const mockPets = [
  { id: 1, name: "Wijen", gender: "Male", age: 3, petType: "cat" },
  { id: 2, name: "Oreo", gender: "Male", age: 1, petType: "dog" },
  { id: 3, name: "Chia", gender: "Female", age: 2, petType: "cat" },
  { id: 4, name: "Kunyit", gender: "Female", age: 4, petType: "dog" },
];

// Mock journal data
const mockJournalData = {
  sleepingStyle: "Today, Moci will likely nap on your bookshelf—just after you tidied it up. Good luck to your paperwork 😴📚.",
  activityHighlight: "This morning, Moci enthusiastically chased her own shadow for 15 minutes. In the afternoon, she might put on a drama in front of your bedroom door.",
  moodOfTheDay: {
    mood: "😺 Moody & Clingy",
    description: "She'll need extra attention and probably some treats. Don't be surprised if she follows you everywhere today."
  }
};

const Journal = () => {
  const navigate = useNavigate();
  const [selectedPet, setSelectedPet] = useState("Chia");

  return (
    <MainLayout>
      <div className="p-6 pb-24">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-5xl font-bold text-gray-900">PET JOURNAL</h1>
          <p className="text-xl text-gray-400">Track your pets' pawtivities</p>
        </header>

        {/* Pet Filter */}
        <div className="flex space-x-3 mb-12 overflow-x-auto pb-2">
          {mockPets.map((pet) => (
            <button
              key={pet.id}
              onClick={() => setSelectedPet(pet.name)}
              className={`py-3 px-8 rounded-full border whitespace-nowrap transition-colors ${
                selectedPet === pet.name
                  ? "bg-amber-200 border-amber-300 text-gray-800 font-medium"
                  : "bg-white border-petapp-pink text-gray-800"
              }`}
            >
              {pet.name}
            </button>
          ))}
        </div>

        {/* Journal Content */}
        <div className="space-y-12">
          {/* Sleeping Style Prediction */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Moon className="text-blue-500" size={24} />
              <h2 className="text-2xl font-bold">Sleeping Style Prediction</h2>
            </div>
            <p className="text-gray-800 text-lg leading-relaxed">
              "{mockJournalData.sleepingStyle}"
            </p>
          </div>

          {/* Today's Activity Highlight */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Star className="text-yellow-400" size={24} />
              <h2 className="text-2xl font-bold">Today's Activity Highlight</h2>
            </div>
            <p className="text-gray-800 text-lg leading-relaxed">
              "{mockJournalData.activityHighlight}"
            </p>
          </div>

          {/* Mood of the Day */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Rainbow className="text-red-400" size={24} />
              <h2 className="text-2xl font-bold">Mood of the Day</h2>
            </div>
            <p className="text-gray-800 text-lg font-medium">
              "{mockJournalData.moodOfTheDay.mood}"
            </p>
            <p className="text-gray-800 text-lg leading-relaxed">
              "{mockJournalData.moodOfTheDay.description}"
            </p>
          </div>
        </div>

        {/* Back to Home Button */}
        <div className="mt-12">
          <ButtonCustom 
            variant="primary"
            size="lg"
            fullWidth
            className="bg-petapp-mint text-white font-medium py-4 text-xl rounded-xl"
            onClick={() => navigate('/')}
          >
            Back to Home
          </ButtonCustom>
        </div>
      </div>
    </MainLayout>
  );
};

export default Journal;
