
import { ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/hooks/useProfile";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading, fetchProfile } = useProfile();
  const location = useLocation();
  const [isCheckingOnboarding, setIsCheckingOnboarding] = useState(true);

  // Check if the current path is an onboarding path
  const isOnboardingPath = location.pathname.startsWith("/onboarding");

  useEffect(() => {
    // If we have a user but no profile data, fetch it
    if (user && !profileLoading && !profile) {
      console.log("ProtectedRoute: Fetching profile for user", user.id);
      fetchProfile();
    }
  }, [user, profile, profileLoading, fetchProfile]);

  useEffect(() => {
    // Only perform the check if we have both user and profile data (or know user doesn't exist)
    if (!authLoading && (!user || !profileLoading)) {
      console.log("ProtectedRoute: Finished checking", { user, profileLoading, profile });
      setIsCheckingOnboarding(false);
    }
  }, [authLoading, profileLoading, user, profile]);

  if (authLoading || (user && profileLoading) || isCheckingOnboarding) {
    console.log("ProtectedRoute: Showing loading state", { authLoading, profileLoading, isCheckingOnboarding });
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  // If not authenticated, redirect to sign in
  if (!user) {
    console.log("ProtectedRoute: Redirecting to signin - not authenticated");
    return <Navigate to="/signin" replace />;
  }

  // Check onboarding status for non-onboarding routes
  if (!isOnboardingPath && profile && profile.onboarding_completed === false) {
    console.log("ProtectedRoute: Redirecting to onboarding - onboarding incomplete");
    return <Navigate to="/onboarding/welcome" replace />;
  }

  // All checks passed, render the component
  console.log("ProtectedRoute: Rendering protected content");
  return <>{children}</>;
};
