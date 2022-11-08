import decode from 'jwt-decode';

class AuthService {
    getToken() {
        return localStorage.getItem('id_token');
    }

    getProfile() {
        return decode(this.getToken());
    }

    isTokenExpired(token) {
        let isExpired = false;

        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000)
                isExpired =  true;

        } catch (error) {
            console.error(error);
        }

        return isExpired;
    }

    loggedIn() {
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }

    login(idToken) {
        localStorage.setItem('id_token', idToken);
        window.location.assign('/profile');
    }

    logout() {
        localStorage.removeItem('id_token');
        window.location.assign('/');
    }

    isAdmin() {
        const token = this.getToken();
        return token.isAdmin;
    }
}

export default new AuthService();