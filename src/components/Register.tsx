import React from "react";
import { IRegister } from "../types/Register";
import { ILayoutEntry } from "../types/Page";

interface RegisterProps {
  register: IRegister;
  layout?: ILayoutEntry;
  onChange: (register: IRegister) => void;
}

function Register({ register, layout, onChange }: RegisterProps) {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...register,
      value: event.target.checked ? "1" : "0",
    });
  };

  console.log(layout)


  if (register.controlType === "read") {
    return (
      <div className={`stats shadow grid-cols-${layout?.cols} grid-rows-${layout?.rows}`}>
        <div className="stat">
          <div className="stat-title  font-semibold">{register.name}</div>
          <div className="stat-value flex">
            <h1 className="text-3xl">{register.value}</h1>
            <h1 className="text-base ml-1">{register.unit}</h1>
          </div>
        </div>
      </div>
    );
  } else if (register.controlType === "write") {
    return (
      <div className={`stats shadow grid-cols-${layout?.cols} grid-rows-${layout?.rows}`}>
        <div className="stat">
          <div className="stat-title font-semibold text-black">{register.name}</div>
          <div className="stat-value flex">
            <input
              type="checkbox"
              className="toggle toggle-lg"
              checked={register.value === "1"}
              onChange={handleCheckboxChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default React.memo(Register);
