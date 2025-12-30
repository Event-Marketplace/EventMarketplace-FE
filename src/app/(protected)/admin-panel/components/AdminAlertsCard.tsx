import ButtonEM from "@/components/ui/ButtonEM";

const AdminAlertsCard: React.FC = () => {
  return (
    <div className="bg-white shadow-2xl w-full p-5 rounded-lg hover:bg-gray-200 transition-color duration-200 flex  ease-out hover:scale-[1.02]">
      <div className="w-1/2 flex flex-col justify-between">
        <p className="text-2xl font-semibold">Alerty</p>
        <div className="mt-10 flex flex-col">
          <span>Powiadomienie od organizatora: Adam Kowalski - asdsada</span>
          <span>Powiadomienie od organizatora: Adam Kowalski - asdsada</span>
          <span>Powiadomienie od organizatora: Adam Kowalski - asdsada</span>
          <span>Powiadomienie od organizatora: Adam Kowalski - asdsada</span>
          <span>Powiadomienie od organizatora: Adam Kowalski - asdsada</span>
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
  );
};

export default AdminAlertsCard;
