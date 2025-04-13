
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";

export type Pet = {
  id: string;
  name: string;
  pet_type: string;
  gender: string;
  age: number;
  breed?: string;
  vaccination?: string;
  active: boolean;
  created_at: string;
  updated_at: string;
};

export function usePets() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchPets();
    }
  }, [user]);

  async function fetchPets() {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from("pets")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) {
        throw error;
      }
      
      if (data) {
        setPets(data);
      }
    } catch (error: any) {
      toast({
        title: "Error fetching pets",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  async function addPet(petData: Omit<Pet, "id" | "created_at" | "updated_at"> & { owner_id: string }) {
    try {
      const { data, error } = await supabase
        .from("pets")
        .insert(petData)
        .select();

      if (error) {
        throw error;
      }

      if (data) {
        setPets((prev) => [data[0], ...prev]);
        return data[0];
      }
      
      return null;
    } catch (error: any) {
      toast({
        title: "Error adding pet",
        description: error.message,
        variant: "destructive",
      });
      return null;
    }
  }

  async function updatePet(id: string, petData: Partial<Pet>) {
    try {
      const { data, error } = await supabase
        .from("pets")
        .update(petData)
        .eq("id", id)
        .select();

      if (error) {
        throw error;
      }

      if (data) {
        setPets((prev) => 
          prev.map((pet) => (pet.id === id ? { ...pet, ...data[0] } : pet))
        );
        return data[0];
      }
      
      return null;
    } catch (error: any) {
      toast({
        title: "Error updating pet",
        description: error.message,
        variant: "destructive",
      });
      return null;
    }
  }

  async function getPet(id: string) {
    try {
      const { data, error } = await supabase
        .from("pets")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error: any) {
      toast({
        title: "Error fetching pet",
        description: error.message,
        variant: "destructive",
      });
      return null;
    }
  }

  return {
    pets,
    loading,
    fetchPets,
    addPet,
    updatePet,
    getPet,
  };
}
