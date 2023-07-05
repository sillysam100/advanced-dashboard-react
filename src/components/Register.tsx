import React from "react";
import { IRegister } from "../types/Register";

interface RegisterProps {
  register: IRegister;
  onChange: (register: IRegister) => void;
}

function Register({ register, onChange }: RegisterProps) {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...register,
      value: event.target.checked ? "1" : "0",
    });
  };

  if (register.controlType === "read") {
    return (
      <div className="stats shadow">
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
      <div className="stats shadow">
        <div className="stat">
          <div className="stat-title  font-semibold">{register.name}</div>
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
