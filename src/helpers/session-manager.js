const Cookies = require("js-cookie");

// session manager to manage cooekies
class SessionManager {
  // set cookie(name: cookiie key, value: vlaue, time: expiration time[munits]).
  static setCookie = (name, value, time = 1) => {
    const timeindays = 0.00069 * time;
    Cookies.set(name, value, { expires: timeindays });
  };

  // chekc cookie exsist (name: cookiie key).
  static chekcCookieExsitst = (name) => {
    if (this.getCookie(name)) {
      return true;
    }
    return false;
  };

  // get cookie by key (name: cookiie key).
  static getCookie = name =>
    Cookies.get(name);

  static getCookieJSON = name =>
    Cookies.getJSON(name);

  // remove cookie by (name: cookie key)
  static removeCookie = name =>
    Cookies.remove(name);
}

export default SessionManager;
