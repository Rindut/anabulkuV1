
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/hooks/useProfile";

export const AuthRedirect = () => {
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading } = useProfile();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!authLoading && !profileLoading) {
      setIsReady(true);
    }
  }, [authLoading, profileLoading]);

  // Show loading state until we have all the information we need
  if (authLoading || (user && profileLoading) || !isReady) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  // If authenticated and has profile
  if (user && profile) {
    // Check if onboarding is completed
    if (profile.onboarding_completed) {
      // If onboarding is complete, go to homepage
      return <Navigate to="/" replace />;
    } else {
      // If onboarding is not complete, go to onboarding flow
      return <Navigate to="/onboarding/welcome" replace />;
    }
  }

  // If checking is done and user is not authenticated, don't redirect
  return null;
};
