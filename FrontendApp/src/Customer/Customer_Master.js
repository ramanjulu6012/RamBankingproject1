import React, { useEffect, useState } from "react";
import CustomerService from "../Services/CustomerService";
import DatePicker from "react-datepicker";
import { faL } from "@fortawesome/free-solid-svg-icons";


//import { useNavigate } from "react-router-dom";
function Customer_Master(props) {
  //const navigate = useNavigate();

  const [customername, setCustomername] = useState("");
  const [panno, setPanno] = useState("");
  const [aadhaarno, setAadhaarno] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [mobile, setMobile] = useState("");
  const [emailid, setEmailid] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [address3, setAddress3] = useState("");
  const [city, setCity] = useState("");
  const [isreadonly, setIsreadonly] = useState(false);
  const [mode, SetMode] = useState(false);
  const [msgstring, SetMsgstring] = useState("");
  const [btnname, SetBtnname] = useState("");

  const Save = async () => {
    var data = {
      customerid: props.obj.customerid,
      panno: panno,
      aadhaarno: aadhaarno,
      dob: dob,
      longname: customername,
      gender: gender,
      mobile: mobile,
      emailid: emailid,
      address1: address1,
      address2: address2,
      address3: address3,
      city: city,
    };

    CustomerService.Save(data)
      .then((response) => {
        SetMode(props.Mode);
        if (props.Mode === "Add") {
          SetMsgstring(
            "Customer Id #" + response.data.customerid + " Added successfully"
          );
        } else if (props.Mode === "Edit") {
          SetMsgstring(
            "Customer Id #" + response.data.customerid + " Updated successfully"
          );
        } else {
          SetMsgstring("Error: Something went Wrong.. ");
        }
      })
      .catch((e) => {
        console.log("error=", e);
      })
      .finally((x) => {
        console.log("finally=", x);
      });
  };
  const onChangeCustomerName = (e) => {
    setCustomername(e.target.value);
  };
  const onChangePanno = (e) => {
    setPanno(e.target.value);
  };
  const onChangeAadhaarno = (e) => {
    setAadhaarno(e.target.value);
  };
  const onChangeDob = (e) => {
   setDob(e);
  };
  const onChangeGender = (e) => {
    setGender(e);
  };
  const onChangeMobile = (e) => {
    setMobile(e.target.value);
  };
  const onChangeEmailid = (e) => {
    setEmailid(e.target.value);
  };

  const onChangeAddress1 = (e) => {
    setAddress1(e.target.value);
  };

  const onChangeAddress2 = (e) => {
    setAddress2(e.target.value);
  };

  const onChangeAddress3 = (e) => {
    setAddress3(e.target.value);
  };

  const onChangeCity = (e) => {
    setCity(e.target.value);
  };

  useEffect(() => {
    //console.log(props.obj.customerid);
    if (props.obj.customerid === "" && props.Mode !== "Add") {
      SetMode(props.Mode);
      SetMsgstring("Invalid Customer Id");
    } else {
      SetMode("");
    }
    //SetMode("");

    if (props.Mode === "View") {
      setIsreadonly(true);
      SetBtnname("View");
    } else if (props.Mode === "Add") {
      SetBtnname("Add");
      setIsreadonly(false);
    } else {
      SetBtnname("Update");
      setIsreadonly(false);
    }
    //console.log(props.obj);
    setCustomername(props.obj.longname);
    setPanno(props.obj.panno);
    setAadhaarno(props.obj.aadhaarno);
    setDob(props.obj.dob);
    setGender(props.obj.gender);
    setMobile(props.obj.mobile);
    setEmailid(props.obj.emailid);
    setAddress1(props.obj.address1);
    setAddress2(props.obj.address2);
    setAddress3(props.obj.address3);
    setCity(props.obj.city);
  }, [props.obj]);

  return (
    <>
      <h6 className="row"> Customer Master ({props.Mode}) </h6>
      
      {mode ? (
        <div className="row my-4">
          <h6 className="alert alert-success">{msgstring}</h6>
        </div>
      ) : (
        <div>
          <div className="form-row">
            <div className="row">
              <div className="form-group col-md-6">
                <label htmlFor="inputPassword4">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  id="customername"
                  required
                  value={customername}
                  onChange={onChangeCustomerName}
                  name="customername"
                  readOnly={isreadonly}
                />
              </div>

              <div className="form-group col-md-6">
                <label htmlFor="inputPassword4">Address 1</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Address 1"
                  id="address1"
                  required
                  value={address1}
                  onChange={onChangeAddress1}
                  name="address1"
                  readOnly={isreadonly}
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label htmlFor="inputPassword4">Address 2</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Address 2"
                  id="address2"
                  required
                  value={address2}
                  onChange={onChangeAddress2}
                  name="address2"
                  readOnly={isreadonly}
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputPassword4">Address 3</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Address 2"
                  id="address2"
                  required
                  value={address3}
                  onChange={onChangeAddress3}
                  name="address3"
                  readOnly={isreadonly}
                />
              </div>
            </div>

            <div className="row">
              <div className="form-group col-md-6">
                <label htmlFor="inputPassword4">City</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="City"
                  id="city"
                  required
                  value={city}
                  onChange={onChangeCity}
                  name="city"
                  readOnly={isreadonly}
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputPassword4">Permanent Account Number (PAN)</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="PAN"
                  id="panno"
                  required
                  value={panno}
                  onChange={onChangePanno}
                  name="panno"
                  readOnly={isreadonly}
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label htmlFor="inputPassword4">Aadhaar no</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Aadhaar No"
                  id="aadhaarno"
                  required
                  value={aadhaarno}
                  onChange={onChangeAadhaarno}
                  name="aadhaarno"
                  readOnly={isreadonly}
                />
              </div>

              <div className="form-group col-md-6">
                <label htmlFor="inputPassword4">Birth Date</label>
                <DatePicker
                  className="form-control"
                  id="dob"
                  required
                  selected={dob}
                  onChange={onChangeDob}
                  dateFormat="dd/MM/yyy"
                  name="dob"
                  readOnly={isreadonly}
                />
              </div>
            </div>
            <div className="row">
              <div className="form-group col-md-6">
                <label htmlFor="inputPassword4">Gender</label>
                <select
                  onChange={(e) => onChangeGender(e.target.value)}
                  value={gender}
                  className="form-select my-2"
                  aria-label="Select Option"
                >
                  {/* <option selected>Select Option</option> */}
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group col-md-6">
                <label htmlFor="inputPassword4">Mobile no</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Mobile No"
                  id="mobile"
                  required
                  value={mobile}
                  onChange={onChangeMobile}
                  name="mobile"
                />
              </div>
            </div>

            <div className="row">
              <div className="form-group col-md-6">
                <label htmlFor="inputPassword4">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="E-mail"
                  id="email"
                  required
                  value={emailid}
                  onChange={onChangeEmailid}
                  name="aadhaarno"
                />
              </div>
            </div>
          </div>

          <button onClick={Save} className="btn btn-dark my-2">
            {btnname}
          </button>
        </div>
      )}
    </>
  );
}

export default Customer_Master;
