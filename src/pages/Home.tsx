
import { useEffect, useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { ParentAvatar3D } from "@/components/avatars/ParentAvatar3D";
import { PetAvatar3D } from "@/components/ui/pet-avatar-3d";
import { ParentProfileCard } from "@/components/ui/parent-profile-card";
import { SimplifiedPetCard } from "@/components/ui/simplified-pet-card";
import { JournalSection } from "@/components/ui/journal-section";

// Mock data for pets - matching the image
const mockPets = [
  { id: 1, name: "Wijen", gender: "Male", age: 3, petType: "cat" },
  { id: 2, name: "Oreo", gender: "Male", age: 1, petType: "dog" },
  { id: 3, name: "Chia", gender: "Female", age: 2, petType: "cat" },
  { id: 4, name: "Kunyit", gender: "Female", age: 4, petType: "dog" },
  { id: 5, name: "Pepper", gender: "Male", age: 2, petType: "dog" },
];

const Home = () => {
  const [greeting, setGreeting] = useState("Good morning");
  const [parentName, setParentName] = useState("Eko");

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
      <div className="p-4">
        <header className="mb-5">
          <h1 className="text-4xl font-bold text-gray-900">PET FAMILY</h1>
          <p className="text-sm text-gray-400">Your pet family information</p>
        </header>

        <p className="text-2xl font-medium mb-4">{greeting}, {parentName}!</p>

        {/* Parent Profile Card */}
        <ParentProfileCard
          name={parentName}
          avatar={
            <ParentAvatar3D gender="boy" size="lg" />
          }
          petCount={mockPets.length}
          className="mb-6"
        />

        {/* Pets Section */}
        <h2 className="text-2xl font-bold mb-4">Hello, Kids!</h2>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {/* Show up to 4 pets in the grid for better space usage */}
          {mockPets.slice(0, 4).map((pet) => (
            <SimplifiedPetCard
              key={pet.id}
              name={pet.name}
              gender={pet.gender}
              age={pet.age}
              image={
                <PetAvatar3D 
                  petType={pet.petType as "cat" | "dog"} 
                  gender={pet.gender === "Male" ? "male" : "female"} 
                  size="lg" 
                />
              }
            />
          ))}
        </div>

        {/* Journal Section */}
        <JournalSection />
      </div>
    </MainLayout>
  );
};

export default Home;
