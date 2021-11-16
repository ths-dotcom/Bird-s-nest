import axiosClient from './../config/axiosClient';

class ApartmentApi {
  get = (params) => {
    const url = "/apartments";
    return axiosClient.get(url, {
      params
     });
  };

  count = (params) => {
    const url = "/apartments/all-count";
    return axiosClient.get(url, {
      params
     });
  };
}
const apartmentApi = new ApartmentApi();
export default apartmentApi;
