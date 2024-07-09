import React from "react";

interface TextAreaProps {
  label: string;
  name: string;
  handleInput: (key: string, value: string) => void;
  value?: number;
}

export const InputText = ({
  handleInput,
  name,
  label,
  value,
}: TextAreaProps) => {
  return (
    <div className="grid w-full mt-4">
      <label
        htmlFor="name"
        className={`${label === "Total Price" ? "text-right" : "text-left"}`}
      >
        {label}
        <span className="text-red-500">*</span>
      </label>
      <input
        id={name}
        placeholder={label}
        type="number"
        name={name}
        className={`${
          label === "Total Price" ? "bg-[#eaeaea]" : "bg-white"
        } w-full rounded border-2 border-[#c7c7c7] p-3 focus:outline-none mt-1 text-slate-500`}
        onChange={(e) => handleInput(name, e.target.value)}
        disabled={label !== "Quantity"}
        value={value}
      />
    </div>
  );
};
