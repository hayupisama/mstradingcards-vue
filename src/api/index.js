import axios from 'axios';

const AXIOS = axios.create({
    baseURL: 'http://localhost:80/',
    withCredentials: true // Add this line
});

// Function to set JWT token
const setJwtToken = (token) => {
    AXIOS.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export { AXIOS, setJwtToken };