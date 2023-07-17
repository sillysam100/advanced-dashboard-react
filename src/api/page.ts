import { IPage } from "../types/Page";
import { IRegister } from "../types/Register";
import { apiGet, apiPut } from "../utils/api";

export function getPages(siteId: string): Promise<IPage[]> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiGet(`/api/pages/?siteId=${siteId}`);
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
      const response = await apiGet(`/api/page/${pageId}/registers`);
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
  direction: "left" | "right"
): Promise<IRegister[]> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiPut(
        `/api/page/${pageId}/layout/${registerId}/position`,
        {
          direction: direction,
        }
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
