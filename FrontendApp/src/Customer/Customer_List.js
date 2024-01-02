import React, { useState } from "react";
import Customer_Master from "./Customer_Master";
import CustomerService from "../Services/CustomerService";

function Customer_List() {
  const [customerid, setCustomerid] = useState("");
  const [mode, setMode] = useState("");
  const [disableid, setDisableid] = useState(true);
  const [custobj, setCustobj] = useState("");
  const [submodulevisible, setSubmodulevisible] = useState(false);

  const Mode = (Mode_Type) => {
    //console.log(Mode_Type);
    const Obj = {
      customerid: "",
      panno: "",
      aadhaarno: "",
      dob: "",
      longname: "",
      gender: "",
      mobile: "",
      emailid: "",
      address1: "",
      address2: "",
      address3: "",
      city: "",
      isactive: "",
      password: "",
    };

    setMode(Mode_Type);
    if (Mode_Type === "Add") {
      setCustomerid("");
      setDisableid(true);
      setCustobj(Obj);
      setSubmodulevisible(true);
    } else {
      setDisableid(false);
      setSubmodulevisible(false);
    }
  };

  const getAcno = () => {
    const Obj = {
      customerid: "",
      panno: "",
      aadhaarno: "",
      dob: "",
      longname: "",
      gender: "",
      mobile: "",
      emailid: "",
      address1: "",
      address2: "",
      address3: "",
      city: "",
      isactive: "",
      password: "",
    };

    CustomerService.GetSingleCustomer(customerid)
      .then((response) => {
        //setCustobj(response.data);
        //console.log(response.data.dob)
        var date = Date.parse(response.data.dob);
        response.data.dob = date;
        setCustobj(response.data);
        setSubmodulevisible(true);
      })
      .catch((e) => {
        setCustobj(Obj);
        //console.log('error : ',e);
      });
  };

  const onChangeCustomerId = (e) => {
    setCustomerid(e.target.value);
  };

  return (
    <>
      <div className="row">
        <div className="row col-sm-2">
          <div className="form-row">
            <select
              onChange={(e) => Mode(e.target.value)}
              className="form-select my-2"
              aria-label="Select Option"
            >
              <option value="" selected>Select Option</option>
              <option value="Add">Add</option>
              <option value="Edit">Edit</option>
              <option value="View">View</option>
            </select>

            {!disableid ? (
              <input
                type="text"
                className="form-control"
                readOnly={disableid}
                id="customerid"
                required
                value={customerid}
                onChange={onChangeCustomerId}
                name="customerid"
                placeholder="Customer id"
              />
            ) : (
              <div></div>
            )}

            {!disableid ? (
              <button
                type="button"
                onClick={() => getAcno()}
                className="btn btn-secondary my-1"
              >
                Get
              </button>
            ) : (
              <div></div>
            )}
          </div>
        </div>

        <div className="row col-sm-10">
          {submodulevisible ? (
            <Customer_Master Mode={mode} obj={custobj} />
          ) : (
            <div></div>
          )}
        </div>
      </div>
      {/* <div className="btn-group btn-dark my-2" role="group" aria-label="Basic example">
        <button
          type="button"
          onClick={() => Mode("Add")}
          className="btn btn-secondary"
        >
          Add
        </button>

    
          <input
            type="text"
            className="form-control"
            readOnly={disableid}
            id="customerid"
            required
            value={customerid}
            onChange={onChangeCustomerId}
            name="customerid"
            placeholder="Customer id"
          />
    
        <button
          type="button"
          onClick={() => Mode("Edit")}
          className="btn btn-secondary"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={() => Mode("View")}
          className="btn btn-secondary"
        >
          View
        </button>
      </div>
      <div className="row">
        <Customer_Master Mode={mode} obj={custobj} />
      </div> */}
    </>
  );
}

export default Customer_List;
