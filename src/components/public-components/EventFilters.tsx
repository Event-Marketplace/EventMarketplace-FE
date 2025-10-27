"use client";

import { useState } from "react";

type EventFilterProps = {
  onChange: (filters: {
    title?: string;
    startDate?: string;
    endDate?: string;
    startDate2?: string;
    endDate2?: string;
  }) => void;
};

const EventFilters = ({ onChange }: EventFilterProps) => {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startDate2, setStartDate2] = useState("");
  const [endDate2, setEndDate2] = useState("");

  const handleApply = () => {
    onChange({ title, startDate, endDate, startDate2, endDate2 });
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

      <div className="flex gap-2">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      <div className="flex gap-2">
        <input
          type="date"
          value={startDate2}
          onChange={(e) => setStartDate2(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={endDate2}
          onChange={(e) => setEndDate2(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      <button
        onClick={handleApply}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
      >
        Filtruj
      </button>
    </>
  );
};

export default EventFilters;
