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
}

export const apiCall = new ApiCall();
