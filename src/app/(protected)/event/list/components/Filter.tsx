import { useState } from "react";
import Image from "next/image";
import trashIcon from "@/images/trash.svg";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type StatusOptionProps = {
  statusIndex: number;
  statusName: string;
  statusDisplayName: string;
};

type OrganizerEventFilterProps = {
  onChange: (filters: {
    title?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
  }) => void;
  onClear: () => void;
  options: StatusOptionProps[];
};

const OgranizerEventListFilter = ({
  onChange,
  onClear,
  options,
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
      <input
        type="text"
        placeholder="Szukaj wydarzenia..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded flex-1"
      />

      <Select
        value={status}
        onValueChange={(v) => {
          if (v === "__clear__") setStatus("");
          else setStatus(v);
        }}
      >
        <SelectTrigger className="w-64 h-[42px]">
          <SelectValue placeholder="Wybierz status" />{" "}
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="__clear__">— Brak —</SelectItem>
          {options.map((s) => (
            <SelectItem key={s.statusIndex} value={String(s.statusName)}>
              {s.statusDisplayName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

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

      <button
        onClick={() => {
          handleClear();
          setStatus("");
        }}
        className="cursor-pointer"
      >
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
