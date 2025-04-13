
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Home, Scissors, Syringe, Stethoscope, HeartPulse, LucideIcon } from "lucide-react";
import { format } from "date-fns";

// Mock pets data - updated to match the image
const mockPets = [
  { id: 1, name: "Wijen" },
  { id: 2, name: "Oreo" },
  { id: 3, name: "Chia" },
  { id: 4, name: "Kunyit" }
];

// Get pet names for filter options (including "All" option)
const filterOptions = ["All", ...mockPets.map(pet => pet.name)];

// Map of care type values to their respective icons and labels
const careTypeIcons: Record<string, { icon: LucideIcon, label: string }> = {
  "pethotel": { icon: Home, label: "Pet Hotel" },
  "grooming": { icon: Scissors, label: "Grooming" },
  "vaccine": { icon: Syringe, label: "Vaccine" },
  "vet": { icon: Stethoscope, label: "Vet Visit" },
  "sterilization": { icon: HeartPulse, label: "Sterilization" },
};

// Group records by date function
const groupRecordsByDate = (records: any[]) => {
  const groupedByDate: Record<string, any[]> = {};
  
  records.forEach(record => {
    const dateStr = format(new Date(record.date), 'dd MMMM yyyy');
    if (!groupedByDate[dateStr]) {
      groupedByDate[dateStr] = [];
    }
    groupedByDate[dateStr].push(record);
  });
  
  return Object.entries(groupedByDate).map(([date, activities], index) => ({
    id: index + 1,
    date,
    activities
  }));
};

const PetCare = () => {
  const [searchParams] = useSearchParams();
  const [activeFilter, setActiveFilter] = useState("All");
  const [activities, setActivities] = useState<any[]>([]);
  
  // Set active filter based on URL parameter and load records
  useEffect(() => {
    const petParam = searchParams.get("pet");
    if (petParam && filterOptions.includes(petParam)) {
      setActiveFilter(petParam);
    }
    
    // Load records from localStorage
    const savedRecords = JSON.parse(localStorage.getItem('petCareRecords') || '[]');
    if (savedRecords.length > 0) {
      setActivities(groupRecordsByDate(savedRecords));
    }
  }, [searchParams]);

  // Filter activities based on selected pet
  const filteredActivities = activities.map(dateGroup => {
    // If "All" is selected, return all activities; otherwise filter by pet name
    const filteredActivitiesByPet = activeFilter === "All" 
      ? dateGroup.activities 
      : dateGroup.activities.filter((activity: any) => activity.petName === activeFilter);
    
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
                  {dateGroup.activities.map((activity: any) => {
                    // Get the appropriate icon based on care type
                    const careTypeInfo = careTypeIcons[activity.careType] || { icon: Home, label: "Care" };
                    const Icon = careTypeInfo.icon;
                    
                    return (
                      <div 
                        key={activity.id} 
                        className="flex items-center"
                      >
                        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3 shadow-sm">
                          <Icon className="w-5 h-5 text-amber-400" />
                        </div>
                        <span className="inline-block px-4 py-1 mr-2 text-[11px] font-poppins text-black bg-white rounded-3xl border border-petapp-orange/70">
                          {activity.petName}
                        </span>
                        <span className="text-[14px] font-poppins text-[#5C5C5C]">
                          {activity.careTypeLabel || careTypeInfo.label}
                        </span>
                      </div>
                    );
                  })}
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
