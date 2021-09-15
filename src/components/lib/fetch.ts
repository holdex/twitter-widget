import axios from 'axios';

export default async function fetch(url: string, info?: RequestInit): Promise<any> {
    try {
        const response = await axios({
            url: url,
            method: (info?.method as any) || 'GET',
            data: info?.body || null,
            headers: info?.headers || {},
            withCredentials: true
        });
        return Promise.resolve(response);
    } catch (error) {
        // console.error('request failed', error);
        throw error;
    }
}