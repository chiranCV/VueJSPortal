import httpService from "../service/http-service";
import config from "../config.json";

class CustomerApi {
  // Get customer supplier relation list
  static getCustomerAccounts = async (zfloginId) => {
    const apiEndpoint = config.APIMethods.Customer.GetAccounts;
    const params = {
      zfloginId,
      getDefault: "false"
    };

    try {
      const { data: accounts } = await httpService.get(apiEndpoint, {
        params
      });
      return accounts;
    } catch (ex) {
      if (ex.response && ex.response.status === 404) throw ex;
      throw ex;
    }
  };
}

export default CustomerApi;
