import { useState } from "react";
import Image from "next/image";
import trashIcon from "@/images/trash.svg";

type OrganizerEventFilterProps = {
  onChange: (filters: {
    title?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
  }) => void;
  onClear: () => void;
};

const OgranizerEventListFilter = ({
  onChange,
  onClear,
}: OrganizerEventFilterProps) => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleApply = () => {
    onChange({ title, status, startDate, endDate });
  };

  const handleClear = () => {
    setTitle("");
    setStatus("");
    setStartDate("");
    setEndDate("");
    onClear();
  };

  return (
    <>
      {/* Input tekstowy */}
      <input
        type="text"
        placeholder="Szukaj wydarzenia..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded flex-1"
      />

      <input
        type="text"
        placeholder="Szukaj wydarzenia..."
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border p-2 rounded flex-1"
      />

      <div className="flex gap-2 md:flex flex-wrap">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="sm:w-auto w-full border p-2 rounded"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="sm:w-auto w-full border p-2 rounded"
        />
      </div>

      <button onClick={handleClear} className="cursor-pointer">
        <Image src={trashIcon} alt="sd" height={32} />
      </button>
      <button
        onClick={handleApply}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
      >
        Filtruj
      </button>
    </>
  );
};

export default OgranizerEventListFilter;
