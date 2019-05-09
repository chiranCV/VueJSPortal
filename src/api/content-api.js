import httpService from "../service/http-service";
import config from "../config.json";

class ContentApi {
  // get all SanaTexts Sana Api
  static getAllSanaText = async () => {
    const apiEndpoint = config.APIMethods.Common.SanaText;
    try {
      const { data: sanatexts } = await httpService.get(apiEndpoint);
      return sanatexts;
    } catch (ex) {
      if (ex.response && ex.response.status === 404);
      throw ex;
    }
  };

  // get Sana Site Settings Sana Api
  static getSanaSettings = async () => {
    const apiEndpoint = config.APIMethods.Common.SiteSettings;
    try {
      const { data: sitesettings } = await httpService.get(apiEndpoint);
      return sitesettings;
    } catch (ex) {
      if (ex.response && ex.response.status === 404);
      throw ex;
    }
  };

  static getSanaShopContext = async () => {
    const apiEndpoint = config.APIMethods.Common.ShopContext;
    try {
      const { data: shopContext } = await httpService.get(apiEndpoint);
      return shopContext;
    } catch (ex) {
      if (ex.response && ex.response.status === 404);
      throw ex;
    }
  };

  static getDesableDates = async () => {
    const apiEndpoint = config.APIMethods.Common.DisableDates;
    try {
      const { data: disabledates } = await httpService.get(apiEndpoint);
      return disabledates;
    } catch (ex) {
      if (ex.response && ex.response.status === 404);
      throw ex;
    }
  };

  static getShopLanguages = async () => {
    const apiEndpoint = config.APIMethods.Common.ShopLanguages;
    try {
      const { data: shopLanguages } = await httpService.get(apiEndpoint);
      return shopLanguages;
    } catch (ex) {
      if (ex.response && ex.response.status === 404);
      throw ex;
    }
  };
}

export default ContentApi;
