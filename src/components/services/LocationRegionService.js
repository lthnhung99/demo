import axios from "axios";

class LocationRegionService {
  static getAllProvinces() {
    return axios.get("https://vapi.vnappmob.com/api/province/");
  }
  static getAllDistricts(id) {
    return axios.get(`https://vapi.vnappmob.com/api/province/district/${id}`);
  }
  static getAllWards(id) {
    return axios.get(`https://vapi.vnappmob.com/api/province/ward/${id}`);
  }

  static getById(id) {
    return axios.get(`https://vapi.vnappmob.com/api/province/${id}`);
  }
}

export default LocationRegionService;
