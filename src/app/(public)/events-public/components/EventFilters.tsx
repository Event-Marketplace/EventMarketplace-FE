"use client";

import { useState } from "react";
import trashIcon from "@/images/trash.svg";
import Image from "next/image";

type EventFilterProps = {
  onChange: (filters: {
    title?: string;
    startDate?: string;
    endDate?: string;
    startPrice?: number | "";
    endPrice?: number | "";
  }) => void;
  onClear: () => void;
};

const EventFilters = ({ onChange, onClear }: EventFilterProps) => {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startPrice, setStartPrice] = useState<number | "">("");
  const [endPrice, setEndPrice] = useState<number | "">("");

  const handleApply = () => {
    onChange({ title, startDate, endDate, startPrice, endPrice });
  };

  const handleClear = () => {
    setTitle("");
    setStartDate("");
    setEndDate("");
    setStartPrice("");
    setEndPrice("");
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

      <div className="flex gap-2 lg:flex flex-wrap">
        <input
          id="minPrice"
          type="number"
          min={0}
          value={startPrice}
          placeholder="Cena od"
          onChange={(e) => setStartPrice(Number(e.target.value))}
          className="sm:w-auto w-full border p-2 rounded "
        />
        <input
          id="maxPrice"
          type="number"
          min={0}
          value={endPrice}
          placeholder="Cena do"
          onChange={(e) => setEndPrice(Number(e.target.value))}
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

export default EventFilters;
