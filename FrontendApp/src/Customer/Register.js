import React,{useState} from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from "react-router-dom";
import EmployeeService from "../Services/EmployeeService";


function Register(props) {

  const [customerid, setCustomerid] = useState("");
  const [pan, setPan] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const navigate = useNavigate();

  const onChangeUserid = (e) => {
    setCustomerid(e.target.value);
  };

  const onChangePan = (e) => {
    setPan(e.target.value);
  };

  const onChangePassword1 = (e) => {
    setPassword1(e.target.value)

  }

  const onChangePassword2 = (e) => {
    setPassword2(e.target.value)
  }

  const SubmitForm = (e)=> {

    var data = {
      customerid: customerid,
      panno: pan,
    };

    EmployeeService.validatecustbyidandpan(data)
    .then((response) => {


      navigate("/beneficiary");
    })
    .catch((e) => {
      console.log(e);
    });

  }
  

  return (
    <>
      <div id="Login" className="container col-sm-3 my-3">

      <div className="">
              <div className="form-group">
                <label htmlFor="title">Customer ID</label>
                <input
                  type="text"
                  className="form-control"
                  id="userid"
                  required
                  value={customerid}
                  onChange={onChangeUserid}
                  name="userid"
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Customer PAN</label>
                <input
                  type="text"
                  className="form-control"
                  id="pan"
                  required
                  value={pan}
                  onChange={onChangePan}
                  name="pan"
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Password</label>
                <input
                  type="text"
                  className="form-control"
                  id="password1"
                  required
                  value={password1}
                  onChange={onChangePassword1}
                  name="password1"
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Repeat Password</label>
                <input
                  type="text"
                  className="form-control"
                  id="password2"
                  required
                  value={password2}
                  onChange={onChangePassword2}
                  name="password2"
                />
              </div>

              <button onClick={SubmitForm} className="btn btn-dark my-2">
                  Register
                </button>

      </div>




      </div>
    
    </>
  )
}

Register.propTypes = {

}

export default Register

