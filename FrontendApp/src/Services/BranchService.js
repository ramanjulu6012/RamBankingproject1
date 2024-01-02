import http from "./http-common";

class BranchService {
  create(data) {
    return http.post("/branch/branch", data);
  }


  createBenf(data) {
    return http.post("customer/addbenef/", data);
  }

  createEmployee(data) {
    return http.post("/employee/save", data);
  }

  GetBranches() {
    return http.get("/branch/branch");
  }

  GetStatement(data) {
    return http.get("/transaction/statement/" + data);
  }

  

  GetCustomerBenef(data) {
    return http.get("/customer/customerbenf/" + data);
  }

  GetEmployee() {
    return http.get("/employee/employee");
  }

  GetBranches1() {
    http
      .get("/branch/branch")
      .then((response) => {
        return response.data;
      })
      .catch((e) => {
        console.log(e);
      });
  }
}
export default new BranchService();
