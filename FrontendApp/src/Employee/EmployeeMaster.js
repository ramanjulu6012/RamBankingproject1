import React, { useState, useEffect } from "react";
import BranchService from "../Services/BranchService";
import CustomerService from "../Services/CustomerService";

function EmployeeMaster(props) {
  const [employeeid, setEmployeeid] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [issubmitted, setIssubmitted] = useState("");
  const [lable, setLable] = useState("");
  const [btnlable, setBtnlable] = useState("");
  const [disableid, setDisableid] = useState("");
  const [productid, setProductid] = useState("");
  const [productlist, setProductlist] = useState("");

  useEffect(() => {

    CustomerService.GetBranches()
      .then((response) => {
        const items = [];
        for (const Obj of response.data) {
          items.push( <option value={Obj.id}>{Obj.id}-{Obj.name}</option>  )
        }
        setProductlist(items);
      });
      

    setIssubmitted(false);
    if (props.data.mode === "Update") {
      setBtnlable("Update");
      setLable("Update Employee");
      setEmployeeid(props.data.employeeid);
      setDisableid(true);
      setName(props.data.name);
      setPassword(props.data.password);
      setProductid(props.data.branchid);
    } else {
      setBtnlable("Add New");
      setLable("Add Employee");
      setEmployeeid("");
      setDisableid(false);
      setName("");
      setPassword("");
      setProductid("");
    }
  }, [props.data]);

  
  const onChangeid = (e) => {
    setEmployeeid(e.target.value);
  };

  const onChangebranchname = (e) => {
    setName(e.target.value);
  };

  const onChangeProductId = (e) => {
    setProductid(e);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const Save = async () => {
    var data = {
      employeeid: employeeid,
      name: name,
      password: password,
      branchid: productid

    };
    BranchService.createEmployee(data)
      .then((response) => {
        setIssubmitted(true);
        props.alert()
      })
      .catch((e) => {
        console.log(e);
      });
      
  };

  return (
    <div>
      <div className="submit-form my-4">
        {issubmitted ? (
          <div className="row my-4">
            <h6 className="alert alert-success">Data saved successfully !</h6>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <h6 className="row mx-1">{lable}</h6>
              <label htmlFor="id">Employee Id</label>
              <input
                type="text"
                className="form-control"
                readOnly={disableid}
                id="id"
                required
                value={employeeid}
                onChange={onChangeid}
                name="id"
              />
            </div>

            <div className="form-group">
              <label htmlFor="branchname">Name</label>
              <input
                type="text"
                className="form-control"
                id="branchname"
                required
                value={name}
                onChange={onChangebranchname}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="branchname">Password</label>
              <input
                type="text"
                className="form-control"
                id="password"
                required
                value={password}
                onChange={onChangePassword}
                name="password"
              />
            </div>

            <div className="form-group">
                <label htmlFor="inputPassword4">Branch</label>
                <select
                  onChange={(e) => onChangeProductId(e.target.value)}
                  value={productid}
                  className="form-select my-2"
                  aria-label="Select Option"
                >
                  <option selected>Select Option</option>
                  {productlist}

                </select>
              </div>


            <button onClick={Save} className="btn btn-dark my-2">
              {btnlable}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

EmployeeMaster.propTypes = {};

export default EmployeeMaster;
