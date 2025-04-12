
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
    <div className="fixed bottom-0 w-full max-w-md left-1/2 transform -translate-x-1/2 px-3 pb-1">
      <div className="flex items-center justify-around bg-petapp-green rounded-full shadow-md py-1.5">
        {navItems.map((item, index) => {
          const active = isActive(item.path);
          // Special styling for middle item (Add Record)
          const isMiddle = index === 2;
          
          return (
            <Link 
              key={item.path} 
              to={item.path} 
              className={`flex flex-col items-center ${isMiddle ? "px-3" : "px-2"}`}
            >
              <div 
                className={`flex items-center justify-center rounded-full ${
                  isMiddle ? "h-12 w-12 bg-petapp-green shadow-inner -mt-6" : "h-5 w-5"
                }`}
              >
                <item.icon 
                  className={`${active ? "text-petapp-white" : "text-petapp-inactive"} ${
                    isMiddle ? "h-7 w-7" : "h-4 w-4"
                  }`} 
                />
              </div>
              <span 
                className={`text-[10px] mt-0.5 ${
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
