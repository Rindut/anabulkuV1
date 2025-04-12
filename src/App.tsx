import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/layout/ScrollToTop";
import NotFound from "./pages/NotFound";

// Auth & Onboarding Pages
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Welcome from "./pages/onboarding/Welcome";
import CreateParent from "./pages/onboarding/CreateParent";
import ParentCreated from "./pages/onboarding/ParentCreated";
import CreatePet from "./pages/onboarding/CreatePet";
import PetCreated from "./pages/onboarding/PetCreated";

// Main App Pages
import Home from "./pages/Home";
import PetCare from "./pages/PetCare";
import AddRecord from "./pages/AddRecord";
import Journal from "./pages/Journal";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <ScrollToTop />
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          {/* Auth & Onboarding Routes */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/onboarding" element={<Welcome />} />
          <Route path="/onboarding/create-parent" element={<CreateParent />} />
          <Route path="/onboarding/parent-created" element={<ParentCreated />} />
          <Route path="/onboarding/create-pet" element={<CreatePet />} />
          <Route path="/onboarding/pet-created" element={<PetCreated />} />
          
          {/* Main App Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/pet-care" element={<PetCare />} />
          <Route path="/add-record" element={<AddRecord />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/settings" element={<Settings />} />
          
          {/* Catch-all Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
