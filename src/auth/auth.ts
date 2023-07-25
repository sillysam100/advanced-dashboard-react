import { IUser } from "../types/User";
import { apiPost } from "../utils/api";

export async function validateKey(): Promise<IUser> {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await apiPost("/api/user/validate", {});
      const res = await response.json();
      if (res.user) {
        resolve(res.user);
      } else {
        reject("Token is not valid");
      }
    } catch (err) {
      console.error(err);
      reject(err);
    }
  });
}

export async function checkAuth(): Promise<IUser> {
  return new Promise(async (resolve, reject) => {
    const token = localStorage.getItem("token");
    if (!token) {
      reject("No token found");
      return;
    }
    try {
      const user = await validateKey();
      if (!user) {
        localStorage.removeItem("token");
        reject();
      } else {
        resolve(user);
      }
    } catch (err) {
      console.error(err);
      reject();
    }
  });
}

export async function logUserIn(
  username: string,
  password: string
): Promise<IUser> {
  return new Promise<IUser>(async (resolve, reject) => {
    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const res = await response.json();
      if (res.token) {
        console.log(res);
        localStorage.setItem("token", res.token);
        localStorage.setItem("username", res.user.username);
        resolve(res.user);
      } else {
        reject(new Error("Login failed"));
      }
    } catch (err) {
      reject(err);
    }
  });
}

export async function logUserOut(): Promise<boolean> {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    window.location.href = "/";
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}
