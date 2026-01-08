"use client";

type CardWrapperProps = {
  children: React.ReactNode;
};

const CardWrapper = ({ children }: CardWrapperProps) => {
  return (
    <div className="w-full bg-gray-200 p-5 shadow-lg hover:bg-gray-300 mt-2">
      <div className="flex flex-wrap flex-row gap-3">{children}</div>
    </div>
  );
};

export default CardWrapper;
