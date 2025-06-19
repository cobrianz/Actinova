"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  User,
  Settings,
  ShoppingBag,
  Calendar,
  Users,
  FileText,
  HelpCircle,
  Building2,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ActinovaSidebar = ({
  activeTab,
  setActiveTab,
  user,
  accountType,
  supportTicketsCount,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileOpen(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const menuItems = [
    { id: "overview", label: "Dashboard Overview", icon: LayoutDashboard },
    {
      id: "profile",
      label: accountType === "company" ? "Company Info" : "Profile",
      icon: accountType === "company" ? Building2 : User,
    },
    { id: "services", label: "My Services", icon: Settings },
    { id: "resources", label: "Purchased Resources", icon: ShoppingBag },
    { id: "consultations", label: "Consultations & Bookings", icon: Calendar },
    { id: "networking", label: "Networking", icon: Users },
    { id: "documents", label: "Documents & Uploads", icon: FileText },
    {
      id: "support",
      label: "Support",
      icon: HelpCircle,
      badge: supportTicketsCount > 0 ? supportTicketsCount : null,
    },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const handleMenuClick = (itemId) => {
    setActiveTab(itemId);
    if (isMobile) {
      setIsMobileOpen(false);
    }
  };

  // Mobile Menu Button
  const MobileMenuButton = () => (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setIsMobileOpen(!isMobileOpen)}
      className="md:hidden fixed top-4 left-4 z-50 bg-[#1a1b2e] border border-[#7B68EE]/20 text-white hover:bg-[#7B68EE]/10"
    >
      {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
    </Button>
  );

  // Desktop Sidebar
  const DesktopSidebar = () => (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="hidden md:flex bg-gradient-to-b from-[#1a1b2e] to-[#0a0b1a] border-r border-[#7B68EE]/20 flex-col h-screen relative z-10"
    >
      {/* Header */}
      <div className="p-4 border-b border-[#7B68EE]/20">
        <div className="flex items-center justify-between">
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-[#7B68EE] to-[#9333EA] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-white">Actinova</h2>
                  <p className="text-xs text-zinc-400">Account Portal</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-zinc-400 hover:text-white hover:bg-[#7B68EE]/10"
          >
            {isCollapsed ? (
              <ChevronRight size={20} />
            ) : (
              <ChevronLeft size={20} />
            )}
          </Button>
        </div>
      </div>

      {/* User Info */}
      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="p-4 border-b border-[#7B68EE]/20"
          >
            <div className="flex items-center gap-3">
              <img
                src={user?.avatar || "/placeholder.svg?height=40&width=40"}
                alt={user?.name}
                className="w-10 h-10 rounded-full border-2 border-[#7B68EE]/30"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-white truncate">
                  {user?.name}
                </h3>
                <p className="text-xs text-zinc-400 truncate">{user?.email}</p>
                <Badge
                  variant="outline"
                  className="text-xs mt-1 border-[#7B68EE]/30 text-[#7B68EE]"
                >
                  {accountType === "company" ? "Company" : "Individual"}
                </Badge>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <li key={item.id}>
                <Button
                  variant="ghost"
                  onClick={() => handleMenuClick(item.id)}
                  className={`w-full justify-start gap-3 h-12 transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-[#7B68EE]/20 to-[#9333EA]/20 text-[#7B68EE] border border-[#7B68EE]/30"
                      : "text-zinc-400 hover:text-white hover:bg-[#7B68EE]/10"
                  } ${isCollapsed ? "px-3" : "px-4"}`}
                >
                  <Icon size={20} className="flex-shrink-0" />
                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center justify-between w-full overflow-hidden"
                      >
                        <span className="truncate">{item.label}</span>
                        {item.badge && (
                          <Badge
                            variant="secondary"
                            className="bg-red-500 text-white text-xs ml-2 flex-shrink-0"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[#7B68EE]/20">
        <Button
          variant="ghost"
          className={`w-full justify-start gap-3 h-12 text-zinc-400 hover:text-white hover:bg-red-500/10 transition-all duration-200 ${
            isCollapsed ? "px-3" : "px-4"
          }`}
        >
          <LogOut size={20} className="flex-shrink-0" />
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </div>
    </motion.div>
  );

  // Mobile Sidebar
  const MobileSidebar = () => (
    <AnimatePresence>
      {isMobileOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsMobileOpen(false)}
          />

          {/* Mobile Sidebar */}
          <motion.div
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden fixed left-0 top-0 h-full w-80 bg-gradient-to-b from-[#1a1b2e] to-[#0a0b1a] border-r border-[#7B68EE]/20 z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-[#7B68EE]/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-[#7B68EE] to-[#9333EA] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-white">Actinova</h2>
                  <p className="text-xs text-zinc-400">Account Portal</p>
                </div>
              </div>
            </div>

            {/* User Info */}
            <div className="p-4 border-b border-[#7B68EE]/20">
              <div className="flex items-center gap-3">
                <img
                  src={user?.avatar || "/placeholder.svg?height=40&width=40"}
                  alt={user?.name}
                  className="w-10 h-10 rounded-full border-2 border-[#7B68EE]/30"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-white truncate">
                    {user?.name}
                  </h3>
                  <p className="text-xs text-zinc-400 truncate">
                    {user?.email}
                  </p>
                  <Badge
                    variant="outline"
                    className="text-xs mt-1 border-[#7B68EE]/30 text-[#7B68EE]"
                  >
                    {accountType === "company" ? "Company" : "Individual"}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 overflow-y-auto">
              <ul className="space-y-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;

                  return (
                    <li key={item.id}>
                      <Button
                        variant="ghost"
                        onClick={() => handleMenuClick(item.id)}
                        className={`w-full justify-start gap-3 h-12 transition-all duration-200 ${
                          isActive
                            ? "bg-gradient-to-r from-[#7B68EE]/20 to-[#9333EA]/20 text-[#7B68EE] border border-[#7B68EE]/30"
                            : "text-zinc-400 hover:text-white hover:bg-[#7B68EE]/10"
                        }`}
                      >
                        <Icon size={20} />
                        <div className="flex items-center justify-between w-full">
                          <span>{item.label}</span>
                          {item.badge && (
                            <Badge
                              variant="secondary"
                              className="bg-red-500 text-white text-xs"
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </div>
                      </Button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-[#7B68EE]/20">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 h-12 text-zinc-400 hover:text-white hover:bg-red-500/10"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <MobileMenuButton />
      <DesktopSidebar />
      <MobileSidebar />
    </>
  );
};

export default ActinovaSidebar;
