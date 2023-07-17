import React, { useEffect, useState } from "react";
import { IRegister } from "../types/Register";
import { IValue } from "../types/Values";
import { ILayoutEntry } from "../types/Page";
import { getRegister } from "../api/register";
import { changeRegisterPosition } from "../api/page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faX,
  faArrowRight,
  faArrowLeft,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";

interface RegisterProps {
  layout: ILayoutEntry;
  pageId: string;
  onChange: (register: IRegister) => void;
  refreshPage: () => void;
  edit: boolean;
  children?: React.ReactNode;
  value?: IValue;
}

const RegisterContainer: React.FC<RegisterProps & { register: IRegister }> = ({
  register,
  layout,
  edit,
  pageId,
  children,
  refreshPage,
}) => (
  <div
    className={`stats shadow col-span-${layout?.cols || 2} row-span-${
      layout?.rows || 2
    } relative`}
  >
    <div className="stat">
      <div className="stat-title font-semibold">{register.name}</div>
      {children}
      {edit && (
        <div className="rounded absolute grid grid-cols-6 w-full">
          <button
            className="btn btn-square btn-ghost col-start-4"
            onClick={() => {
              changeRegisterPosition(pageId, register._id, "left").then(() => {
                refreshPage();
              });
            }}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <button
            className="btn btn-square btn-ghost col-start-5"
            onClick={() => {
              changeRegisterPosition(pageId, register._id, "right").then(() => {
                refreshPage();
              });
            }}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
          <button className="btn btn-square btn-ghost col-start-6 hover:btn-error">
            <FontAwesomeIcon icon={faX} />
          </button>
        </div>
      )}
    </div>
  </div>
);

const ReadRegister: React.FC<RegisterProps & { register: IRegister }> = ({
  register,
  layout,
  edit,
  pageId,
  refreshPage,
  onChange,
}) => (
  <RegisterContainer
    register={register}
    layout={layout}
    edit={edit}
    pageId={pageId}
    refreshPage={refreshPage}
    onChange={onChange}
  >
    <div className="stat-value flex">
      <h1 className="text-3xl">{register.value}</h1>
      <h1 className="text-base ml-1">{register.unit}</h1>
    </div>
  </RegisterContainer>
);

const WriteRegister: React.FC<RegisterProps & { register: IRegister }> = ({
  register,
  layout,
  edit,
  pageId,
  onChange,
  refreshPage,
}) => {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...register,
      value: event.target.checked ? "1" : "0",
    });
  };

  return (
    <RegisterContainer
      register={register}
      layout={layout}
      edit={edit}
      pageId={pageId}
      refreshPage={refreshPage}
      onChange={onChange}
    >
      <div className="stat-value flex">
        <input
          type="checkbox"
          className="toggle toggle-lg"
          checked={register.value === "1"}
          onChange={handleCheckboxChange}
          disabled={edit}
        />
      </div>
    </RegisterContainer>
  );
};

const LoadingRegister: React.FC<RegisterProps> = ({ layout }) => (
  <div
    className={`stats shadow col-span-${layout?.cols || 2} row-span-${
      layout?.rows || 2
    } relative animate-pulse`}
  >
    <div className="stat">
      <div className="stat-title font-semibold bg-gray-300 h-6 mb-2 rounded"></div>
      <div className="stat-value flex">
        <h1 className="text-3xl bg-gray-300 h-6 w-1/4 rounded"></h1>
      </div>
    </div>
  </div>
);

function Register(props: RegisterProps) {
  const [register, setRegister] = useState<IRegister | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getRegister(props.layout.registerId)
      .then(setRegister)
      .finally(() => {
        setLoading(false);
      });
  }, [props.layout.registerId]);

  const value = (props.value ? props.value.value : register?.value) || "";

  if (loading) {
    return <LoadingRegister {...props} />;
  }

  return register ? (
    register.controlType === "read" ? (
      <ReadRegister {...props} register={{ ...register, value }} />
    ) : (
      <WriteRegister {...props} register={{ ...register, value }} />
    )
  ) : null;
}

export default React.memo(Register);
