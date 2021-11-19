import axiosClient from "../config/axiosClient";
class AdminApi {
  authentication = (token?: any) => {
    const url = "/users/auth-token";
    return axiosClient
      .get(url, {
        headers: { Authorization: token },
      })
      .then((response) => response.data);
  };

  get = (slug?: string) => {
    const url = "/users/" + slug;
    return axiosClient.get(url).then((response) => response.data);
  };
}

const adminApi = new AdminApi();
export default adminApi;
