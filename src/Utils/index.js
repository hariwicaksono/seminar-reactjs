import { NotificationManager } from 'react-notifications'

const TOKEN_KEY1 = 'isLogin';
const TOKEN_KEY2 = 'isAdmin';

export const login = () => {
    localStorage.setItem(TOKEN_KEY1, 'TestLogin');
}

export const logout = () => {
    (localStorage.removeItem(TOKEN_KEY1) || localStorage.removeItem(TOKEN_KEY2));
    window.location.href = '/';
    NotificationManager.success('Berhasil keluar sistem');
}

export const isLogin = () => {
    if (localStorage.getItem(TOKEN_KEY1)) {
        return true;
    }

    return false;
}

export const isAdmin = () => {
    if (localStorage.getItem(TOKEN_KEY2)) {
        return true;
    }

    return false;
}