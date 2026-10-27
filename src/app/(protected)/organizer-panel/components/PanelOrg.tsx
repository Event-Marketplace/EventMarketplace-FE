"use client";

import Image from "next/image";
import avatarIcon from "@/images/userProfile/avatar.svg";
import { useEffect, useState } from "react";
import { apiAxios } from "@/lib/apiAxios";
import { User } from "@/services/getUserFromToken";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { useSelector } from "react-redux";
import { AppState } from "@/redux/store";

interface UserResponse {
  id: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  city: string | null;
  street: string | null;
  postalCode: string | null;
  number: string | null;
  registrationDate: string;
}

const PanelOrg = () => {
  const [userData, setUserData] = useState<UserResponse>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const userEmail = useSelector((state: AppState) => state.auth.userEmail);

  useEffect(() => {
    if (!userEmail) return;
    setLoading(true);
    const fetchUserInfo = async () => {
      try {
        const res = await apiAxios.get<UserResponse>("User/user-info", {
          params: {
            email: userEmail,
          },
        });

        setUserData(res.data);
        setLoading(false);
      } catch {
        console.error(
          "Błąd podczas pobierania danych zalogowanego użytkownika."
        );
      }
    };

    fetchUserInfo();
  }, [userEmail]);

  const handleNav = (item: string) => {
    if (item === "Dodaj wydarzenie") {
      router.push("/event/create");
    } else if (item === "Moje wydarzenia") {
      router.push("event/list");
    }
  };

  const items = [
    "Moje wydarzenia",
    "Dodaj wydarzenie",
    "Statystyki",
    "Powiadomienia",
  ];
  if (loading) return <p className="text-center py-10">Ładowanie panelu...</p>;

  if (userData) {
    return (
      <div className="max-w-[1920px] mx-auto">
        <div>
          <p className="text-2xl p-6">
            <strong>Informacje o koncie / akcje</strong>
          </p>
          <div className="w-full flex justify-between gap-4 p-6 border-b">
            <div className="flex flex-col justify-center items-center w-1/4">
              <Image src={avatarIcon} alt="avatar" width={300} />
              <p>
                Adres e-mail: <strong>{userData.email}</strong>
              </p>
              <p>
                Imię i nazwisko:{" "}
                <strong>
                  {userData.firstName} {userData.lastName}
                </strong>
              </p>
              <p>
                Numer telefonu: <strong>{userData.phoneNumber}</strong>
              </p>
              <p>
                Miejscowość: <strong> {userData.city}</strong>
              </p>
              <p>
                Zarejestrowano:{" "}
                <strong>
                  {new Date(userData.registrationDate).toLocaleDateString(
                    "pl-PL"
                  )}
                </strong>
              </p>
            </div>
            <div className="flex flex-wrap xl:flex-nowrap xl:px-20 justify-center items-center items-center w-3/4 gap-5">
              {items.map((item, index) => (
                <div
                  onClick={() => handleNav(item)}
                  key={index}
                  className="bg-red-400 border-red-500 border-5 rounded-lg w-1/4 h-1/4 flex justify-center items-center text-2xl hover:bg-red-500 hover:text-white cursor-pointer transition-colors duration-300"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <p className="text-2xl p-6">
            <strong>Statystyki</strong>
          </p>
          <div className="w-full flex justify-between gap-4 p-6 border-b">
            <div className="flex flex-col justify-center items-center w-1/4">
              <p>tutaj dane</p>
              <p>tutaj dane</p>
              <p>tutaj dane</p>
              <p>tutaj dane</p>
              <p>tutaj dane</p>
            </div>
            <div className="flex flex-col justify-center items-center w-1/4">
              <p>tutaj dane</p>
              <p>tutaj dane</p>
              <p>tutaj dane</p>
              <p>tutaj dane</p>
              <p>tutaj dane</p>
            </div>
            <div className="flex flex-col justify-center items-center w-1/4">
              <p>tutaj dane</p>
              <p>tutaj dane</p>
              <p>tutaj dane</p>
              <p>tutaj dane</p>
              <p>tutaj dane</p>
            </div>
          </div>
        </div>

        <div>
          <p className="text-2xl p-6">
            <strong>Powiadomienia</strong>
          </p>
          <div className="w-full flex justify-between gap-4 p-6 border-b">
            <div className="flex flex-col justify-center items-center w-1/4">
              <p>tutaj dane</p>
              <p>tutaj dane</p>
              <p>tutaj dane</p>
              <p>tutaj dane</p>
              <p>tutaj dane</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default PanelOrg;
