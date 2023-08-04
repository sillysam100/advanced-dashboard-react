import { IPage } from "../../types/iiicontrol/Page";
import { IRegister } from "../../types/iiicontrol/Register";
import { apiGet, apiPost, apiPut } from "../../utils/api";

export function getPages(siteId: string): Promise<IPage[]> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiGet(`/api/iiicontrol/pages/?siteId=${siteId}`);
      const res = await response.json();
      resolve(res);
    } catch (err) {
      reject(err);
    }
  });
}

export function getRegisters(pageId: string): Promise<IRegister[]> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiGet(`/api/iiicontrol/page/${pageId}/registers`);
      const res = await response.json();
      resolve(res);
    } catch (err) {
      reject(err);
    }
  });
}

export function changeRegisterPosition(
  pageId: string,
  registerId: string,
  direction: "left" | "right",
): Promise<IRegister[]> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiPut(
        `/api/iiicontrol/page/${pageId}/layout/${registerId}/position`,
        {
          direction: direction,
        },
      );

      if (response.ok) {
        const res = await response.json();
        resolve(res);
      } else {
        const err = await response.json();
        reject(err);
      }
    } catch (err) {
      reject(err);
    }
  });
}

export async function createPage(name: string, siteId: string) {
  const response = await apiPost("/api/iiicontrol/page", { name, siteId });
  return response;
}
