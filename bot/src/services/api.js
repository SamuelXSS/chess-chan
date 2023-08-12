import axios from 'axios';

const chessApi = axios.create({
  baseURL: 'https://api.chess.com',
});

const api = axios.create({
  baseURL: 'http://localhost:3000'
})

export { api, chessApi };
