"use client";

import { apiAxios } from "@/lib/apiAxios";
import { useCallback, useEffect, useState } from "react";
import { Mail, MapPin, Phone, Search, Users } from "lucide-react";
import Pagination from "@/components/ui/pagination/Pagination";

const PAGE_SIZE = 9;

interface UserItem {
  id: string;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
  city: string | null;
  street: string | null;
  postalCode: string | null;
  number: string | null;
  registrationDate: string;
}

interface UsersResponse {
  users: UserItem[];
  totalCount: number;
  elapsedTime: number;
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiAxios.get<UsersResponse>("User", {
        params: {
          PageNumber: currentPage,
          FullName: search.trim() || undefined,
        },
      });
      setUsers(response.data.users ?? []);
      setTotalCount(response.data.totalCount ?? 0);
    } catch {
      setError("Nie udało się pobrać użytkowników. Spróbuj ponownie.");
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, search]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <section className="mx-auto flex w-full max-w-[1600px] flex-col gap-6">
      <header className="rounded-md bg-red-900/40 px-6 py-8 text-white shadow-inner sm:px-10">
        <div className="flex items-center gap-4">
          <Users aria-hidden="true" className="h-9 w-9" />
          <div>
            <h1 className="text-3xl font-semibold sm:text-4xl">Użytkownicy</h1>
            <p className="mt-1 text-white/80">
              Zarządzanie użytkownikami platformy
            </p>
          </div>
        </div>
      </header>

      <div className="rounded-lg bg-white p-5 shadow-md sm:p-7">
        <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Lista użytkowników
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {isLoading ? "Pobieranie danych…" : `${totalCount} użytkowników`}
            </p>
          </div>
          <label className="flex w-full items-center gap-2 rounded-md border border-gray-300 px-3 py-2 sm:max-w-sm">
            <Search
              aria-hidden="true"
              className="h-5 w-5 shrink-0 text-gray-400"
            />
            <input
              aria-label="Szukaj użytkownika"
              className="w-full bg-transparent text-sm outline-none"
              onChange={(event) => {
                setSearch(event.target.value);
                setCurrentPage(1);
              }}
              placeholder="Szukaj po imieniu lub nazwisku"
              value={search}
            />
          </label>
        </div>

        {isLoading ? (
          <p className="rounded-md bg-gray-50 p-8 text-center text-gray-600">
            Ładowanie użytkowników…
          </p>
        ) : error ? (
          <div className="rounded-md bg-red-50 p-6 text-center text-red-800">
            <p>{error}</p>
            <button
              className="mt-3 font-semibold underline"
              onClick={() => void fetchUsers()}
            >
              Spróbuj ponownie
            </button>
          </div>
        ) : users.length === 0 ? (
          <p className="rounded-md bg-gray-50 p-8 text-center text-gray-600">
            {search.trim()
              ? "Nie znaleziono użytkowników."
              : "Brak użytkowników do wyświetlenia."}
          </p>
        ) : (
          <div className="grid gap-4 lg:grid-cols-2">
            {users.map((user) => {
              const fullName =
                [user.firstName, user.lastName].filter(Boolean).join(" ") ||
                "Użytkownik";
              const address = [
                user.street,
                user.number,
                user.postalCode,
                user.city,
              ]
                .filter(Boolean)
                .join(", ");

              return (
                <article
                  key={user.id}
                  className="rounded-lg border border-gray-200 p-5 shadow-sm"
                >
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {fullName}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Konto od{" "}
                        {new Date(user.registrationDate).toLocaleDateString(
                          "pl-PL",
                        )}
                      </p>
                    </div>
                    <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-800">
                      Użytkownik
                    </span>
                  </div>
                  <div className="mt-5 grid gap-3 text-sm text-gray-700 sm:grid-cols-2">
                    {user.email && (
                      <p className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        {user.email}
                      </p>
                    )}
                    {user.phoneNumber && (
                      <p className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        {user.phoneNumber}
                      </p>
                    )}
                    {address && (
                      <p className="flex items-center gap-2 sm:col-span-2">
                        <MapPin className="h-4 w-4 shrink-0 text-gray-400" />
                        {address}
                      </p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {!isLoading && !error && totalCount > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(totalCount / PAGE_SIZE)}
            totalCount={totalCount}
            onPageChange={setCurrentPage}
            className="flex justify-end gap-5 p-2"
          />
        )}
      </div>
    </section>
  );
}
