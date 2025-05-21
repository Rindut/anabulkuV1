
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/hooks/use-toast";

export type Profile = {
  id: string;
  name: string;
  gender?: string;
  email?: string;
  phone?: string;
  onboarding_completed?: boolean;
  created_at: string;
  updated_at: string;
};

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!user) {
        setProfile(null);
        return;
      }
      
      console.log("Fetching profile for user ID:", user.id);
      
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();
      
      if (error) {
        console.error("Error fetching profile:", error);
        throw error;
      }
      
      console.log("Profile fetch result:", data);
      
      if (data) {
        setProfile(data);
      } else {
        console.log("No profile found for user ID:", user.id);
        setProfile(null);
      }
    } catch (err: any) {
      console.error("Profile fetch error:", err);
      setError(err);
      toast({
        title: "Error fetching profile",
        description: err.message || "Could not load your profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchProfile();
    } else {
      setProfile(null);
      setLoading(false);
    }
  }, [user, fetchProfile]);

  async function updateProfile(profileData: Partial<Profile>) {
    try {
      if (!user) return null;
      
      const { data, error } = await supabase
        .from("profiles")
        .update(profileData)
        .eq("id", user.id)
        .select();

      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        setProfile(data[0]);
        return data[0];
      }
      
      return null;
    } catch (error: any) {
      toast({
        title: "Error updating profile",
        description: error.message,
        variant: "destructive",
      });
      return null;
    }
  }

  async function completeOnboarding() {
    return updateProfile({ onboarding_completed: true });
  }

  return {
    profile,
    loading,
    error,
    fetchProfile,
    updateProfile,
    completeOnboarding,
  };
}
