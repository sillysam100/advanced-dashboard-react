import { apiGet } from "../../utils/api";
import { IRegister } from "../../types/iiicontrol/Register";

export function getRegisters(siteId: string): Promise<IRegister[]> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiGet(
        `/api/iiicontrol/registers/?siteId=${siteId}`
      );
      const res = await response.json();
      resolve(res);
    } catch (err) {
      reject(err);
    }
  });
}

export function getRegister(registerId: string): Promise<IRegister> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiGet(`/api/iiicontrol/register/${registerId}`);
      const res = await response.json();
      resolve(res);
    } catch (err) {
      reject(err);
    }
  });
}
