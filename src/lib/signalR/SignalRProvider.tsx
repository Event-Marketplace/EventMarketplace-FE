"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import * as signalR from "@microsoft/signalr";
import { useSelector } from "react-redux";
import { AppState } from "@/redux/store";

const SignalRContext = createContext<signalR.HubConnection | null>(null);

export const SignalRProvider = ({ children }: { children: ReactNode }) => {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(
    null
  );
  const token = useSelector((state: AppState) => state.auth.accessToken);

  useEffect(() => {
    if (!token) return;

    const conn = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5141/eventHub", {
        accessTokenFactory: () => token,
        transport: signalR.HttpTransportType.WebSockets, // WebSockets zamiast LongPolling
      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    conn
      .start()
      .then(() => console.log("✅ SignalR connected", conn.connectionId))
      .catch((err) => console.error("❌ SignalR start error:", err));

    setConnection(conn);

    return () => {
      conn.stop().then(() => console.log("SignalR disconnected"));
    };
  }, [token]);

  return (
    <SignalRContext.Provider value={connection}>
      {children}
    </SignalRContext.Provider>
  );
};

export const useSignalR = () => useContext(SignalRContext);
