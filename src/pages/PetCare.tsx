
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Check } from "lucide-react";

// Mock pets data - updated to match the image
const mockPets = [
  { id: 1, name: "Wijen" },
  { id: 2, name: "Oreo" },
  { id: 3, name: "Chia" },
  { id: 4, name: "Kunyit" }
];

// Get pet names for filter options (including "All" option)
const filterOptions = ["All", ...mockPets.map(pet => pet.name)];

// Mock data for pet care activities - structured by date with multiple pets per day
const mockActivities = [
  { 
    id: 1, 
    date: "30 September 2024",
    activities: [
      { id: 1, petName: "Wijen", type: "Pet Hotel", completed: true },
      { id: 2, petName: "Wijen", type: "Grooming", completed: true },
      { id: 3, petName: "Kunyit", type: "Pet Hotel", completed: true },
      { id: 4, petName: "Kunyit", type: "Grooming", completed: true }
    ]
  },
  { 
    id: 2, 
    date: "5 September 2024",
    activities: [
      { id: 5, petName: "Wijen", type: "Vet Visit", completed: true },
      { id: 6, petName: "Wijen", type: "Vaccine", completed: true },
      { id: 7, petName: "Oreo", type: "Vet Visit", completed: true }
    ]
  },
  { 
    id: 3, 
    date: "2 August 2024",
    activities: [
      { id: 8, petName: "Wijen", type: "Grooming", completed: true },
      { id: 9, petName: "Oreo", type: "Grooming", completed: true },
      { id: 10, petName: "Kunyit", type: "Grooming", completed: true }
    ]
  }
];

const PetCare = () => {
  const [searchParams] = useSearchParams();
  const [activeFilter, setActiveFilter] = useState("All");
  
  // Set active filter based on URL parameter
  useEffect(() => {
    const petParam = searchParams.get("pet");
    if (petParam && filterOptions.includes(petParam)) {
      setActiveFilter(petParam);
    }
  }, [searchParams]);

  // Filter activities based on selected pet
  const filteredActivities = mockActivities.map(dateGroup => {
    // If "All" is selected, return all activities; otherwise filter by pet name
    const filteredActivitiesByPet = activeFilter === "All" 
      ? dateGroup.activities 
      : dateGroup.activities.filter(activity => activity.petName === activeFilter);
    
    return {
      ...dateGroup,
      activities: filteredActivitiesByPet
    };
  }).filter(dateGroup => dateGroup.activities.length > 0); // Remove dates with no activities after filtering

  return (
    <MainLayout>
      <div className="p-6">
        <header className="mb-6">
          <h1 className="text-[36px] font-bold text-black font-rubik">PET CARE</h1>
          <p className="text-[15px] text-gray-500 font-rubik">History of your pet care</p>
        </header>

        {/* Filter tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
          {filterOptions.map((petName) => (
            <button
              key={petName}
              className={`px-6 py-2.5 rounded-3xl text-[12px] font-poppins whitespace-nowrap ${
                activeFilter === petName
                  ? "bg-petapp-orange text-black border border-petapp-orange/70"
                  : "bg-white text-black border border-petapp-orange/30"
              }`}
              onClick={() => setActiveFilter(petName)}
            >
              {petName}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="space-y-10">
          {filteredActivities.length > 0 ? (
            filteredActivities.map((dateGroup) => (
              <div key={dateGroup.id} className="space-y-1">
                <h2 className="text-[15px] font-poppins text-black mb-4">{dateGroup.date}</h2>
                
                <div className="bg-petapp-pawrentBox rounded-3xl p-3 space-y-4">
                  {dateGroup.activities.map((activity) => (
                    <div 
                      key={activity.id} 
                      className="flex items-center"
                    >
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3 shadow-sm">
                        <Check className="w-5 h-5 text-amber-400" />
                      </div>
                      <span className="inline-block px-4 py-1 mr-2 text-[11px] font-poppins text-black bg-white rounded-3xl border border-petapp-orange/70">
                        {activity.petName}
                      </span>
                      <span className="text-[14px] font-poppins text-[#5C5C5C]">
                        {activity.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              No records found for this pet
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default PetCare;
