import axios from 'axios'

export default() => {
  let client = axios.create({
    baseURL: `http://localhost:4000`,
    headers: {
      'Content-Type': 'application/json',
      //'Authorization': 'Bearer ' + localStorage.getItem("token")
    }
  });
  // client.interceptors.response.use(undefined, async (err)=> {
  //   const error = err.response;

  //   // if error is 401
  //   if (error && error.status===401 && error.config &&
  //     !error.config.__isRetryRequest) {
  //     localStorage.clear();

  //     // request for a new token
  //     window.location.href="/login";
  //   }
  // });
  return client
}
