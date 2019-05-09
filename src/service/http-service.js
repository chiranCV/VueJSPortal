import axios from "axios";
import qs from "qs";
import appconfig from "../config.json";
import authHelper from "../helpers/authentication-helper";

axios.defaults.baseURL = appconfig[appconfig.CURRENT_ENV];

axios.interceptors.response.use(null, error =>
  // const exprectedError = error.response && error.response >= 400 && error.response < 500;
  // if (!exprectedError) {
  // }
  Promise.reject(error));

const issueToken = (grantType, userName, refreshToken = null) => {
  const baseurl = appconfig[appconfig.CURRENT_ENV];
  const url = baseurl.replace("/api", "") + appconfig.Authentication.TokenUrl;
  let requestBody;
  if (refreshToken) {
    requestBody = qs.stringify({
      grant_type: grantType,
      // username: userName,
      MappedShopId: "SanaStore",
      refresh_token: refreshToken
    });
  } else {
    requestBody = qs.stringify({
      grant_type: grantType,
      username: userName,
      MappedShopId: "SanaStore"
    });
  }

  const axiosconfig = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    }
  };
  return axios
    .post(url, requestBody, axiosconfig)
    .then((result) => {
      const token = result.data;
      return Promise.resolve(token);
    })
    .catch(err =>
      Promise.reject(err));
};

axios.interceptors.request.use(
  async (config) => {
    const originalRequest = config;
    if (!originalRequest.url.includes("/authentication/token")) {
      const selectedcusotmerSupplier = authHelper.getSelectedCustomerSuplier();
      if (
        selectedcusotmerSupplier.CustomerNo
        && selectedcusotmerSupplier.SupplierId
        && selectedcusotmerSupplier.SAPCustomerNo
      ) {
        originalRequest.headers.SupplierId = selectedcusotmerSupplier.SupplierId;
        originalRequest.headers.CustomerNo = selectedcusotmerSupplier.CustomerNo;
        originalRequest.headers.SAPCustomerNo = selectedcusotmerSupplier.SAPCustomerNo;
        originalRequest.headers.LanguageId = selectedcusotmerSupplier.SelectedLanguageId
          ? selectedcusotmerSupplier.SelectedLanguageId
          : "1033";
      }
      if (selectedcusotmerSupplier.MappedShopId) {
        originalRequest.headers.MappedShopId = selectedcusotmerSupplier.MappedShopId;
      }
      const token = await authHelper.requestApitoken();
      if (token) {
        originalRequest.headers.Authorization = `Bearer ${token.access_token}`;
      }
      return originalRequest;
    }
    return originalRequest;
  },
  error =>
    Promise.reject(error)
);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  authentication: issueToken
};
