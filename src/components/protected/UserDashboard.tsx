"use client";

import { setCurrentContext } from "@/redux/auth/authSlice";
import { AppState } from "@/redux/store";
import { stat } from "fs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const UserDashboard = () => {
  const router = useRouter();
  const roles = useSelector((state: AppState) => state.auth.roles);
  const email = useSelector((state: AppState) => state.auth.userEmail);
  const token = useSelector((state: AppState) => state.auth.accessToken);
  const currentContext = useSelector(
    (state: AppState) => state.auth.currentContext
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentContext === null) dispatch(setCurrentContext(null));
    if (roles.length === 1) {
      if (roles.includes("Organizer")) router.push("/organizer-panel");
      if (roles.includes("Admin")) router.push("/admin-panel");
      if (roles.includes("Member")) router.push("/member-panel");
    }
  }, []);

  const handlePanel = (role: string) => {
    if (role === "Member") {
      dispatch(setCurrentContext("Member"));
      localStorage.setItem("currentContext", "Member");
      router.push("/member-panel");
    }
    if (role === "Organizer") {
      dispatch(setCurrentContext("Organizer"));
      localStorage.setItem("currentContext", "Organizer");
      router.push("/organizer-panel");
    }
    if (role === "Admin") {
      dispatch(setCurrentContext("Admin"));
      localStorage.setItem("currentContext", "Admin");
      router.push("/admin-panel");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-gray-200 gap-15 py-25">
      <div className="flex text-2xl gap-3">
        Zalogowałeś się na konto <strong className="italic">{email}</strong>
      </div>
      <div className="flex flex-col gap-4 items-center">
        <div className="text-lg">Wybierz rolę na którą chcesz wejść</div>
        <div className="flex gap-10 text-2xl">
          {roles.map((item, index) => (
            <div
              key={index}
              className="bg-red-200 p-10 rounded-2xl hover:cursor-pointer hover:bg-red-300 transition-colors duration-300"
              onClick={() => {
                handlePanel(item);
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
