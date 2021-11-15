import axiosClient from './../config/axiosClient';

class ApartmentApi {
  get = (params) => {
    const url = "/apartment";
    return axiosClient.get(url, {
      params
     });
  };

  count = (params) => {
    const url = "/all-count";
    return axiosClient.get(url, {
      params
     });
  };
}
const apartmentApi = new ApartmentApi();
export default apartmentApi;
