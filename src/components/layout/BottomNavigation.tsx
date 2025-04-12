
import { Home, PawPrint, Plus, BookOpen, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const BottomNavigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { label: "Home", icon: Home, path: "/" },
    { label: "Pet Care", icon: PawPrint, path: "/pet-care" },
    { label: "Add Record", icon: Plus, path: "/add-record" },
    { label: "Journal", icon: BookOpen, path: "/journal" },
    { label: "Settings", icon: Settings, path: "/settings" },
  ];

  const isActive = (path: string) => currentPath === path;

  return (
    <div className="fixed bottom-0 w-full max-w-md left-1/2 transform -translate-x-1/2 px-5 pb-2">
      <div className="flex items-center justify-around bg-petapp-green rounded-full shadow-md py-1.5">
        {navItems.map((item, index) => {
          const active = isActive(item.path);
          
          return (
            <Link 
              key={item.path} 
              to={item.path} 
              className="flex flex-col items-center px-2"
            >
              <div className="h-5 w-5 flex items-center justify-center">
                <item.icon 
                  className={`${active ? "text-white" : "text-white/70"} h-4 w-4`} 
                />
              </div>
              <span 
                className={`text-[9px] mt-0.5 ${
                  active ? "text-white font-bold" : "text-white/70"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
