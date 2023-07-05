import { IRegister } from "../../types/Register";

interface GaugeProps {
  register: IRegister;
  type: "temperature";
}

export default function Gauge({ register, type }: GaugeProps) {
  if (type === "temperature") {
    const fillPercentage = Math.min(
      Math.max((parseInt(register.value) / 200) * 100, 0),
      100
    );

    return (
      <div className="flex flex-col items-center w-32 rounded-3xl shadow-lg">
        <h1 className="font-bold text-center rounded-t-3xl py-2">
          {register.name}
        </h1>
        <div className="relative w-2  h-64 mt-4">
          <div
            style={{ height: `${fillPercentage}%` }}
            className="absolute bottom-0 w-full bg-red-600 transition-all"
          ></div>

          {[...Array(11).keys()].map((index) => (
            <div
              key={index}
              className="absolute left-1/2"
              style={{ bottom: `${index * 10}%` }}
            >
              {index % 2 === 0 ? (
                <div className="h-1 w-4 transform -translate-x-1/2"></div>
              ) : (
                <div className="h-0.5 w-4  transform -translate-x-1/2"></div>
              )}

              {index % 2 === 0 && (
                <div className="absolute left-full ml-1 text-xs transform -translate-y-1/2">
                  {index * 20}°C
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-2 font-bold pb-2">{register.value}°C</div>
      </div>
    );
  }
}
