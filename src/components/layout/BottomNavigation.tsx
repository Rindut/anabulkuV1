
import { Home, ClipboardList, Stethoscope, Footprints, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const BottomNavigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { label: "Home", icon: Home, path: "/" },
    { label: "Pet Care", icon: ClipboardList, path: "/pet-care" },
    { label: "Add Record", icon: Stethoscope, path: "/add-record" },
    { label: "Journal", icon: Footprints, path: "/journal" },
    { label: "Settings", icon: Settings, path: "/settings" },
  ];

  const isActive = (path: string) => currentPath === path;

  return (
    <div className="fixed bottom-0 w-full max-w-md left-1/2 transform -translate-x-1/2 px-4 pb-1">
      <div className="flex items-center justify-around bg-petapp-green rounded-full shadow-md py-2">
        {navItems.map((item, index) => {
          const active = isActive(item.path);
          // Special styling for middle item (Add Record)
          const isMiddle = index === 2;
          
          return (
            <Link 
              key={item.path} 
              to={item.path} 
              className={`flex flex-col items-center ${isMiddle ? "px-4" : "px-2"}`}
            >
              <div 
                className={`flex items-center justify-center rounded-full ${
                  isMiddle ? "h-14 w-14 bg-petapp-green shadow-inner -mt-8" : "h-6 w-6"
                }`}
              >
                <item.icon 
                  className={`${active ? "text-petapp-white" : "text-petapp-inactive"} ${
                    isMiddle ? "h-8 w-8" : "h-5 w-5"
                  }`} 
                />
              </div>
              <span 
                className={`text-xs mt-1 ${
                  active ? "text-petapp-white font-bold" : "text-petapp-inactive"
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
