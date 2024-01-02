import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { userService } from "../messageService";

export default function AdminHeader() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [username, setUsername] = useState("");
  
  useEffect(() => {
    //const items = [];

    setUsername(sessionStorage.getItem("username"));
    const subscription1 = userService.getMessage().subscribe((message) => {
      if (message) {
        setUser(message.text);
      } else {
      }
    });
  }, [user]);

  const Logout = () => {
    const tk = sessionStorage.getItem("token");
    if (tk) {
      setUser("");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("emp_user");
      sessionStorage.removeItem("emp_branchid");
      sessionStorage.removeItem("emp_name");
      sessionStorage.removeItem("cust_user");
      sessionStorage.removeItem("cust_name");
      sessionStorage.removeItem("username");
      sessionStorage.removeItem("cust_branchid");
      sessionStorage.removeItem("isadmin");
     
    }
    navigate("/employeelogin");
  };


  return (
    <>
      <li className="nav-item">
        <Link to={"/branchlist"} className="nav-link">
          Branch
        </Link>
      </li>
      <li className="nav-item">
        <Link to={"/employeelist"} className="nav-link">
          Employee
        </Link>
      </li>
      <li className="nav-item">
        <Link to={"/customer"} className="nav-link">
          Customer
        </Link>
      </li>
      <li className="nav-item">
        <Link to={"/accountmaster"} className="nav-link">
          Account
        </Link>
      </li>
      
      <li className="nav-item">
        <Link to={"/transactionmaster"} className="nav-link">
          Post Transaction
        </Link>
      </li>
      <li className="nav-item">
        <Link to={"/transactionlist"} className="nav-link">
          View Transaction
        </Link>
      </li>
      <li className="nav-item">
        <Link onClick={Logout} className="nav-link">
          Logout {user}-{username}
         
        </Link>
      </li>
    </>
  );
}
