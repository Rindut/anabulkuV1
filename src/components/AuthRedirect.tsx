
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/hooks/useProfile";

export const AuthRedirect = () => {
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading, fetchProfile } = useProfile();
  const [isReady, setIsReady] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // If we have a user but no profile yet, fetch the profile
    if (user && !profileLoading && !profile) {
      console.log("AuthRedirect: Fetching profile for user", user.id);
      fetchProfile();
    }
  }, [user, profileLoading, profile, fetchProfile]);

  useEffect(() => {
    if (!authLoading && (!user || !profileLoading)) {
      console.log("AuthRedirect: Ready to redirect", { user, profileLoading, profile });
      setIsReady(true);
    }
  }, [authLoading, profileLoading, user, profile]);

  // Show loading state until we have all the information we need
  if (authLoading || (user && profileLoading) || !isReady) {
    console.log("AuthRedirect: Showing loading state", { authLoading, profileLoading, isReady });
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  console.log("AuthRedirect: Decision point", { user, profile });

  // If authenticated and has profile
  if (user && profile) {
    // Check if onboarding is completed
    if (profile.onboarding_completed) {
      console.log("AuthRedirect: Redirecting to home - onboarding complete");
      // If onboarding is complete, go to homepage
      return <Navigate to="/" replace />;
    } else {
      console.log("AuthRedirect: Redirecting to onboarding - onboarding incomplete");
      // If onboarding is not complete, go to onboarding flow
      return <Navigate to="/onboarding/welcome" replace />;
    }
  }

  // If on an auth page, don't redirect
  if (location.pathname === '/signin' || location.pathname === '/signup') {
    console.log("AuthRedirect: Already on auth page, no redirect");
    return null;
  }

  // If checking is done and user is not authenticated, redirect to sign in
  console.log("AuthRedirect: Redirecting to signin - not authenticated");
  return <Navigate to="/signin" replace />;
};
