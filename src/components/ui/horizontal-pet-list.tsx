
import { ReactNode, useEffect, useRef, useState } from "react";
import { PetCardHorizontal } from "./pet-card-horizontal";

interface Pet {
  id: number;
  name: string;
  gender: string;
  age: number;
  petType: string;
}

interface HorizontalPetListProps {
  pets: Pet[];
  renderPetImage: (pet: Pet) => ReactNode;
  renderPetCard?: (pet: Pet) => ReactNode;
}

export const HorizontalPetList = ({
  pets,
  renderPetImage,
  renderPetCard
}: HorizontalPetListProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(pets.length > 2);
  
  // Check if we need to show the scroll indicator based on scroll position
  useEffect(() => {
    const checkScroll = () => {
      const container = scrollContainerRef.current;
      if (!container) return;
      
      const isAtEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 20;
      setShowScrollIndicator(!isAtEnd && pets.length > 2);
    };
    
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      // Initial check
      checkScroll();
      
      return () => container.removeEventListener('scroll', checkScroll);
    }
  }, [pets.length]);
  
  // Add touch scrolling event handlers for better mobile experience
  const handleTouchStart = (e: React.TouchEvent) => {
    // This empty handler enables momentum scrolling on iOS Safari
  };
  return (
    <div className="pt-20 pb-4 -mx-5 px-5 mb-8 relative">
      {/* Visual indicator that there's more to scroll */}
      {showScrollIndicator && (
        <div className="absolute right-4 top-1/2 w-8 h-8 bg-white/60 rounded-full flex items-center justify-center shadow-sm z-10 animate-pulse">
          <div className="w-4 h-4 border-r-2 border-b-2 border-primary transform rotate-[-45deg] translate-x-[-2px]"></div>
        </div>
      )}
      <div 
        ref={scrollContainerRef}
        className="flex space-x-4 overflow-x-auto scrollbar-none snap-x snap-mandatory scroll-smooth py-2 pb-4 -mr-5 pr-5" 
        style={{ WebkitOverflowScrolling: 'touch' }}
        onTouchStart={handleTouchStart}
      >
        {pets.map((pet) => {
          if (renderPetCard) {
            return renderPetCard(pet);
          }
          return (
            <PetCardHorizontal
              key={pet.id}
              name={pet.name}
              gender={pet.gender}
              age={pet.age}
              petType={pet.petType}
              image={renderPetImage(pet)}
            />
          );
        })}
      </div>
    </div>
  );
};
