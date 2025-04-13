
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";
import { Pet } from "./usePets";

export type JournalEntry = {
  id: string;
  pet_id: string;
  sleeping_style: string;
  activity_highlight: string;
  mood: string;
  mood_description: string;
  date: string;
  created_at: string;
  updated_at: string;
};

// Generate a random journal entry for a pet
function generateJournalEntry(pet: Pet) {
  const sleepingStyles = [
    "Loves to sleep curled up in a tight ball, protecting their warmth.",
    "Prefers to sprawl out completely, taking up as much space as possible.",
    "Often sleeps on their back with paws up in the air, showing complete trust.",
    "Switches positions constantly throughout their nap time.",
    "Usually sleeps pressed against something or someone for security.",
  ];

  const activityHighlights = [
    `${pet.name} spent the morning watching birds by the window, making excited little noises.`,
    `${pet.name} discovered a new favorite toy today and wouldn't let it go for hours.`,
    `${pet.name} mastered a new trick today after many treats and encouragement.`,
    `${pet.name} had a playdate with the neighbor's pet and had so much fun.`,
    `${pet.name} explored every corner of the house today, curious about everything.`,
  ];

  const moods = [
    { mood: "Playful", description: `${pet.name} is feeling extra energetic today, ready to chase and play with anything that moves!` },
    { mood: "Relaxed", description: `${pet.name} is in a calm, contented mood today, enjoying lazy lounging and gentle pets.` },
    { mood: "Curious", description: `${pet.name} is particularly inquisitive today, investigating every new sound and smell.` },
    { mood: "Affectionate", description: `${pet.name} is in an extra loving mood today, seeking cuddles and showing lots of affection.` },
    { mood: "Mischievous", description: `${pet.name} has a glint in their eye today, looking for trouble and fun in equal measure.` },
  ];

  // Select random items from each array
  const randomSleepingStyle = sleepingStyles[Math.floor(Math.random() * sleepingStyles.length)];
  const randomActivityHighlight = activityHighlights[Math.floor(Math.random() * activityHighlights.length)];
  const randomMood = moods[Math.floor(Math.random() * moods.length)];

  return {
    pet_id: pet.id,
    sleeping_style: randomSleepingStyle,
    activity_highlight: randomActivityHighlight,
    mood: randomMood.mood,
    mood_description: randomMood.description,
    date: new Date().toISOString().split('T')[0],
  };
}

export function usePetJournal() {
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchJournalEntries();
    }
  }, [user]);

  async function fetchJournalEntries() {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from("pet_journal_entries")
        .select(`
          *,
          pets:pet_id (
            name,
            pet_type,
            gender,
            age
          )
        `)
        .eq("date", new Date().toISOString().split('T')[0]) // Only fetch today's entries
        .order("created_at", { ascending: false });
      
      if (error) {
        throw error;
      }
      
      if (data) {
        setJournalEntries(data);
      }
    } catch (error: any) {
      toast({
        title: "Error fetching journal entries",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  async function refreshJournalEntries(pets: Pet[]) {
    try {
      setLoading(true);
      
      // Delete existing entries for today
      const today = new Date().toISOString().split('T')[0];
      await supabase
        .from("pet_journal_entries")
        .delete()
        .eq("date", today);
      
      // Generate and insert new entries for all pets
      const newEntries = pets.map(pet => generateJournalEntry(pet));
      
      const { data, error } = await supabase
        .from("pet_journal_entries")
        .insert(newEntries)
        .select();
      
      if (error) {
        throw error;
      }
      
      if (data) {
        // Fetch the entries with the pet information
        await fetchJournalEntries();
      }
    } catch (error: any) {
      toast({
        title: "Error refreshing journal entries",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return {
    journalEntries,
    loading,
    fetchJournalEntries,
    refreshJournalEntries,
  };
}
