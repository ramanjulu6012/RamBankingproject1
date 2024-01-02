import React, { useState, useEffect } from "react";
import BranchService from "../Services/BranchService";
import Customer_Benf_Master from "./Customer_Benf_Master";

export default function Customer_Benf_List() {
  const [statobj, setStatobj] = useState("");
  const [statuser, setStatuser] = useState("");
  const [update, setUpdate] = useState(false);
  const [custid, setCustid] = useState(0);

  useEffect(() => {
    setCustid(sessionStorage.getItem("cust_user"));
    GetData();
  }, []);

  const Add = (Obj, Mode) =>{
    const obj = {
        accountid: custid,        
    }  
    setStatobj(obj);
    setUpdate(true);

  }
  const Edit = (Obj, Mode) => {
    const obj = {
      accountid: Obj.accountid,
      beneficiaryacno: Obj.beneficiaryacno,
      beneficiarybank: Obj.beneficiarybank,
      beneficiarybranch: Obj.beneficiarybranch,
      beneficiaryifsc: Obj.beneficiaryifsc,
      customerid: Obj.customerid,
      id: Obj.id,
      maxtxnamount: Obj.maxtxnamount,
      mode: Mode,
    };
    setStatobj(obj);
    setUpdate(true);
  };

  function ParentAlert() {
    GetData();
  }

  const GetData = () => {
    setCustid(sessionStorage.getItem("cust_user"));
    BranchService.GetCustomerBenef(sessionStorage.getItem("cust_user"))
      .then((response) => {
        setStatuser(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const items = [];
  for (const Obj of statuser) {
    //console.log(Obj);
    items.push(
      <tr key={Obj.id}>
        <td>{Obj.beneficiaryacno}</td>
        <td>{Obj.beneficiarybank}</td>
        <td>{Obj.beneficiarybranch}</td>
        <td>{Obj.beneficiaryifsc}</td>
        <td>{Obj.maxtxnamount}</td>

        <td>
          <button
            className="btn btn-sm btn-dark"
            onClick={() => Edit(Obj, "Update")}
          >
            Edit
          </button>
        </td>
      </tr>
    );
  }

  return (
    <>
      <div className="row">
        <div className="col-sm-8">
          <button
            className="btn btn-dark my-2"
            onClick={() => Add(0, "Add")}
          >
            Add New
          </button>
          <h6 className="row mx-2">Beneficiary List</h6>
          <table className="table table-sm table-striped table-dark">
            <thead>
              <tr>
                {/* <th scope="col">Branch Id</th> */}
                <th scope="col">Account No</th>
                <th scope="col">Bank</th>
                <th scope="col">Branch</th>
                <th scope="col">IFSC</th>
                <th scope="col">Max Txn Amount</th>

                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>{items}</tbody>
          </table>
        </div>

        <div className="col-sm-4">
          {update && (
            <Customer_Benf_Master data={statobj} alert={ParentAlert} />
          )}
        </div>
      </div>
    </>
  );
}
