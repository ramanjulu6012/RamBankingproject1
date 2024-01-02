import React, { useState, useEffect } from "react";
import CustomerService from "../Services/CustomerService";

function Account_Master(props) {
  const [isreadonly, setIsreadonly] = useState(false);
  const [mode, SetMode] = useState(false);
  const [msgstring, SetMsgstring] = useState("");
  const [btnname, SetBtnname] = useState("");
  const [name, SetName] = useState("");
  const [accountno, SetAccountno] = useState("");
  const [customerid, setCustomerid] = useState("");
  const [accountclosedate, setAccountclosedate] = useState("");
  const [accountopendate, SetAccountopendate] = useState("");
  const [accountstatus, SetAccountstatus] = useState("");
  const [balance, setBalance] = useState("");
  const [branchid, setBranchid] = useState("");
  const [closedbyuser, setClosedbyuser] = useState("");
  const [modeofoperation, setModeofoperation] = useState("");
  const [openbyuser, setOpenbyuser] = useState("");
  const [productid, setProductid] = useState("");
  const [productlist, setProductlist] = useState("");
  

  useEffect(() => {
    //console.log(props.obj.accountno)
    SetAccountno(props.obj.accountno);
    setCustomerid(props.obj.customerid);
    setAccountclosedate(props.obj.accountclosedate);
    SetAccountopendate(props.obj.accountopendate);
    SetAccountstatus(props.obj.accountstatus);
    setBalance(props.obj.balance);
    setBranchid(props.obj.branchid);
    setClosedbyuser(props.obj.closedbyuser);
    setModeofoperation(props.obj.modeofoperation);
    setOpenbyuser(props.obj.openbyuser);
    setProductid(props.obj.productid);
    SetName(props.obj.name);

    //console.log(props.obj.customerid);
    //onBlurAccountNo(props.obj.customerid);

    //console.log(props.obj)

    if (props.obj.accountno === "" && props.Mode !== "Add") {
      SetMode(props.Mode);
      SetMsgstring("Invalid Account Id");
    } else {
      SetMode("");
    }

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

    CustomerService.GetProducts()
      .then((response) => {
        const items = [];
        for (const Obj of response.data) {
          items.push( <option value={Obj.productCode}>{Obj.productCode}-{Obj.productName}</option>  )
        }
        setProductlist(items);
      });
  }, [props.obj]);

  const Save = async () => {
    const data = {
      accountno: props.obj.accountno,
      accountclosedate: accountclosedate,
      accountopendate: accountopendate,
      accountstatus: accountstatus,
      balance: balance,
      branchid: branchid,
      closedbyuser: closedbyuser,
      customerid: customerid,
      name : name,
      modeofoperation: modeofoperation,
      openbyuser: openbyuser,
      productid: productid,
    };

    //console.log(data);
    
    CustomerService.SaveAccount(data)
      
      .then((response) => {
        SetMode(props.Mode);
        if (props.Mode === "Add") {
          SetMsgstring(
            "Account Id #" + response.data.accountno + " Added successfully !"
          );
        } else if (props.Mode === "Edit") {
          SetMsgstring(
            "Account Id #" + response.data.accountno + " Updated successfully !"
          );
        } else {
          SetMsgstring("Error: Something went Wrong.. ");
        }
      })
      .catch((e) => {
        console.log("error=", e);
      })
      .finally((x) => {
        //console.log("finally=", x);
      });
  };


  const onChangeAccountNo = (e) => {
    SetAccountno(e.target.value);
  };

  
  const onChangeName = (e) => {
    SetName(e.target.value);
  };

  const onChangeCustomerId = (e) => {
    setCustomerid(e.target.value);
  };
  const onChangeProductId = (e) => {
    //console.log(e);
    setProductid(e);
  };
  const onChangeBalance = (e) => {
    setBalance(e.target.value);
  };
  const onChangeAccountOpenDate = (e) => {
    SetAccountopendate(e.target.value);
  };
  const onChangeAccountCloseDate = (e) => {
    setAccountclosedate(e.target.value);
  };
  const onChangeAccountOpenUser = (e) => {
    setOpenbyuser(e.target.value);
  };

  const onChangeAccountCloseUser = (e) => {
    setClosedbyuser(e.target.value);
  };

  const onChangeAccountStatus = (e) => {
    SetAccountstatus(e);
  };
  const onChangeModeOfOperation = (e) => {
    setModeofoperation(e);
  };

  const onChangeBranchId = (e) => {
    setBranchid(e.target.value);
  };

  const onBlurAccountNo = (e) => {
    //console.log(customerid);
    //if(e >0){
    CustomerService.GetSingleCustomer(customerid)
    .then((response) => {
      console.log(response.data.longname);
      SetName(response.data.longname)
    })
    .catch((e) => {
      console.log("error in Account Master=", e);
    })
  //}

  }

  return (
    <>
      <h6 className="row"> Account Master ({props.Mode}) </h6>
      
      {mode ? (
        <div className="row my-4">
          <h6 className="alert alert-success">{msgstring}</h6>
        </div>
      ) : (
        <div>
          <div className="form-row">
            <div className="row">
              <div className="form-group col-md-6">
                <label htmlFor="inputPassword4">Account</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Account Id"
                  id="accountid"
                  required
                  value={accountno}
                  onChange={onChangeAccountNo}
                  name="accountno"
                  //readOnly={isreadonly}
                  readOnly="true"
                />
              </div>

              <div className="form-group col-md-6">
                <label htmlFor="inputPassword4">Customer Id</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Customer Id"
                  id="customerid"
                  required
                  value={customerid}
                  onChange={onChangeCustomerId}
                  onBlur={onBlurAccountNo}
                  name="customerid"
                  readOnly={isreadonly}
                />
              </div>



              <div className="form-group col-md-6">
                <label htmlFor="inputPassword4">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  id="name"
                  required
                  value={name}
                  onChange={onChangeName}
                  name="name"
                  readOnly="true"
                />
              </div>

         


            <div className="form-group col-md-6">
                <label htmlFor="inputPassword4">Product</label>
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

              {props.Mode==="Add" || props.Mode==="Edit" ? (
              
              <div> </div>
              
      ) : (

               <div className="form-group col-md-6">
                <label htmlFor="inputPassword4">Balance</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Balance"
                  id="balance"
                  required
                  value={balance}
                  onChange={onChangeBalance}
                  name="balance "
                  readOnly={isreadonly}
                />
              </div>
      )}

{/*
              <div className="form-group col-md-6">
                <label htmlFor="inputPassword4">A/c Open Date</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="A/c Open Date"
                  id="acountopendate"
                  required
                  value={accountopendate}
                  onChange={onChangeAccountOpenDate}
                  name="accouontopendate"
                  readOnly={isreadonly}
                />
              </div>

             

              <div className="form-group col-md-6">
                <label htmlFor="inputPassword4">A/c Open User</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="A/c Open User"
                  id="acountopenuser"
                  required
                  value={openbyuser}
                  onChange={onChangeAccountOpenUser}
                  name="accouontopenuser"
                  readOnly={isreadonly}
                />
              </div> */}

             

              <div className="form-group col-md-6">
                <label htmlFor="inputPassword4">Mode of Operation</label>

              <select
                onChange={(e) => onChangeModeOfOperation(e.target.value)}
                value={modeofoperation}
                className="form-select my-2"
                aria-label="Select Option"
              >
                <option selected>Select Option</option>
                <option value="1">Single</option>
                <option value="2">Joint</option>
              </select>


              </div>

              <div className="form-group col-md-6">
                <label htmlFor="inputPassword4">Account Status</label>
              <select
                onChange={(e) => onChangeAccountStatus(e.target.value)}
                value={accountstatus}
                className="form-select my-2"
                aria-label="Select Option"
              >
                <option selected>Select Option</option>
                <option value="1">Operative</option>
                <option value="2">Inoperative</option>
                <option value="3">Closed</option>
              </select>


              </div>

              <div className="form-group col-md-6">
                <label htmlFor="inputPassword4">Branch</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Branch Id"
                  id="branchid"
                  required
                  value={branchid}
                  onChange={onChangeBranchId}
                  name="branchid"
                  readOnly={isreadonly}
                />
              </div>
            </div>

            <button onClick={Save} className="btn btn-dark my-2">
              {btnname}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Account_Master;
