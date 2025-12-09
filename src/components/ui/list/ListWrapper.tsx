"use client";

import React from "react";
import Pagination from "../pagination/Pagination";

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
  titleSection?: React.ReactNode;
  visibleTotalCount?: boolean;
};

const ListWrapper = <T,>({
  children,
  data,
  onPageChange,
  filters,
  titleSection,
  visibleTotalCount,
}: ListWrapperProps<T>) => {
  return (
    <div className="sm:p-8 p-0 flex flex-col gap-2 bg-gray-100 rounded-lg border-4 ">
      {titleSection && (
        <div className="flex xl:flex-col flex-row w-full gap-5 py-5">
          {titleSection}
        </div>
      )}
      {filters && (
        <div className="flex flex-col xl:flex-row gap-5 bg-white p-5 shadow-md">
          {filters}
        </div>
      )}
      <Pagination
        currentPage={data.currentPage}
        totalPages={data.totalPages}
        totalCount={data.totalCount}
        onPageChange={onPageChange}
        visibleTotalCount={visibleTotalCount}
        className="flex gap-5 justify-end p-2"
      />
      <div>{children}</div>
      <Pagination
        currentPage={data.currentPage}
        totalPages={data.totalPages}
        totalCount={data.totalCount}
        onPageChange={onPageChange}
        visibleTotalCount={visibleTotalCount}
        className="flex gap-5 justify-end p-2"
      />
    </div>
  );
};

export default ListWrapper;
