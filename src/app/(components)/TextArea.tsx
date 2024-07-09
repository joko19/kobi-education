import React from "react";

interface TextAreaProps {
  handleInput: (key: string, value: string) => void;
}

export const TextArea = ({ handleInput }: TextAreaProps) => {
  return (
    <div className="grid mt-4">
      <label htmlFor="name">Notes</label>
      <textarea
        name="expired_date"
        className="w-3/4 bg-white rounded border-2 border-[#c7c7c7] p-3 focus:outline-none mt-1 text-slate-500"
        rows={4}
        onChange={(e) => handleInput("notes", e.target.value)}
      />
    </div>
  );
};
