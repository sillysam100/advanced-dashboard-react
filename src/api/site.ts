import { apiGet } from "../utils/api";
import { ISite } from "../types/Site";

export async function getSites(): Promise<ISite[]> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiGet(`/api/sites/`);
      const res = await response.json();
      resolve(res);
    } catch (err) {
      reject(err);
    }
  });
}

export async function getSite(id: string): Promise<ISite> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiGet(`/api/site/${id}`);
      const res = await response.json();
      resolve(res);
    } catch (err) {
      reject(err);
    }
  });
}
