
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";

export type PetCareRecord = {
  id: string;
  pet_id: string;
  care_type: string;
  care_type_label?: string;
  date: string;
  notes?: string;
  created_at: string;
  updated_at: string;
};

export function usePetCareRecords() {
  const [records, setRecords] = useState<PetCareRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchRecords();
    }
  }, [user]);

  async function fetchRecords() {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from("pet_care_records")
        .select(`
          *,
          pets:pet_id (
            name
          )
        `)
        .order("date", { ascending: false });
      
      if (error) {
        throw error;
      }
      
      if (data) {
        const formattedRecords = data.map(record => ({
          ...record,
          petName: record.pets.name,
        }));
        setRecords(formattedRecords);
      }
    } catch (error: any) {
      toast({
        title: "Error fetching pet care records",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  async function fetchRecordsByPet(petId: string) {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from("pet_care_records")
        .select(`
          *,
          pets:pet_id (
            name
          )
        `)
        .eq("pet_id", petId)
        .order("date", { ascending: false });
      
      if (error) {
        throw error;
      }
      
      if (data) {
        const formattedRecords = data.map(record => ({
          ...record,
          petName: record.pets.name,
        }));
        return formattedRecords;
      }
      
      return [];
    } catch (error: any) {
      toast({
        title: "Error fetching pet care records",
        description: error.message,
        variant: "destructive",
      });
      return [];
    } finally {
      setLoading(false);
    }
  }

  async function addRecord(recordData: Omit<PetCareRecord, "id" | "created_at" | "updated_at">) {
    try {
      const { data, error } = await supabase
        .from("pet_care_records")
        .insert([recordData])
        .select();

      if (error) {
        throw error;
      }

      if (data) {
        await fetchRecords(); // Refresh the records to get the updated list with pet names
        return data[0];
      }
      
      return null;
    } catch (error: any) {
      toast({
        title: "Error adding record",
        description: error.message,
        variant: "destructive",
      });
      return null;
    }
  }

  return {
    records,
    loading,
    fetchRecords,
    fetchRecordsByPet,
    addRecord,
  };
}
