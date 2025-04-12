
import { useEffect, useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Parent3DAvatar } from "@/components/avatars/Parent3DAvatar";
import { Pet3DAvatar } from "@/components/ui/pet-3d-avatar";
import { PetCardHorizontal } from "@/components/ui/pet-card-horizontal";
import { ParentInfoCard } from "@/components/ui/parent-info-card";
import { HorizontalPetList } from "@/components/ui/horizontal-pet-list";
import { JournalSection } from "@/components/ui/journal-section";
import { StatusBar } from "@/components/ui/status-bar";

// Mock data for pets - matching the example case
const mockPets = [
  { id: 1, name: "Wijen", gender: "Male", age: 3, petType: "dog" },
  { id: 2, name: "Oreo", gender: "Male", age: 1, petType: "dog" },
  { id: 3, name: "Choco", gender: "Female", age: 2, petType: "cat" },
];

const Home = () => {
  const [greeting, setGreeting] = useState("Good morning");
  const [parentName, setParentName] = useState("Eko");
  const [parentGender, setParentGender] = useState<"Male" | "Female">("Male");

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
      <StatusBar />
      <div className="px-5 py-3 bg-petapp-white min-h-screen">
        <header className="mb-4">
          <h1 className="text-[36px] font-bold text-black font-rubik">PET FAMILY</h1>
          <p className="text-[15px] text-gray-500 font-rubik">Your pet family information</p>
        </header>

        <p className="text-[15px] font-bold text-black font-poppins mb-8">{greeting}, {parentName}!</p>

        {/* Parent Profile Card */}
        <ParentInfoCard
          name={parentName}
          avatar={<Parent3DAvatar size="md" gender={parentGender} floating={true} />}
          petCount={mockPets.length}
          className="mb-5"
        />

        {/* Pets Section */}
        <h2 className="text-[15px] font-bold text-black font-poppins mb-3 mt-8">Hello, Kids!</h2>
        
        {/* Horizontal scrollable pet list */}
        <HorizontalPetList 
          pets={mockPets}
          renderPetImage={(pet) => (
            <Pet3DAvatar 
              petType={pet.petType as "cat" | "dog"} 
              size="md"
              floating={true}
            />
          )}
          renderPetCard={(pet) => (
            <PetCardHorizontal
              key={pet.id}
              name={pet.name}
              gender={pet.gender}
              age={pet.age}
              petType={pet.petType}
              image={<Pet3DAvatar petType={pet.petType as "cat" | "dog"} size="md" floating={true} />}
            />
          )}
        />

        {/* Journal Section */}
        <JournalSection />
      </div>
    </MainLayout>
  );
};

export default Home;
