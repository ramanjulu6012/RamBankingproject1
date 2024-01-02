import http from "./http-common";

class EmployeeService {
  GetSingleEmployee(data) {
    return http.post("/employee/login/", data);
  }

  validatecustbyidandpan(data) {
    return http.post("/customer/validatecustbyidandpan/", data);
  }
  
  GetSingleCustomer(data) {
    return http.post("/customer/login/", data);
  }


}


export default new EmployeeService();
