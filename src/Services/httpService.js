import axios from "axios";
import config from "../Config.json";

axios.interceptors.response.use(null, error => {
  const exprectedError = error.response && (error.response >= 400) & (error.response < 500);

  if (!exprectedError) {
    console.log(error);
    alert("An unexpected error");
  }
  return Promise.reject(error);
});

axios.defaults.baseURL = config.DEV_ENV_SanaUrl;
//axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
