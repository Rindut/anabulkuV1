
import { LucideIcon, Home, Scissors, Syringe, Stethoscope, XCircle } from "lucide-react";
import { format } from "date-fns";

interface PetCareRecord {
  id: number;
  petName: string;
  careType: string;
  careTypeLabel: string;
  location: string;
  date: string;
  notes: string;
  createdAt: string;
}

// Map of care type values to their respective icons
const careTypeIcons: Record<string, LucideIcon> = {
  "pethotel": Home,
  "grooming": Scissors,
  "vaccine": Syringe,
  "vet": Stethoscope,
  "sterilization": XCircle,
};

interface PetCareRecordProps {
  record: PetCareRecord;
}

export const PetCareRecord = ({ record }: PetCareRecordProps) => {
  // Get the appropriate icon based on care type
  const Icon = careTypeIcons[record.careType] || Home;
  
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
      <div className="flex items-start space-x-3">
        <div className="bg-petapp-orange/10 p-2 rounded-full">
          <Icon className="h-5 w-5 text-petapp-orange" />
        </div>
        
        <div className="flex-1">
          <h3 className="text-[15px] font-poppins font-bold flex items-center">
            {record.careTypeLabel}
            <span className="ml-2 text-[10px] text-gray-500 font-normal">
              {format(new Date(record.date), 'dd MMM yyyy')}
            </span>
          </h3>
          
          {record.location && (
            <p className="text-[12px] text-gray-500 mt-1">
              Location: {record.location}
            </p>
          )}
          
          {record.notes && (
            <p className="text-[12px] text-gray-600 mt-2 leading-relaxed">
              {record.notes}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
