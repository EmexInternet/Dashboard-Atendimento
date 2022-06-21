import axios from 'axios';

const api = axios.create({

    baseURL: 'http://200.229.156.14/login',
    headers: {'Content-Type': 'application/json; charset=utf-8',},
    auth: {
        username: process.env.REACT_APP_USERNAME,
        password: process.env.REACT_APP_PASSWORD,
        }}
        );

        export default api;