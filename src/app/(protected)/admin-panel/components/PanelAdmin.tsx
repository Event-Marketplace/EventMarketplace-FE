"use client";

import ButtonEM from "@/components/ui/ButtonEM";

const PanelAdmin = () => {
  return (
    <div className="flex flex-col gap-15 max-w-[1920px] mx-auto">
      <div className="shadow-2xl flex p-5">
        <div className="flex w-full gap-10">
          <ButtonEM
            kind="secondary"
            text="Lista eventów"
            type="submit"
            style={{ width: "100%" }}
          />
          <ButtonEM
            kind="secondary"
            text="Organizatorzy"
            type="submit"
            style={{ width: "100%" }}
          />
          <ButtonEM
            kind="secondary"
            text="Ustawienia"
            type="submit"
            style={{ width: "100%" }}
          />
          <ButtonEM
            kind="secondary"
            text="Powiadomienia"
            type="submit"
            style={{ width: "100%" }}
          />
          <ButtonEM
            kind="secondary"
            text="Profil"
            type="submit"
            style={{ width: "100%" }}
          />
        </div>
      </div>
      <div className="space-y-10">
        <div className="bg-white shadow-2xl w-full p-5 rounded-lg hover:bg-gray-200 transition-color duration-200 flex ease-out hover:scale-[1.02]">
          <div className="w-1/2 flex flex-col">
            <p className="text-2xl">Statystytki</p>
            <div className="mt-10 flex flex-col">
              <span>Oczekujących na zatwierdzenie: 10</span>
              <span>Oczekujących na zatwierdzenie: 10</span>
              <span>Oczekujących na zatwierdzenie: 10</span>
              <span>Oczekujących na zatwierdzenie: 10</span>
              <span>Oczekujących na zatwierdzenie: 10</span>
            </div>
          </div>
          <div className="w-1/2 flex justify-end">
            <img
              width={400}
              src="https://longicodeitstorage.blob.core.windows.net/sharedimages/pie-chart-149727_1280.png"
              alt="pie-chart"
            />
          </div>
        </div>

        <div className="bg-white shadow-2xl w-full p-5 rounded-lg hover:bg-gray-200 transition-color duration-200 flex  ease-out hover:scale-[1.02]">
          <div className="w-1/2 flex flex-col justify-between">
            <p className="text-2xl">Alerty</p>
            <div className="mt-10 flex flex-col">
              <span>
                Powiadomienie od organizatora: Adam Kowalski - asdsada
              </span>
              <span>
                Powiadomienie od organizatora: Adam Kowalski - asdsada
              </span>
              <span>
                Powiadomienie od organizatora: Adam Kowalski - asdsada
              </span>
              <span>
                Powiadomienie od organizatora: Adam Kowalski - asdsada
              </span>
              <span>
                Powiadomienie od organizatora: Adam Kowalski - asdsada
              </span>
            </div>
            <ButtonEM
              kind="primary"
              text="Zobacz więcej"
              type="submit"
              style={{ marginTop: "20px", width: "200px" }}
            />
          </div>
          <div className="w-1/2 flex justify-end">
            <img
              width={400}
              src="https://longicodeitstorage.blob.core.windows.net/sharedimages/bell-jar-1096280_1280.png"
              alt="bell-jar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PanelAdmin;
