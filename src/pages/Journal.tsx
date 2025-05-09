
import { useState, useEffect } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Moon, Star, Rainbow, RefreshCw, Calendar, ClipboardList } from "lucide-react";
import { format } from "date-fns";
import { 
  generateJournalEntry, 
  shouldRefreshJournals, 
  saveJournalEntries, 
  getJournalEntries,
  type Pet,
  type JournalEntry 
} from "@/utils/journalGenerator";
import { PetCareRecord } from "@/components/ui/pet-care-record";

// Mock pet data from Home.tsx
const mockPets = [
  { id: 1, name: "Wijen", gender: "Male", age: 3, petType: "cat" as const },
  { id: 2, name: "Oreo", gender: "Male", age: 1, petType: "dog" as const },
  { id: 3, name: "Chia", gender: "Female", age: 1, petType: "cat" as const },
  { id: 4, name: "Kunyit", gender: "Female", age: 5, petType: "dog" as const },
];

const Journal = () => {
  const [selectedPetName, setSelectedPetName] = useState("Chia");
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [lastRefreshed, setLastRefreshed] = useState<string>("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [petCareRecords, setPetCareRecords] = useState<any[]>([]);

  // Find selected pet object
  const selectedPet = mockPets.find(pet => pet.name === selectedPetName) || mockPets[0];
  
  // Find current pet's journal entry
  const currentJournal = journalEntries.find(entry => entry.petId === selectedPet.id);

  // Initialize and check for journal refresh
  useEffect(() => {
    initializeJournals();
    loadPetCareRecords();

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

  // Load pet care records from localStorage
  const loadPetCareRecords = () => {
    const records = JSON.parse(localStorage.getItem('petCareRecords') || '[]');
    setPetCareRecords(records);
  };

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
      <div className="p-6">
        {/* Header */}
        <header className="mb-5">
          <h1 className="text-[36px] font-bold text-black font-rubik">PET JOURNAL</h1>
          <div>
            <p className="text-[15px] text-gray-500 font-rubik">Track your pets' pawtivities</p>
          </div>
        </header>

        {/* Pet Filter */}
        <div className="flex space-x-3 mb-12 overflow-x-auto pb-2">
          {mockPets.map((pet) => (
            <button
              key={pet.id}
              onClick={() => setSelectedPetName(pet.name)}
              className={`py-3 px-8 rounded-full border whitespace-nowrap transition-colors font-poppins text-[12px] ${
                selectedPetName === pet.name
                  ? "bg-petapp-orange border-petapp-orange/70 text-black font-medium"
                  : "bg-white border-petapp-orange/30 text-black"
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
                <h2 className="text-[15px] font-poppins text-black font-bold">Sleeping Style Prediction</h2>
              </div>
              <p className="text-black text-[12px] font-poppins leading-relaxed">
                "{currentJournal.sleepingStyle}"
              </p>
            </div>

            {/* Today's Activity Highlight */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Star className="text-yellow-400" size={24} />
                <h2 className="text-[15px] font-poppins text-black font-bold">Today's Activity Highlight</h2>
              </div>
              <p className="text-black text-[12px] font-poppins leading-relaxed">
                "{currentJournal.activityHighlight}"
              </p>
            </div>

            {/* Mood of the Day */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Rainbow className="text-red-400" size={24} />
                <h2 className="text-[15px] font-poppins text-black font-bold">Mood of the Day</h2>
              </div>
              <p className="text-black text-[12px] font-poppins font-medium">
                "{currentJournal.moodOfTheDay.mood}"
              </p>
              <p className="text-black text-[12px] font-poppins leading-relaxed">
                "{currentJournal.moodOfTheDay.description}"
              </p>
            </div>

            {/* Pet Care Records */}
            {petCareRecords.filter(record => record.petName === selectedPetName).length > 0 && (
              <div className="space-y-3 mt-6">
                <div className="flex items-center space-x-2">
                  <ClipboardList className="text-green-500" size={24} />
                  <h2 className="text-[15px] font-poppins text-black font-bold">Pet Care Records</h2>
                </div>
                <p className="text-[12px] text-gray-500 font-poppins mb-3">
                  {selectedPetName}'s care records for the last 1 month
                </p>
                <div className="space-y-4">
                  {petCareRecords
                    .filter(record => record.petName === selectedPetName)
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .slice(0, 3) // Show only the latest 3 records
                    .map(record => (
                      <PetCareRecord key={record.id} record={record} />
                    ))
                  }
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="p-8 text-center">
            <p className="text-gray-500">Loading journal data...</p>
          </div>
        )}

        {/* Last updated info at the bottom */}
        <div className="mt-16 pt-4 border-t border-gray-100 flex items-center justify-center text-[10px] text-gray-500 font-rubik">
          <div className="flex items-center">
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
              <RefreshCw className={`h-4 w-4 text-white ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Journal;
