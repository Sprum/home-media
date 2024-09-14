import axios from 'axios';
import { useContext } from 'react';
import { ApiContext } from '../context/ApiContext'; // Adjust the path as needed

const useApi = () => {
    const { baseUrl } = useContext(ApiContext);

    const api = axios.create({
        baseURL: baseUrl + '/api/v1' || 'http://localhost:8000/api/v1', // Default URL if none is provided
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return api;
};

export default useApi;
