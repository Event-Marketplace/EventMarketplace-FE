"use client";

import React from "react";

type ListWrapperProps = {
  children: React.ReactNode;
};

const ListWrapper = ({ children }: ListWrapperProps) => {
  return (
    <div className="p-8 flex flex-col gap-2 bg-gray-100 rounded-lg border-4 ">
      <div className="bg-white p-5 shadow-md">filters</div>
      <div className="flex gap-5 justify-end p-2">up pagination</div>
      <div>{children}</div>
      <div className="flex gap-5 justify-end p-2">down pagination</div>
    </div>
  );
};

export default ListWrapper;
