
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { useAuth } from "@/context/AuthContext";
import { 
  HelpCircle,
  Info, 
  LogOut, 
  ChevronRight,
  User,
  Cat,
  BookOpen,
  AlertCircle
} from "lucide-react";

const Settings = () => {
  const navigate = useNavigate();

  const settingsGroups = [
    {
      title: "Pet Family",
      items: [
        { 
          label: "Pawrent", 
          icon: User, // Changed to User icon
          path: "/pawrent",
          iconBackground: "bg-green-50" 
        },
        { 
          label: "Pets", 
          icon: Cat, // Changed to Cat icon
          path: "/pets",
          iconBackground: "bg-green-50" 
        }
      ]
    },
    {
      title: "Support",
      items: [
        { 
          label: "Help Center", 
          icon: BookOpen, // Changed to BookOpen icon
          path: "/help-center",
          iconBackground: "bg-green-50"
        },
        { 
          label: "About", 
          icon: AlertCircle, // Changed to AlertCircle icon
          path: "/about",
          iconBackground: "bg-green-50"
        }
      ]
    }
  ];

  const { signOut } = useAuth();

  const handleNavigation = (path: string) => {
    if (path === "/logout") {
      signOut();
    } else {
      navigate(path);
    }
  };

  return (
    <MainLayout>
      <div className="p-6 pb-24 bg-gray-50">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-[36px] font-bold font-rubik text-black tracking-tight">SETTINGS</h1>
          <p className="text-[15px] font-rubik text-gray-400 mt-1">Manage your apps preferences</p>
        </header>

        {/* Settings Groups */}
        <div className="space-y-8">
          {settingsGroups.map((group) => (
            <div key={group.title} className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-800 font-rubik">{group.title}</h2>
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                {group.items.map((item, index) => (
                  <div 
                    key={item.label}
                    className={`p-4 flex items-center justify-between cursor-pointer ${
                      index !== group.items.length - 1 ? "border-b border-gray-100" : ""
                    }`}
                    onClick={() => handleNavigation(item.path)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 bg-[#C5E6E2] rounded-full`}>
                        <item.icon className="text-[#43978D] h-5 w-5" />
                      </div>
                      <span className="font-medium text-gray-800 font-rubik">{item.label}</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Logout Button */}
          <div className="pt-6">
            <button 
              className="w-full flex items-center justify-center space-x-2 py-4 bg-pink-50 text-red-500 rounded-xl font-medium font-rubik"
              onClick={() => handleNavigation("/logout")}
            >
              <LogOut className="h-5 w-5 mr-2" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;
