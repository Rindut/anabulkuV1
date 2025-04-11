
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { 
  User, 
  Bell, 
  Lock, 
  HelpCircle, 
  Info, 
  LogOut, 
  ChevronRight 
} from "lucide-react";

const Settings = () => {
  const [notifications, setNotifications] = useState(true);

  const settingsGroups = [
    {
      title: "Account",
      items: [
        { label: "Profile", icon: User, path: "/profile" },
        { label: "Notifications", icon: Bell, path: "/notifications", toggle: true, toggled: notifications },
        { label: "Privacy & Security", icon: Lock, path: "/privacy" }
      ]
    },
    {
      title: "Support",
      items: [
        { label: "Help Center", icon: HelpCircle, path: "/help" },
        { label: "About", icon: Info, path: "/about" }
      ]
    }
  ];

  const handleToggle = (setting: string) => {
    if (setting === "Notifications") {
      setNotifications(!notifications);
    }
  };

  return (
    <MainLayout>
      <div className="p-6 pb-24">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-5xl font-bold text-gray-900">SETTINGS</h1>
          <p className="text-xl text-gray-400">Manage your app preferences</p>
        </header>

        {/* Settings Groups */}
        <div className="space-y-8">
          {settingsGroups.map((group) => (
            <div key={group.title} className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-700">{group.title}</h2>
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                {group.items.map((item, index) => (
                  <div 
                    key={item.label}
                    className={`p-4 flex items-center justify-between ${
                      index !== group.items.length - 1 ? "border-b border-gray-100" : ""
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-petapp-mint bg-opacity-20 rounded-full">
                        <item.icon className="text-petapp-green h-5 w-5" />
                      </div>
                      <span className="font-medium text-gray-800">{item.label}</span>
                    </div>
                    {item.toggle ? (
                      <button 
                        onClick={() => handleToggle(item.label)}
                        className={`w-12 h-6 rounded-full relative ${
                          item.toggled ? "bg-petapp-green" : "bg-gray-300"
                        }`}
                      >
                        <span 
                          className={`absolute top-1 transition-all w-4 h-4 rounded-full bg-white ${
                            item.toggled ? "left-7" : "left-1"
                          }`} 
                        />
                      </button>
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Logout Button */}
          <div className="pt-6">
            <button className="w-full flex items-center justify-center space-x-2 py-4 bg-red-50 text-red-600 rounded-xl font-medium">
              <LogOut className="h-5 w-5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;
