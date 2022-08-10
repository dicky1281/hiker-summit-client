import axios from 'axios'
import { baseURL } from "../config";

export const publicAxiosInstance = axios.create({
    baseURL,
    withCredentials: true
})

export const privateAxiosInstance = axios.create({
    
    
    baseURL,
    headers:{
        'Content-Type': 'application/json'
    },
    withCredentials: true
})