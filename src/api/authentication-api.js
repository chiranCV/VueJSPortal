import httpService from "../service/http-service";

class AuthenticationApi {
  static getToken = async (headerOptions) => {
    // const apiEndpoint = config.APIMethods.Authentication.Token;
    const { grantType, userName } = headerOptions;
    const refreshToken = headerOptions && headerOptions.refresh_token ? headerOptions.refresh_token : null;
    try {
      const token = await httpService.authentication(grantType, userName, refreshToken);
      return token;
    } catch (ex) {
      throw ex;
    }
  };
}

export default AuthenticationApi;
