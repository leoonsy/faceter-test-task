import axios from 'axios';
import store from '@/store';

const headers = {
    "Accept": "application/json"
};

const HTTP = axios.create({
    baseURL: process.env.VUE_APP_SW_API,
    headers
});

HTTP.interceptors.request.use(config => {
    store.commit('setLoading', true);
    return config
});

HTTP.interceptors.response.use(response => {
    store.commit('setLoading', false);
    return response
});

export default HTTP;