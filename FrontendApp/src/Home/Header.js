import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { userService } from "../messageService";
import { useNavigate } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import CustomerHeader from "./CustomerHeader";

export default function Header(props) {
  const [user, setUser] = useState("");
  const [username, setUsername] = useState("");
  const [isadmin, setIsadmin] = useState(false);

  const [token, setToken] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setToken(sessionStorage.getItem("token"));
    setUsername(sessionStorage.getItem("username"));
    setIsadmin(sessionStorage.getItem("isadmin"));
    const subscription1 = userService.getMessage().subscribe((message) => {
      if (message) {
        setUser(message.text);
      } else {
      }
    });
  }, );
  return (
    <>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/employeelogin"} className="navbar-brand">
        Online Maybank
        </Link>
        <div className="navbar-nav mr-auto">
        
        <> {isadmin==="false" && token==="true"? ( <> <CustomerHeader  /> </>): (<div></div> )}  </>
        <> {isadmin==="true" && token==="true"? ( <> <AdminHeader  /> </>): ( <div></div>  )}  </>
          {token==="false" || token==null    ? (
            <>
              <li className="nav-item">
                <Link to={"/employeelogin"} className="nav-link">
                  Employee Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/customerlogin"} className="nav-link">
                  Customer Login
                </Link>
              </li>
            </>
          ) : (
            <div></div>
          )}
        </div>
      </nav>
    </>
  );
}
