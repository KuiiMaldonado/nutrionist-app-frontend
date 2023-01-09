class Utils {
    getBaseUrl() {
        let baseUrl;
        if (process.env.NODE_ENV === 'production')
            baseUrl = process.env.REACT_APP_BACKEND_SERVER;
        else
            baseUrl = 'http://localhost:3001';
        return baseUrl;
    }

    generatePassword() {
        let password = "";
        for (let i = 0; i < 15; i++) {
            let character = String.fromCharCode(0x0020 + Math.random() * (0x007E - 0x0020 + 1));
            password += character;
        }
        return password;
    }
}

export default new Utils();
