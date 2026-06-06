"use client";

import ButtonEM from "@/components/ui/ButtonEM";
import { apiAxios } from "@/lib/apiAxios";
import { AdminAlerts, AdminStats } from "@/types/types";
import { stat } from "fs";
import { useEffect, useState } from "react";
import AdminStatsCard from "./AdminStatsCard";
import AdminAlertsCard from "./AdminAlertsCard";
import { useRouter } from "next/navigation";

const PanelAdmin = () => {
  const [stats, setStats] = useState<AdminStats>();
  const [alerts, setAlerts] = useState<AdminAlerts>();
  const router = useRouter();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await apiAxios.get("Admin/statistics");
        setStats(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await apiAxios.get("Admin/alerts");
        setAlerts(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAlerts();
  }, []);

  const handleEvents = () => {
    router.push("/admin-panel/events");
  };

  const handleOrganizers = () => {
    router.push("/admin-panel/organizers");
  };

  const handleSettings = () => {
    console.log("ustawienia");
  };

  const handleAlerts = () => {
    console.log("powiadomienia");
  };

  const handleProfile = () => {
    console.log("profil");
  };

  const actionButtons = [
    { label: "Wydarzenia", handle: handleEvents },
    { label: "Organizatorzy", handle: handleOrganizers },
    { label: "Ustawienia", handle: handleSettings },
    { label: "Powiadomienia", handle: handleAlerts },
    { label: "Profil", handle: handleProfile },
  ];

  return (
    <div className="flex flex-col gap-15 max-w-[1920px] mx-auto">
      <div className="flex flex-col gap-5 p-5 bg-red-900/40 rounded-md shadow-inner py-10">
        <label className="text-white font-semibold italic text-2xl sm:text-3xl md:text-4xl flex justify-center">
          Panel Administratora
        </label>
        <hr />
        <div className="flex w-full justify-center gap-5 flex-wrap">
          {actionButtons.map((btn, index) => (
            <ButtonEM
              type="button"
              key={index}
              kind="secondary"
              text={btn.label}
              onClick={btn.handle}
            />
          ))}
        </div>
      </div>
      <div className="space-y-10">
        <hr />
        {stats && <AdminStatsCard stats={stats} />}
        <hr />
        <AdminAlertsCard alerts={alerts} />
        <hr />
      </div>
    </div>
  );
};

export default PanelAdmin;
