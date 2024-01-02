import React, { useState } from "react";
import EmployeeService from "../Services/EmployeeService";
import { userService } from "../messageService";
import { useNavigate } from "react-router-dom";

function EmployeeLogin(props) {
  const navigate = useNavigate();
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");

  const onChangeUserid = (e) => {
    setUserid(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const SubmitForm = (e) => {
    var data = {
      userid: userid,
      password: password,
    };

    EmployeeService.GetSingleEmployee(data)
      .then((response) => {
        setUserid(response.data.userid);
        setPassword(response.data.password);
        setSubmitted(true);
        setName(response.data.name);
        sessionStorage.setItem("token", true);
        sessionStorage.setItem("emp_user", response.data.userid);
        sessionStorage.setItem("username", response.data.name);
        sessionStorage.setItem("emp_branchid", response.data.branchid);
        sessionStorage.setItem("isadmin", true);
        userService.sendUser(JSON.parse(data.userid));
        navigate("/branchlist");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div id="Login" className="container col-sm-3 my-3">
      {submitted ? (
        <div>
          <h4>Welcome {name} </h4>
        </div>
      ) : (
        <div className="">
          <div className="form-group">
            <label htmlFor="title">Employee ID</label>
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

          <button onClick={SubmitForm} className="btn btn-dark my-2">
            Login
          </button>
        </div>
      )}
    </div>
  );
}
export default EmployeeLogin;
