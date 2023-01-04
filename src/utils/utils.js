class Utils {
    getBaseUrl() {
        let baseUrl;
        if (process.env.NODE_ENV === 'production')
            baseUrl = process.env.REACT_APP_BACKEND_SERVER;
        else
            baseUrl = 'http://localhost:3001';
        return baseUrl;
    }
}

export default new Utils();