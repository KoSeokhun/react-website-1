import axios from "axios";
import { FETCH_DATA } from "./types";

export function fetchData() {
    const request = axios.get('/api/data/ytn')
        .then(response => response.data)

    return {
        type: FETCH_DATA,
        payload: request
    }
}