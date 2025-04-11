
import { format } from "date-fns";

// Types for pet and journal data
export interface Pet {
  id: number;
  name: string;
  gender: string;
  age: number;
  petType: "cat" | "dog";
}

export interface JournalEntry {
  sleepingStyle: string;
  activityHighlight: string;
  moodOfTheDay: {
    mood: string;
    description: string;
  };
  generatedDate: string; // ISO string
  petId: number;
}

// Pet-specific content generators
const generateSleepingStyle = (pet: Pet): string => {
  const locations = pet.petType === "cat" 
    ? ["on your bookshelf", "in your laundry basket", "on top of your keyboard", "in a sunny spot by the window", "on your pillow"]
    : ["on your couch", "under your desk", "in their favorite corner", "by the door", "next to your bed"];
  
  const actions = pet.petType === "cat"
    ? ["nap", "curl up", "stretch out", "hide", "doze off"]
    : ["doze", "sprawl out", "snooze", "rest", "settle down"];
  
  const randomLocation = locations[Math.floor(Math.random() * locations.length)];
  const randomAction = actions[Math.floor(Math.random() * actions.length)];
  
  return `Today, ${pet.name} will likely ${randomAction} ${randomLocation}. ${
    pet.petType === "cat" 
      ? "Expect some purring and kneading before settling in."
      : "Listen for those cute dream whimpers while they sleep."
  }`;
};

const generateActivityHighlight = (pet: Pet): string => {
  const morningActivities = pet.petType === "cat"
    ? ["chased their own shadow", "played with a toy mouse", "climbed the curtains", "knocked things off shelves", "watched birds from the window"]
    : ["chewed on a favorite toy", "played fetch in the living room", "practiced tricks", "had a morning zoomies session", "greeted everyone with excitement"];
  
  const afternoonPlans = pet.petType === "cat"
    ? ["might put on a drama in front of your bedroom door", "will likely stare at the wall for no reason", "might demand treats by meowing loudly", "will probably attack your ankles as you walk by", "may decide to randomly sprint through the house"]
    : ["might beg for a walk outside", "will probably follow you around the house", "may bring you toys to play with", "will likely take a nap in their favorite spot", "might bark at delivery people"];
  
  const randomMorning = morningActivities[Math.floor(Math.random() * morningActivities.length)];
  const randomAfternoon = afternoonPlans[Math.floor(Math.random() * afternoonPlans.length)];
  
  return `This morning, ${pet.name} enthusiastically ${randomMorning} for ${5 + Math.floor(Math.random() * 20)} minutes. In the afternoon, ${pet.name} ${randomAfternoon}.`;
};

const generateMoodOfTheDay = (pet: Pet): { mood: string; description: string } => {
  const moods = [
    { 
      mood: pet.petType === "cat" ? "😺 Playful & Energetic" : "🐶 Happy & Energetic", 
      description: `Expect ${pet.name} to be bouncing off the walls today! Extra playtime is recommended.`
    },
    { 
      mood: pet.petType === "cat" ? "😸 Curious & Adventurous" : "🐕 Curious & Alert", 
      description: `${pet.name} seems interested in exploring every corner today. Keep an eye on your adventurous friend!`
    },
    { 
      mood: pet.petType === "cat" ? "😽 Affectionate & Cuddly" : "🦮 Affectionate & Loyal", 
      description: `${pet.name} is in a loving mood today. Expect lots of cuddles and attention-seeking behavior.`
    },
    { 
      mood: pet.petType === "cat" ? "😾 Moody & Clingy" : "🐕‍🦺 Needy & Clingy", 
      description: `${pet.name} will need extra attention and probably some treats. Don't be surprised if they follow you everywhere today.`
    },
    { 
      mood: pet.petType === "cat" ? "😴 Lazy & Relaxed" : "😴 Calm & Relaxed", 
      description: `${pet.name} is having a low-energy day. Perfect for some quiet bonding time without too much excitement.`
    }
  ];
  
  return moods[Math.floor(Math.random() * moods.length)];
};

// Main generator function
export const generateJournalEntry = (pet: Pet): JournalEntry => {
  return {
    sleepingStyle: generateSleepingStyle(pet),
    activityHighlight: generateActivityHighlight(pet),
    moodOfTheDay: generateMoodOfTheDay(pet),
    generatedDate: new Date().toISOString(),
    petId: pet.id
  };
};

// Check if journal entries need refreshing (at midnight)
export const shouldRefreshJournals = (lastGeneratedDate: string): boolean => {
  const currentDate = format(new Date(), 'yyyy-MM-dd');
  const generatedDate = format(new Date(lastGeneratedDate), 'yyyy-MM-dd');
  
  return currentDate !== generatedDate;
};

// LocalStorage helpers
export const saveJournalEntries = (entries: JournalEntry[]): void => {
  localStorage.setItem('petJournalEntries', JSON.stringify(entries));
};

export const getJournalEntries = (): JournalEntry[] => {
  const saved = localStorage.getItem('petJournalEntries');
  return saved ? JSON.parse(saved) : [];
};
