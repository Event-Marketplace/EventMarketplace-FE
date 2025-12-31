import { AdminStats } from "@/types/types";

interface StatsProps {
  stats: AdminStats;
}

const AdminStatsCard: React.FC<StatsProps> = ({ stats }) => {
  const statsArray = [
    { label: "Użytkownicy", value: stats.totalUsers, icon: "👤" },
    { label: "Wydarzenia", value: stats.totalEvents, icon: "📅" },
    {
      label: "Wydarzenia zatwierdzone",
      value: stats.approvedEvents,
      icon: "✅",
    },
    {
      label: "Wydarzenia oczekujące na akceptację",
      value: stats.pendingEvents,
      icon: "⏳",
    },
    { label: "Wydarzenia odrzucone", value: stats.rejectedEvents, icon: "❌" },
    { label: "Organizatorzy", value: stats.totalOrganizers, icon: "🧑‍💼" },
    { label: "Uczestnicy", value: stats.totalParticipants, icon: "🧑‍🤝‍🧑" },
  ];

  return (
    <div className="bg-white shadow-2xl w-full p-5 rounded-lg hover:bg-gray-200 transition-color duration-200 flex  ease-out hover:scale-[1.02] flex flex-col md:flex-row gap-6">
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center gap-5">
          <p className="text-4xl font-semibold">Statystyki</p>
          <img
            className="w-full max-w-[80px]"
            src="https://longicodeitstorage.blob.core.windows.net/sharedimages/pie-chart-149727_1280.png"
            alt="pie-chart"
          />
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {statsArray.map((stat, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="text-2xl">{stat.icon}</div>
              <div>
                <div className="text-xl font-bold">{stat.value}</div>
                <div className="text-gray-500 text-sm">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminStatsCard;
