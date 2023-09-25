import axios from 'axios';

class CustomerService {
  static getAlls() {
    return axios.get('http://localhost:4000/customers');
  }

  static getById(id) {
    return axios.get(`http://localhost:4000/customers/${id}`);
  }

  static create(obj) {
    return axios.post('http://localhost:4000/customers', obj);
  }

  static update(id, obj) {
    return axios.patch(`http://localhost:4000/customers/${id}`, obj);
  }
}

export default CustomerService;