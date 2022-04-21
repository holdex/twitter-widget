import axios from 'axios';

export default async function fetch(url, info = {}) {
    try {
        const response = await axios({
            url,
            method: 'GET',
            ...(info.method ? { method: info.method } : {}),
            ...(info.body ? { data: info.body } : {}),
            headers: {
                'Content-Type': 'application/json',
                'Accept': "*/*",
                ...info.headers
            },
            withCredentials: false,
        });
        return Promise.resolve(response);
    } catch (error) {
        throw error;
    }
}