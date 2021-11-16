import axiosClient from '../config/axiosClient';

class ApartmentApi {
  list = (params?: any) => {
    const url = "/apartments";
    return axiosClient.get(url, {
      params
     }).then(response => response.data);
  };

  get = (slug?: string) => {
    const url = "/apartments/" + slug;
    return axiosClient.get(url).then(response => response.data);
  };

  count = (params?: any) => {
    const url = "/apartments/all-count";
    return axiosClient.get(url, {
      params
     });
  };
}
const apartmentApi = new ApartmentApi();
export default apartmentApi;
