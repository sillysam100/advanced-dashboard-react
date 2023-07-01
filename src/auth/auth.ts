import { apiPost } from "../utils/api";

export async function validateKey(): Promise<boolean> {
    try {
        const response = await apiPost('/api/user/validate', {});
        const res = await response.json();
        console.log(res)
        if (res.message === 'Token is valid.') {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.error(err);
        return false;
    }
}

export async function checkAuth(): Promise<boolean> {
    const token = localStorage.getItem('token');
    if (!token) return Promise.resolve(false);
    try {
        const res = await validateKey();
        if (!res) {
            localStorage.removeItem('token');
            return Promise.resolve(false);
        }
        return Promise.resolve(true);
    } catch (err) {
        console.error(err);
        return Promise.resolve(false);
    }
}

export async function logUserIn(username: string, password: string): Promise<boolean> {
    try {
        const response = await fetch('/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const res = await response.json();
        if (res.token) {
            localStorage.setItem('token', res.token);
            localStorage.setItem('username', res.user.username);
            localStorage.setItem('userId', res.user.userId);
            window.location.href = '/dashboard';
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.error(err);
        return false;
    }
}
