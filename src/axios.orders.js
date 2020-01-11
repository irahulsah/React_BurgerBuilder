import axios from 'axios';


const instance = axios.create({
  baseURL: "https://myprojectreact1.firebaseio.com/"
});

export default instance;