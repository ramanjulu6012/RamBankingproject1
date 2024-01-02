import "./App.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Home/Header";
import EmployeeLogin from "./Employee/EmployeeLogin";
import { userService } from "./messageService"
import BranchList from "./Branch/BranchList";
import Protected from "./Common/Protected";
import Transaction_Master from "./Customer/Transaction_Master";
import Customer_List from "./Customer/Customer_List";
import "react-datepicker/dist/react-datepicker.css"
import Account_Master_Parent from "./Customer/Account_Master_Parent";
import EmployeeList from "./Employee/EmployeeList";
import Customer_Benf_List from "./Customer/Customer_Benf_List";
import Register from "./Customer/Register";
import CustomerLogin from "./Employee/CustomerLogin";
import Transaction_View from "./Customer/Transaction_View";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      user: "",
      LoginAsCustomer : false
    }; 
  
  }
  
  componentDidMount() {
    this.subscription5 = userService.getMessage().subscribe((message) => {
      if (message) {
        this.setState({ user: message.text });        
      } else {
        this.setState({ user: "" });
      }
    });   
  }

  render() {
    return (
      <>
      <div>
        <Header />
        <div id="Main" className="container-fluid">
        <Routes>
              <Route path="/" element={<Protected Component={BranchList} Group="Admin" />} />
              <Route path="/branchlist" element={<Protected Component={BranchList} Group="Admin"  />} />
              <Route path="/customer" element={<Protected Component={Customer_List} Group="Admin" />} />
              <Route path="/accountmaster" element={<Protected Component={Account_Master_Parent} Group="Admin" />} />
              <Route path="/transactionmaster" element={<Protected Component={Transaction_Master} Group="Admin" />} />
              <Route path="/employeelist" element={<Protected Component={EmployeeList} Group="Admin" />} />
              <Route path="/transactionlist" element={<Protected Component={Transaction_View} Group="Admin" />} />
              <Route path="/beneficiary" element={<Protected Component={Customer_Benf_List} Group="Admin" />} />  
              <Route path="/employeelogin" element={<EmployeeLogin />} />
              <Route path="/customerlogin" element={<CustomerLogin />} />
              <Route path="/register" element={<Register />} />
            </Routes>
        </div>
      </div>
      </>
    );
  }
}

export default App;
