import axios from "axios";

//create the custom instance
const api = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
});

//request interceptor (Optional: e.g., automatically attach a JWT Bearer token)
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token'); //retrieve token from storage
        if(token) {
            config.headers.Authorization = `Bearer ${token}`; //attach token to header
        }
        return config
    },
    (error) => {
        return Promise.reject(error);
    }
);

//response interceptor (Optional: global error handling)
api.interceptors.response.use(
    (response) => {
        // Return only the data payload directly to save destructuring later
        return response;
    },
    (error) => {
        // Handle global HTTP errors (e.g., redirect on 401 Unauthorized)
        if(error.response && error.response.status === 401) {
            console.error('Unauthorized! Logging out...');
            localStorage.removeItem('token');
            // window.location.href = '/login';
        }
        return Promise.reject(error)
    }
);

export default api;
