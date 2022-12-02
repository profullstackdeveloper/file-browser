import axios from 'axios';

export const fetchRoot = async (url: string) => {
    const result = await axios.post(`${process.env.REACT_APP_API_URL}/path`, {
        url
    });
    return result;
}