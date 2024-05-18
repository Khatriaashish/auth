import axiosInstance from "./axios.config";

class HttpService {
  headers;

  getHeader = (config) => {
    this.headers = {};
    if (config && config.file) {
      this.headers = {
        ...this.headers,
        "Content-type": "multipart/form-data",
      };
    }
    if (config && config.auth) {
      const token = localStorage.getItem("_au");
      if (!token) {
        throw new Error("Token not set");
      }
      this.headers = {
        ...this.headers,
        Authorization: "Bearer " + token,
      };
    }
  };

  postRequest = async (url, data = {}, config = null) => {
    try {
      this.getHeader(config);
      let response = await axiosInstance.post(url, data, {
        headers: this.headers,
      });

      return response;
    } catch (except) {
      console.log("PostReq: ", except);
      throw except;
    }
  };

  getRequest = async (url, config = null) => {
    try {
      this.getHeader(config);
      let response = await axiosInstance.get(url, {
        headers: this.headers,
      });

      return response;
    } catch (except) {
      console.log("GetReq: ", except);
    }
  };

  deleteRequest = async (url, config = null) => {
    try {
      this.getHeader(config);
      let response = await axiosInstance.delete(url, {
        headers: this.headers,
      });

      return response;
    } catch (except) {
      throw except;
    }
  };

  putRequest = async (url, data = {}, config = null) => {
    try {
      this.getHeader(config);
      let response = await axiosInstance.put(url, data, {
        headers: this.headers,
      });

      return response;
    } catch (except) {
      throw except;
    }
  };
}

export default HttpService;
