"use client";

import React from "react";
import Pagination from "./Pagination";

type ListData<T> = {
  items: T[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
};

type ListWrapperProps<T> = {
  children: React.ReactNode;
  data: ListData<T>;
  onPageChange: (page: number) => void;
  filters?: React.ReactNode;
};

const ListWrapper = <T,>({
  children,
  data,
  onPageChange,
  filters,
}: ListWrapperProps<T>) => {
  return (
    <div className="p-8 flex flex-col gap-2 bg-gray-100 rounded-lg border-4 ">
      {filters && (
        <div className="flex flex-column gap-5 bg-white p-5 shadow-md">
          {filters}
        </div>
      )}
      <Pagination
        currentPage={data.currentPage}
        totalPages={data.totalPages}
        totalCount={data.totalCount}
        onPageChange={onPageChange}
        className="flex gap-5 justify-end p-2"
      />
      <div>{children}</div>
      <Pagination
        currentPage={data.currentPage}
        totalPages={data.totalPages}
        totalCount={data.totalCount}
        onPageChange={onPageChange}
        className="flex gap-5 justify-end p-2"
      />
    </div>
  );
};

export default ListWrapper;
