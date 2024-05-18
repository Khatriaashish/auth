import HttpService from "../repository/http.service";

class ApiCall extends HttpService {
  signUp = async (data) => {
    try {
      const response = await this.postRequest("/auth/signup", data, {
        file: true,
      });

      return response;
    } catch (error) {
      throw error;
    }
  };

  getActivationTokenVerify = async (token) => {
    try {
      let response = await this.getRequest("/auth/verify-token/" + token);
      return response;
    } catch (except) {
      throw except;
    }
  };

  activateUser = async (token, data) => {
    try {
      let response = await this.postRequest(
        "/auth/set-password/" + token,
        data
      );
      return response;
    } catch (except) {
      throw except;
    }
  };

  forgetPassword = async (data) => {
    try {
      let response = await this.postRequest("/auth/forget-password", data);
      return response;
    } catch (except) {
      throw except;
    }
  };

  resetPassword = async (token, data) => {
    try {
      let response = await this.postRequest(
        "/auth/reset-password/" + token,
        data
      );
      return response;
    } catch (except) {
      throw except;
    }
  };

  login = async (data) => {
    try {
      const response = await this.postRequest("/auth/login", data);
      localStorage.setItem("_au", response.result.token);
      localStorage.setItem("_rt", response.result.refreshToken);
      return response;
    } catch (error) {
      throw error;
    }
  };

  profile = async () => {
    try {
      let response = await this.getRequest("/auth/profile", { auth: true });
      return response;
    } catch (except) {
      throw except;
    }
  };

  deleteAccount = async () => {
    try {
      let response = await this.deleteRequest("/auth/profile", { auth: true });
      return response;
    } catch (except) {
      throw except;
    }
  };

  logout = async () => {
    try {
      let response = await this.postRequest("/auth/logout", {}, { auth: true });
      return response;
    } catch (except) {
      throw except;
    }
  };

  updateProfile = async (data) => {
    try {
      let response = await this.putRequest("/auth/profile", data, {
        auth: true,
        file: true,
      });
      return response;
    } catch (except) {
      throw except;
    }
  };
}

export const apiCall = new ApiCall();
