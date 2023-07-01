import { apiGet } from "../utils/api";
import { Site } from "../types/Site";


export async function getSites(): Promise<Site[]> {
    const userId = localStorage.getItem('userId');

    return new Promise(async (resolve, reject) => {
        try {
            const response = await apiGet(`/api/sites/?userId=${userId}`);
            const res = await response.json();
            resolve(res);
        } catch (err) {
            reject(err);
        }
    });
}

export async function getSite(id: string): Promise<Site> {
    const userId = localStorage.getItem('userId');

    return new Promise(async (resolve, reject) => {
        try {
            const response = await apiGet(`/api/site/?userId=${userId}&siteId=${id}`);
            const res = await response.json();
            resolve(res);
        } catch (err) {
            reject(err);
        }
    });
}