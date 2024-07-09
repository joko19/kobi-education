import { Option } from "@/interface/employee";
import React from "react";
import ReactSelect from "react-select";

interface SelectProps {
  label: string;
  name: string;
  handleInput: (key: string, value: string) => void;
  options: Option[];
  dataValue: string;
}

export const Select = ({
  label,
  name,
  handleInput,
  options,
  dataValue,
}: SelectProps) => {
  
  const selectedValue = dataValue
    ? {
        value: dataValue,
        label: dataValue,
      }
    : null;

  return (
    <div className="w-full">
      <label htmlFor={name}>
        {label}
        <span className="text-red-500">*</span>{" "}
      </label>{" "}
      <ReactSelect
        value={selectedValue}
        isClearable
        className="basic-single h-12 w-full mt-1"
        classNamePrefix="select"
        name="color"
        options={options}
        components={{ IndicatorSeparator: () => null }}
        noOptionsMessage={() => "No data available"}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            height: "100%",
            borderColor: "#c7c7c7",
            borderWidth: "2px",
            boxShadow: "none !important",
            "&:hover": {
              border: "1px solid border-[#c7c7c7]",
            },
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: "transparent",
            "&:active": {
              backgroundColor: "transparent",
            },
            color: state.isSelected ? "#67be6f" : "#696969",
          }),
        }}
        onChange={(e) => handleInput(name, e?.value as string)}
      />
    </div>

    // <div className="w-full">
    //   <label htmlFor={name}>
    //     {label} <span className="text-red-500">*</span>{" "}
    //   </label>
    //   <select
    //     name={name}
    //     className="w-full bg-white rounded border-2 border-[#c7c7c7] px-2 h-12 focus:outline-none mt-1 text-slate-500"
    //     defaultValue=""
    //     onChange={(e) => handleInput(name, e.target.value)}
    //   >
    //     <option value="" disabled hidden>
    //       {label}
    //     </option>
    //     {options.length > 0 ? (
    //       options.map((item: Option) => (
    //         <option
    //           value={item.value}
    //           className="text-slate-900"
    //           style={{ padding: 4 }}
    //         >
    //           {item.label}
    //         </option>
    //       ))
    //     ) : (
    //       <option>No Data Available</option>
    //     )}
    //   </select>
    // </div>
  );
};
