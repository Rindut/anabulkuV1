
import { useState, forwardRef } from "react";
import { format } from "date-fns";
import { ChevronDown } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

export interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
  label?: string;
  id?: string;
}

export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  ({ value, onChange, placeholder = "Select date", className, label, id }, ref) => {
    const [date, setDate] = useState<Date | undefined>(value);

    const handleDateSelect = (selectedDate: Date | undefined) => {
      setDate(selectedDate);
      if (onChange) {
        onChange(selectedDate);
      }
    };

    return (
      <div className="w-full" ref={ref}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
        )}
        <Popover>
          <PopoverTrigger asChild>
            <button
              id={id}
              className={cn(
                "flex h-12 w-full items-center justify-between rounded-lg border border-input bg-white px-3 py-2 text-sm text-left",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petapp-green",
                className
              )}
            >
              <span>{date ? format(date, "dd/MM/yyyy") : placeholder}</span>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              initialFocus
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>
    );
  }
);

DatePicker.displayName = "DatePicker";
