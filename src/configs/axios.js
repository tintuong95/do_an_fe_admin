import axios from "axios";

const { REACT_APP_HOST } = process.env;

const fetchAxios = axios.create({
    baseURL: REACT_APP_HOST,
    withCredentials: true,
    headers:{
        'Authorization': 'Bearer ' +sessionStorage.getItem('access_token')
    }
});

fetchAxios.interceptors.response.use(
    function(response) {
        return response.data;
    },
    function(error) {
        return Promise.reject(error);
    }
);

export default fetchAxios