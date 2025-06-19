"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Toaster } from "sonner";
import ActinovaSidebar from "./actinova-account/sidebar";
import DashboardOverview from "./actinova-account/dashboard-overview";
import ProfileManagement from "./actinova-account/profile-management";
import ServicesManagement from "./actinova-account/services-management";
import ResourcesManagement from "./actinova-account/resources-management";
import ConsultationsManagement from "./actinova-account/consultations-management";
import Networking from "./actinova-account/networking";
import DocumentsManagement from "./actinova-account/documents-management";
import SupportManagement from "./actinova-account/support-management";
import SettingsManagement from "./actinova-account/settings-management";
import { userProfile, supportTickets } from "../lib/actinova-account-data";

const ActinovaAccount = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [accountType, setAccountType] = useState("individual");
  const [isClient, setIsClient] = useState(false);

  // Ensure client-side rendering for animations
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Safely calculate open support tickets with fallback
  const openSupportTickets = (supportTickets || []).filter(
    (ticket) => ticket?.status === "open"
  ).length;

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <DashboardOverview user={userProfile} accountType={accountType} />
        );
      case "profile":
        return (
          <ProfileManagement
            accountType={accountType}
            setAccountType={setAccountType}
          />
        );
      case "services":
        return <ServicesManagement />;
      case "resources":
        return <ResourcesManagement />;
      case "consultations":
        return <ConsultationsManagement />;
      case "networking":
        return <Networking />;
      case "documents":
        return <DocumentsManagement />;
      case "support":
        return <SupportManagement />;
      case "settings":
        return <SettingsManagement />;
      default:
        return (
          <DashboardOverview user={userProfile} accountType={accountType} />
        );
    }
  };

  return (
    <div className="relative w-full bg-gradient-to-br from-[#0a0b1a] via-[#0d0f20] to-[#1a0b2e] text-white min-h-screen flex">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {isClient && (
          <>
            <motion.div
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7B68EE]/10 rounded-full blur-3xl"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#9333EA]/10 rounded-full blur-3xl"
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#7B68EE]/5 via-transparent to-[#9333EA]/5"></div>
          </>
        )}
      </div>

      {/* Sidebar */}
      <ActinovaSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={userProfile}
        accountType={accountType}
        supportTicketsCount={openSupportTickets}
      />

      {/* Main Content */}
      <div className="flex-1 relative z-10">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-8"
        >
          {renderContent()}
        </motion.div>
      </div>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1a1b2e",
            border: "1px solid rgba(123, 104, 238, 0.2)",
            color: "white",
          },
        }}
      />
    </div>
  );
};

export default ActinovaAccount;
