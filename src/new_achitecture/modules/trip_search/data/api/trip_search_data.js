import axios from "axios";

const instance = axios.create({
    baseURL: 'https://express-example-kj10.onrender.com/',
    timeout: 5000
});

export async function getRoutes(fromId, toId) {
    if (fromId && toId && typeof fromId == 'string' && typeof toId == 'string'){
        const res = await instance.get(`routes/${fromId}/${toId}`);
        return res;
    } else {
        throw `Incorrect values ${fromId}, ${toId}`;
    }
}