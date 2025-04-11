
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Calendar, Check } from "lucide-react";

// Mock data for pet care activities
const mockActivities = [
  { 
    id: 1, 
    date: "20 September 2024",
    activities: [
      { id: 1, type: "Vet Visit", completed: true },
      { id: 2, type: "Grooming", completed: true }
    ]
  },
  { 
    id: 2, 
    date: "5 September 2024",
    activities: [
      { id: 3, type: "Vet Visit", completed: true },
      { id: 4, type: "Vaccine", completed: true }
    ]
  },
  { 
    id: 3, 
    date: "3 August 2024",
    activities: [
      { id: 5, type: "Vet Visit", completed: true },
      { id: 6, type: "Grooming", completed: true },
      { id: 7, type: "Deworming", completed: true }
    ]
  }
];

// Filter options
const filterOptions = ["All", "Vet", "Grooming", "Vaccine", "Deworming"];

const PetCare = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <MainLayout>
      <div className="p-6">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">PET CARE</h1>
          <p className="text-sm text-gray-500">History of your pet care</p>
        </header>

        {/* Filter tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          {filterOptions.map((option) => (
            <button
              key={option}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                activeFilter === option
                  ? "bg-petapp-green text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => setActiveFilter(option)}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="space-y-6">
          {mockActivities.map((dateGroup) => (
            <div key={dateGroup.id} className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex items-center mb-3">
                <Calendar className="w-5 h-5 text-petapp-green mr-2" />
                <span className="font-medium">{dateGroup.date}</span>
              </div>
              
              <div className="space-y-3">
                {dateGroup.activities.map((activity) => (
                  <div 
                    key={activity.id} 
                    className="flex items-center p-3 bg-petapp-peach/50 rounded-lg"
                  >
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center mr-3">
                      <Check className="w-4 h-4 text-petapp-green" />
                    </div>
                    <span>{activity.type}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default PetCare;
