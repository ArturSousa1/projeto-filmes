import axios from "axios"; // usadas para fazer requisições https.

// Base da url: https://api.themoviedb.org/3/
//url da api: /movie/popular?api_key=4e059ea6e686381cc29209028a78c2fa&language=pt-BR

const api = axios.create(({
    baseURL: 'https://api.themoviedb.org/3/'
}));

export default api;


