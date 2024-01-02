import React, { useState } from "react";
import PropTypes from "prop-types";
import EmployeeService from "../Services/EmployeeService";
import { userService } from "../messageService";
import { useNavigate } from "react-router-dom";

function CustomerLogin(props) {
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLogin, setIslogin] = useState(false);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const Register = () => {
    navigate("/register");
  };
  const SubmitForm = () => {
    var data = {
      userid: userid,
      password: password,
    };

    EmployeeService.GetSingleCustomer(data)
      .then((response) => {
        setUserid(response.data.userid);
        setPassword(response.data.password);
        setSubmitted(true);
        setIslogin(true);
        setName(response.data.longname);
        sessionStorage.setItem("token", true);
        sessionStorage.setItem("cust_user", response.data.customerid);
        sessionStorage.setItem("username", response.data.longname);
        sessionStorage.setItem("isadmin", false);
        userService.sendUser(JSON.parse(data.userid));
        navigate("/beneficiary");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onChangeUserid = (e) => {
    setUserid(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <div>
        <div id="Login" className="container col-sm-3 my-3">
          {submitted ? (
            <div>
              <h4>Welcome {name} </h4>
            </div>
          ) : (
            <div className="">
              <div className="form-group">
                <label htmlFor="title">Customer Id</label>
                <input
                  type="text"
                  className="form-control"
                  id="userid"
                  required
                  value={userid}
                  onChange={onChangeUserid}
                  name="userid"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  required
                  value={password}
                  onChange={onChangePassword}
                  name="password"
                />
              </div>

              <div className="row">
                <button onClick={SubmitForm} className="btn btn-dark my-2">
                  Login
                </button>
                <button onClick={Register} className="btn btn-dark my-2">
                  Register
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

CustomerLogin.propTypes = {};

export default CustomerLogin;
