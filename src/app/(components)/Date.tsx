import React from "react";

interface DateProps{
  handleInput: (key: string, value: string) => void;
}

export const Date = ({handleInput}: DateProps) => {
  return (
    <div className="w-full">
      <label htmlFor="expired_date">
        Expired Date<span className="text-red-500">*</span>{" "}
      </label>
      <input
        type="date"
        name="expired_date"
        className="w-full bg-white rounded border-2 border-[#c7c7c7] px-2 h-12 focus:outline-none mt-1 text-slate-500"
        onChange={(e) => handleInput("expired_date", e.target.value)}
      />
    </div>
  );
};
