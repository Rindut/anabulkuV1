
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
}

export const HorizontalPetList = ({
  pets,
  renderPetImage
}: HorizontalPetListProps) => {
  return (
    <div className="overflow-x-auto pb-3 -mx-5 px-5 scrollbar-none mb-6">
      <div className="flex space-x-3">
        {pets.map((pet) => (
          <PetCardHorizontal
            key={pet.id}
            name={pet.name}
            gender={pet.gender}
            age={pet.age}
            image={renderPetImage(pet)}
          />
        ))}
      </div>
    </div>
  );
};
