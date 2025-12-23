"use client";

import { setCurrentContext } from "@/redux/auth/authSlice";
import { AppState } from "@/redux/store";
import { Roles } from "@/types/types";
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
    if (roles.length !== 1) return;

    const role = roles[0] as "Admin" | "Organizer" | "Member";

    dispatch(setCurrentContext(role));
    localStorage.setItem("currentContext", role);

    if (role === "Admin") router.push("/admin-panel");
    if (role === "Organizer") router.push("/organizer-panel");
    if (role === "Member") router.push("/member-panel");
  }, [roles, dispatch, router]);

  useEffect(() => {
    if (!currentContext) return;
    if (!roles.includes(currentContext)) {
      dispatch(setCurrentContext(null));
      localStorage.removeItem("currentContext");
    }
  }, [roles, currentContext, dispatch]);

  const handlePanel = (role: Roles) => {
    if (!role) return;

    dispatch(setCurrentContext(role));
    localStorage.setItem("currentContext", role);

    if (role === "Member") {
      router.push("/member-panel");
    }
    if (role === "Organizer") {
      router.push("/organizer-panel");
    }
    if (role === "Admin") {
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
              className="flex justify-center items-center bg-red-200 p-10 rounded-2xl hover:cursor-pointer hover:bg-red-300 transition-colors duration-300 w-50"
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
