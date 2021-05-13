import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://excellence-holdings-default-rtdb.firebaseio.com/',
});

export default instance;
