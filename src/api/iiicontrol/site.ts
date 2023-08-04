import { apiGet, apiPost } from "../../utils/api";
import { ISite } from "../../types/iiicontrol/Site";

export async function getSites(): Promise<ISite[]> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiGet(`/api/iiicontrol/sites/`);
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
      const response = await apiGet(`/api/iiicontrol/site/${id}`);
      const res = await response.json();
      resolve(res);
    } catch (err) {
      reject(err);
    }
  });
}

export async function newSite(name: string) {
  const response = apiPost("/api/iiicontrol/site", { name });
  return response;
}
