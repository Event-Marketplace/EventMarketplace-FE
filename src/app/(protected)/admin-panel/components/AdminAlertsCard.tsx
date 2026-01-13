import ButtonEM from "@/components/ui/ButtonEM";
import { AdminAlerts } from "@/types/types";
import { useRouter } from "next/navigation";

type AlertsProp = {
  alerts: AdminAlerts | undefined;
};

const AdminAlertsCard: React.FC<AlertsProp> = ({ alerts }) => {
  const router = useRouter();
  const handlePendingEvents = () => {
    router.push("/admin-panel/events");
  };

  return (
    <>
      {alerts && alerts?.pendingEvents.length < 1 ? (
        <div className="bg-white shadow-2xl w-full p-5 rounded-lg hover:bg-gray-200 transition-color duration-200 flex  ease-out hover:scale-[1.02]">
          <div className="w-full flex flex-col justify-between">
            <p className="text-2xl font-semibold">Alerty</p>
            <div className="flex justify-center items-center my-auto py-10 text-2xl italic">
              Brak powiadomień
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow-2xl w-full p-5 rounded-lg hover:bg-gray-200 transition-color duration-200 flex ease-out hover:scale-[1.02]">
          <div className="w-[100%] flex flex-col justify-between">
            <div className="flex justify-between items-center gap-5">
              <p className="text-4xl font-semibold">Alerty</p>
              <img
                className="w-full max-w-[80px]"
                src="https://longicodeitstorage.blob.core.windows.net/sharedimages/bell-jar-1096280_1280.png"
                alt="bell-jar"
              />
            </div>

            <div className="flex flex-col py-4 gap-3">
              <label className="text-green-900 font-semibold text-2xl">
                Oczekujące na akceptacje:{" "}
                <strong>{alerts?.pendingEventsCount}</strong>
              </label>
              {alerts?.pendingEvents.map((alert, index) => (
                <div className="flex flex-col" key={index}>
                  <span className="font-semibold italic">
                    Nowe wydarzenie - <strong>{alert.title}</strong>
                  </span>
                  <p className="text-red-900">{alert.organizer}</p>
                </div>
              ))}
            </div>
            <ButtonEM
              kind="primary"
              text="Zobacz więcej"
              type="submit"
              style={{ marginTop: "20px", width: "200px" }}
              onClick={handlePendingEvents}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AdminAlertsCard;
