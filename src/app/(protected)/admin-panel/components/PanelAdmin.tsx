"use client";

import ButtonEM from "@/components/ui/ButtonEM";
import { apiAxios } from "@/lib/apiAxios";
import { AdminStats } from "@/types/types";
import { stat } from "fs";
import { useEffect, useState } from "react";
import AdminStatsCard from "./AdminStatsCard";
import AdminAlertsCard from "./AdminAlertsCard";

const PanelAdmin = () => {
  const [stats, setStats] = useState<AdminStats>();

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

  const handleEvents = () => {
    console.log("wydarzenia");
  };

  const handleOrganizers = () => {
    console.log("organizatorzy");
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

  if (stats) {
    return (
      <div className="flex flex-col gap-15 max-w-[1920px] mx-auto">
        <div className="flex p-5 bg-red-900/40 rounded-md shadow-inner">
          <div className="flex w-full gap-10">
            {actionButtons.map((btn, index) => (
              <ButtonEM
                type="button"
                key={index}
                kind="secondary"
                text={btn.label}
                onClick={btn.handle}
                style={{ width: "100%" }}
              />
            ))}
          </div>
        </div>
        <div className="space-y-10">
          <hr />
          <AdminStatsCard stats={stats} />
          <hr />
          <AdminAlertsCard />
        </div>
      </div>
    );
  }
};

export default PanelAdmin;
