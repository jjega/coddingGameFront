import axios from 'axios';

export default() => {
  const token = localStorage.getItem('token');
  let client = axios.create({
    baseURL: `http://localhost:4000`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  });

  return client
}
