
import { ReactNode } from "react";
import { BottomNavigation } from "./BottomNavigation";

interface MainLayoutProps {
  children: ReactNode;
  hideNavigation?: boolean;
}

export const MainLayout = ({ children, hideNavigation = false }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-petapp-white">
      <main className="flex-1 pb-20 relative max-w-md mx-auto w-full">
        {children}
      </main>
      {!hideNavigation && <BottomNavigation />}
    </div>
  );
};
