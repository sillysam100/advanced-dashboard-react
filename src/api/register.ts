import { apiGet } from "../utils/api";
import { Register } from "../types/Register";

export function getRegisters(siteId: string): Promise<Register[]> {
    const userId = localStorage.getItem('userId');
    return new Promise(async (resolve, reject) => {
        try {
            const response = await apiGet(`/api/registers/?siteId=${siteId}&userId=${userId}`);
            const res = await response.json();
            resolve(res.registers);
        } catch (err) {
            reject(err);
        }
    });
}