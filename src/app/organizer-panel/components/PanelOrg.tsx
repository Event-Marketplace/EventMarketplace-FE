"use client";

import Image from "next/image";
import avatarIcon from "@/images/userProfile/avatar.svg";

const PanelOrg = () => {
  const items = [
    "Moje wydarzenia",
    "Dodaj wydarzenie",
    "Statystyki",
    "Powiadomienia",
  ];

  return (
    <>
      <div>
        <p className="text-2xl p-6">
          <strong>Informacje o koncie / akcje</strong>
        </p>
        <div className="w-full flex justify-between gap-4 p-6 border-b">
          <div className="flex flex-col justify-center items-center w-1/4">
            <Image src={avatarIcon} alt="avatar" width={300} />
            <p>tutaj dane</p>
            <p>tutaj dane</p>
            <p>tutaj dane</p>
            <p>tutaj dane</p>
            <p>tutaj dane</p>
          </div>
          <div className="flex flex-wrap xl:flex-nowrap xl:px-20 justify-center items-center items-center w-3/4 gap-5">
            {items.map((item, index) => (
              <div
                key={index}
                className="bg-red-400 border-red-500 border-5 rounded-lg w-1/4 h-1/4 flex justify-center items-center text-2xl hover:bg-red-500 hover:text-white cursor-pointer"
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
    </>
  );
};

export default PanelOrg;
