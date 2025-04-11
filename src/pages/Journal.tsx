
import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { ButtonCustom } from "@/components/ui/button-custom";
import { useNavigate } from "react-router-dom";
import { Moon, Star, Rainbow, RefreshCw, Calendar } from "lucide-react";
import { format } from "date-fns";
import { 
  generateJournalEntry, 
  shouldRefreshJournals, 
  saveJournalEntries, 
  getJournalEntries,
  type Pet,
  type JournalEntry 
} from "@/utils/journalGenerator";

// Mock pet data from Home.tsx
const mockPets = [
  { id: 1, name: "Wijen", gender: "Male", age: 3, petType: "cat" as const },
  { id: 2, name: "Oreo", gender: "Male", age: 1, petType: "dog" as const },
  { id: 3, name: "Chia", gender: "Female", age: 2, petType: "cat" as const },
  { id: 4, name: "Kunyit", gender: "Female", age: 4, petType: "dog" as const },
];

const Journal = () => {
  const navigate = useNavigate();
  const [selectedPetName, setSelectedPetName] = useState("Chia");
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [lastRefreshed, setLastRefreshed] = useState<string>("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Find selected pet object
  const selectedPet = mockPets.find(pet => pet.name === selectedPetName) || mockPets[0];
  
  // Find current pet's journal entry
  const currentJournal = journalEntries.find(entry => entry.petId === selectedPet.id);

  // Initialize and check for journal refresh
  useEffect(() => {
    initializeJournals();

    // Set up midnight refresh check
    const checkMidnightRefresh = () => {
      const lastSavedDate = localStorage.getItem('lastJournalRefreshDate');
      if (lastSavedDate && shouldRefreshJournals(lastSavedDate)) {
        refreshAllJournals();
      }
    };

    // Check initially
    checkMidnightRefresh();

    // Set interval to check every minute
    const intervalId = setInterval(checkMidnightRefresh, 60000);
    
    return () => clearInterval(intervalId);
  }, []);

  const initializeJournals = () => {
    let entries = getJournalEntries();
    const lastSavedDate = localStorage.getItem('lastJournalRefreshDate');
    
    // Check if we need to refresh or initialize journals
    if (!entries.length || (lastSavedDate && shouldRefreshJournals(lastSavedDate))) {
      entries = refreshAllJournals();
    } else {
      setJournalEntries(entries);
      setLastRefreshed(lastSavedDate || new Date().toISOString());
    }
  };

  const refreshAllJournals = () => {
    setIsRefreshing(true);
    
    // Generate new journal entries for all pets
    const newEntries = mockPets.map(pet => generateJournalEntry(pet));
    
    // Update state and localStorage
    setJournalEntries(newEntries);
    saveJournalEntries(newEntries);
    
    const nowISOString = new Date().toISOString();
    localStorage.setItem('lastJournalRefreshDate', nowISOString);
    setLastRefreshed(nowISOString);
    
    setIsRefreshing(false);
    return newEntries;
  };

  const handleManualRefresh = () => {
    refreshAllJournals();
  };

  return (
    <MainLayout>
      <div className="p-6 pb-24">
        {/* Header */}
        <header className="mb-5">
          <h1 className="text-5xl font-bold text-gray-900">PET JOURNAL</h1>
          <div className="flex items-center justify-between">
            <p className="text-xl text-gray-400">Track your pets' pawtivities</p>
            
            {/* Last refreshed info */}
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="h-4 w-4 mr-1" />
              <span>
                Updated: {lastRefreshed ? format(new Date(lastRefreshed), 'MMM d, yyyy') : 'Just now'}
              </span>
              <button 
                onClick={handleManualRefresh}
                disabled={isRefreshing}
                className="ml-2 p-1 rounded-full hover:bg-gray-100 disabled:opacity-50"
                title="Refresh journal"
              >
                <RefreshCw className={`h-4 w-4 text-gray-500 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        </header>

        {/* Pet Filter */}
        <div className="flex space-x-3 mb-12 overflow-x-auto pb-2">
          {mockPets.map((pet) => (
            <button
              key={pet.id}
              onClick={() => setSelectedPetName(pet.name)}
              className={`py-3 px-8 rounded-full border whitespace-nowrap transition-colors ${
                selectedPetName === pet.name
                  ? "bg-amber-200 border-amber-300 text-gray-800 font-medium"
                  : "bg-white border-petapp-pink text-gray-800"
              }`}
            >
              {pet.name}
            </button>
          ))}
        </div>

        {/* Journal Content */}
        {currentJournal ? (
          <div className="space-y-12">
            {/* Sleeping Style Prediction */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Moon className="text-blue-500" size={24} />
                <h2 className="text-2xl font-bold">Sleeping Style Prediction</h2>
              </div>
              <p className="text-gray-800 text-lg leading-relaxed">
                "{currentJournal.sleepingStyle}"
              </p>
            </div>

            {/* Today's Activity Highlight */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Star className="text-yellow-400" size={24} />
                <h2 className="text-2xl font-bold">Today's Activity Highlight</h2>
              </div>
              <p className="text-gray-800 text-lg leading-relaxed">
                "{currentJournal.activityHighlight}"
              </p>
            </div>

            {/* Mood of the Day */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Rainbow className="text-red-400" size={24} />
                <h2 className="text-2xl font-bold">Mood of the Day</h2>
              </div>
              <p className="text-gray-800 text-lg font-medium">
                "{currentJournal.moodOfTheDay.mood}"
              </p>
              <p className="text-gray-800 text-lg leading-relaxed">
                "{currentJournal.moodOfTheDay.description}"
              </p>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center">
            <p className="text-gray-500">Loading journal data...</p>
          </div>
        )}

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
