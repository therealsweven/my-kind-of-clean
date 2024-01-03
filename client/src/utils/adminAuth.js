import decode from "jwt-decode";

class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    const adminLoggedIn = localStorage.get("adminLoggedIn");
    return token && !this.isTokenExpired(token) && adminLoggedIn === true
      ? true
      : false;
  }

  isTokenExpired(token) {
    const decoded = decode(token);
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem("id_token");
      return true;
    }
    return false;
  }

  getToken() {
    return localStorage.getItem("id_token");
  }

  login(idToken, adminId) {
    localStorage.setItem("id_token", idToken);
    localStorage.setItem("adminId", adminId);
    localStorage.setItem("adminLoggedIn", true);
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("adminId");
    localStorage.removeItem("adminLoggedIn");
    window.location.assign("/");
  }
}

const auth = new AuthService();
export default auth;
