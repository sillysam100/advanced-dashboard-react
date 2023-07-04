import { apiGet } from "../utils/api";
import { Register } from "../types/Register";

export function getRegisters(siteId: string): Promise<Register[]> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiGet(`/api/registers/?siteId=${siteId}`);
      const res = await response.json();
      resolve(res.registers);
    } catch (err) {
      reject(err);
    }
  });
}
