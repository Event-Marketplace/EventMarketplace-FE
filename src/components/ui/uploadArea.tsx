import { useState } from "react";
import trashIcon from "@/images/trash.svg";
import Image from "next/image";

const UploadArea = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const allowedTypes = ["image/png", "image/jpeg"];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]; // <--- tu pobierasz plik
    const maxSizeInMb = 2;
    const maxSizeInBytes = maxSizeInMb * 1024 * 1024;

    if (selectedFile) {
      if (selectedFile.size > maxSizeInBytes) {
        alert(`Plik jest za duy! Maksymalny rozmiar to ${maxSizeInMb} MB.`);
        return;
      }

      if (!allowedTypes.includes(selectedFile.type)) {
        alert(`Dozwolone są tylko pliki JPG lub PNG.`);
        return;
      }

      setFile(selectedFile);
      console.log("Wybrano plik:", selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  return (
    <>
      <div className="bg-gray-100 flex flex-col justify-center items-center h-96 w-full rounded-xl border-2 border-dashed border-gray-400 cursor-pointer hover:bg-gray-200 transition">
        <input
          type="file"
          id="file-upload"
          accept="image/png, image/jpeg"
          className="hidden"
          onChange={handleFileChange}
        />
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-gray-500 mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 15a4 4 0 008 0m0 0a4 4 0 108 0m-8 0v6m0-6V9m0 0L9 12m3-3l3 3"
            />
          </svg>
          <span className="text-gray-600">
            Przeciągnij lub kliknij, aby wgrać zdjęcie
          </span>
          {file && (
            <p className="mt-4 text-sm text-gray-700">
              Wybrano plik: <strong>{file.name}</strong>{" "}
            </p>
          )}
        </label>
        {preview && (
          <img
            src={preview}
            alt="Podgląd"
            className="mt-4 h-50 object-cover rounded-lg shadow-md "
          />
        )}
      </div>
    </>
  );
};

export default UploadArea;
