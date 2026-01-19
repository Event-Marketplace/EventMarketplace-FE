"use client";

import { useState } from "react";
import AdminEventList from "./AdminEventList";
import { SignalRProvider } from "@/lib/signalR/SignalRProvider";

export enum Tabs {
  Pending = "Pending",
  Approved = "Approved",
  Rejected = "Rejected",
  All = "All",
}

const EventTabs = () => {
  const [activeTab, setActiveTab] = useState<Tabs>(Tabs.Pending);
  const [pendingCount, setPendingCount] = useState<number>();

  return (
    <div className="max-w-[1920px] mx-auto">
      <div className="flex border-b">
        <button
          className={`px-4 py-2 ${
            activeTab === Tabs.Pending
              ? "border-b-2 border-blue-500 font-bold"
              : ""
          }`}
          onClick={() => setActiveTab(Tabs.Pending)}
        >
          Oczekujące {pendingCount !== undefined && `(${pendingCount})`}
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === Tabs.Approved
              ? "border-b-2 border-blue-500 font-bold"
              : ""
          }`}
          onClick={() => setActiveTab(Tabs.Approved)}
        >
          Zatwierdzone
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === Tabs.Rejected
              ? "border-b-2 border-blue-500 font-bold"
              : ""
          }`}
          onClick={() => setActiveTab(Tabs.Rejected)}
        >
          Odrzucone
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === Tabs.All ? "border-b-2 border-blue-500 font-bold" : ""
          }`}
          onClick={() => setActiveTab(Tabs.All)}
        >
          Wszystkie
        </button>
      </div>

      <SignalRProvider>
        <div className="mt-4">
          {activeTab === Tabs.Pending && (
            <AdminEventList tab={activeTab} handleCount={setPendingCount} />
          )}
          {activeTab === Tabs.Approved && <AdminEventList tab={activeTab} />}
          {activeTab === Tabs.Rejected && <AdminEventList tab={activeTab} />}
          {activeTab === Tabs.All && <AdminEventList tab={activeTab} />}
        </div>
      </SignalRProvider>
    </div>
  );
};

export default EventTabs;
