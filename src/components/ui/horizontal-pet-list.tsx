
import { ReactNode } from "react";
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
  return (
    <div className="overflow-visible pt-16 pb-4 -mx-5 px-5 scrollbar-none mb-8">
      <div className="flex space-x-4 overflow-visible">
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
