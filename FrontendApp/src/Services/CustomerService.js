import http from "./http-common";

class CustomerService {
  GetSingleCustomer(data) {
    return http.get("/customer/customer/" + data);
  }

  GetSingleAccount(data) {
    return http.get("/account/account/" + data);
  }

  GetProducts() {
    return http.get("/product/product/");
  }

  GetBranches() {
    return http.get("/branch/branch/");
  }

  Save(data) {
    return http.post("/customer/customer/", data);
  }

  SaveTxn(data) {
    return http.post("/transaction/transaction/", data);
  }

  SaveAccount(data) {
    return http.post("/account/save/", data);
  }
}
export default new CustomerService();
