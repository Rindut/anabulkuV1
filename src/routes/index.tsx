
import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";

// Layouts
import { MainLayout } from "@/components/layout/MainLayout";

// Pages
import Home from "@/pages/Home";
import About from "@/pages/About";
import HelpCenter from "@/pages/HelpCenter";
import NotFound from "@/pages/NotFound";
import Settings from "@/pages/Settings";
import SignIn from "@/pages/SignIn";
import SignUp from "@/pages/SignUp";
import Pawrent from "@/pages/Pawrent";
import Pets from "@/pages/Pets";
import PetCare from "@/pages/PetCare";
import AddRecord from "@/pages/AddRecord";
import Journal from "@/pages/Journal";

// Onboarding pages
import Welcome from "@/pages/onboarding/Welcome";
import CreateParent from "@/pages/onboarding/CreateParent";
import CreatePet from "@/pages/onboarding/CreatePet";
import ParentCreated from "@/pages/onboarding/ParentCreated";
import PetCreated from "@/pages/onboarding/PetCreated";

// New pages
const EditPet = lazy(() => import("@/pages/EditPet"));
const PetDetails = lazy(() => import("@/pages/PetDetails"));

export default function AppRoutes() {
  return (
    <AuthProvider>
      <Suspense fallback={
        <div className="flex h-screen w-full items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      }>
        <Routes>
          {/* Public routes */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
            
          {/* Onboarding routes */}
          <Route 
            path="/onboarding/welcome" 
            element={
              <ProtectedRoute>
                <Welcome />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/onboarding/create-parent" 
            element={
              <ProtectedRoute>
                <CreateParent />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/onboarding/create-pet" 
            element={
              <ProtectedRoute>
                <CreatePet />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/onboarding/parent-created" 
            element={
              <ProtectedRoute>
                <ParentCreated />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/onboarding/pet-created" 
            element={
              <ProtectedRoute>
                <PetCreated />
              </ProtectedRoute>
            } 
          />
            
          {/* Protected routes */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/pets" 
            element={
              <ProtectedRoute>
                <Pets />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/pet-details/:id" 
            element={
              <ProtectedRoute>
                <PetDetails />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/edit-pet/:id" 
            element={
              <ProtectedRoute>
                <EditPet />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/help-center" 
            element={
              <ProtectedRoute>
                <HelpCenter />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/about" 
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/pawrent" 
            element={
              <ProtectedRoute>
                <Pawrent />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/pet-care" 
            element={
              <ProtectedRoute>
                <PetCare />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/add-record" 
            element={
              <ProtectedRoute>
                <AddRecord />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/journal" 
            element={
              <ProtectedRoute>
                <Journal />
              </ProtectedRoute>
            } 
          />
            
          {/* Fallback routes */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}
