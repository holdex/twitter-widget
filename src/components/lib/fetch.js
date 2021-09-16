import axios from 'axios';

export default async function fetch(url, info) {
    try {
        const response = await axios({
            url: url,
            method: info && info.method || 'GET',
            data: info && info.body || null,
            headers: info && info.headers || {},
            withCredentials: true
        });
        return Promise.resolve(response);
    } catch (error) {
        // console.error('request failed', error);
        throw error;
    }
}