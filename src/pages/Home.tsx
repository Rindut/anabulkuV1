
import { useEffect, useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { PetCard } from "@/components/ui/pet-card";
import { PetAvatar } from "@/components/avatars/PetAvatar";

// Mock data for pet cards
const mockPets = [
  { id: 1, name: "Kitty", type: "Persian Cat", age: 2, petType: "cat", gender: "female" },
  { id: 2, name: "Max", type: "Golden Retriever", age: 4, petType: "dog", gender: "male" },
  { id: 3, name: "Luna", type: "Siamese Cat", age: 1, petType: "cat", gender: "female" },
];

const Home = () => {
  const [greeting, setGreeting] = useState("Good morning");
  const [parentName, setParentName] = useState("Kev");

  // Set greeting based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting("Good morning");
    } else if (hour >= 12 && hour < 18) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
  }, []);

  return (
    <MainLayout>
      <div className="p-6">
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">PET FAMILY</h1>
          <p className="text-sm text-gray-500">Meet your furry companions</p>
          <p className="text-xl font-medium mt-4">{greeting}, {parentName}!</p>
        </header>

        <div className="grid grid-cols-1 gap-4">
          {mockPets.map((pet) => (
            <PetCard
              key={pet.id}
              name={pet.name}
              type={pet.type}
              age={pet.age}
              avatar={
                <PetAvatar 
                  petType={pet.petType as "cat" | "dog"} 
                  gender={pet.gender as "male" | "female"} 
                  size="lg" 
                />
              }
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
