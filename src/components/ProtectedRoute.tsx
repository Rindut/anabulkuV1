
import { ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/hooks/useProfile";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();
  const { profile, loading: profileLoading } = useProfile();
  const location = useLocation();
  const [isCheckingOnboarding, setIsCheckingOnboarding] = useState(true);

  // Check if the current path is an onboarding path
  const isOnboardingPath = location.pathname.startsWith("/onboarding");

  useEffect(() => {
    // Only perform the check if we have both user and profile data
    if (!loading && !profileLoading) {
      setIsCheckingOnboarding(false);
    }
  }, [loading, profileLoading, user, profile]);

  if (loading || profileLoading || isCheckingOnboarding) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  // If not authenticated, redirect to sign in
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  // Check onboarding status for non-onboarding routes
  if (!isOnboardingPath && profile && profile.onboarding_completed === false) {
    return <Navigate to="/onboarding/welcome" replace />;
  }

  // All checks passed, render the component
  return <>{children}</>;
};
