import React, { useState, useEffect } from "react";
import BranchService from "../Services/BranchService";
// import Branch_Master from "../Branch/Branch_Master";

export default function Customer_Benf_ListTransaction_View() {
  const [statobj, setStatobj] = useState("");
  const [statuser, setStatuser] = useState("");
  const [update, setUpdate] = useState(false);
  //const [acountid, setAccountid] = useState("");

  //setAccountid(sessionStorage.getItem("username"));

  const Edit = (Branchid, Name, Mode) => {
    const obj = { branchid: Branchid, branchname: Name, mode: Mode };
    setStatobj(obj);
    setUpdate(true);
  };

  function ParentAlert() {
    GetData();
  }

  const GetData = () => {

    
    BranchService.GetStatement(1)
      .then((response) => {
        setStatuser(response.data);
        //console.log(statuser);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    GetData();
  }, []);

  const items = [];
  for (const Obj of statuser) {
    items.push(
      <tr key={Obj.txnid}>
        <td key={Obj.txnid}>{Obj.txnid}</td>
        <td>{Obj.txndate}</td>
        <td>{Obj.narration}</td>
        <td>{Obj.instrno}</td>
        <td>{Obj.drcr}</td>
        <td>{Obj.txnamount}</td>
        <td>{Obj.clossingbalance}</td>
        {/* <td>
          <button
            className="btn btn-sm btn-dark"
            onClick={() => Edit(Obj.id, Obj.name, "Update")}
          >
            Edit
          </button>
        </td> */}
      </tr>
    );
  }

  return (
    <>
      <div className="row">
        <div className="col-sm-8">
          {/* <button
            className="btn btn-dark my-2"
            onClick={() => Edit(0, 0, "Add")}
          >
            Add New
          </button> */}
          <h6 className="row mx-2">Transaction View</h6>
          <table className="table table-sm table-striped table-dark">
            <thead>
              <tr>
              <th scope="col">Txn Id</th>
                <th scope="col">Date</th>
                <th scope="col">Naration</th>
                <th scope="col">Instr No</th>
                <th scope="col">Dr/Cr</th>
                <th scope="col">Txn Amount</th>
                <th scope="col">Balance</th>
                {/* <th scope="col">Action</th> */}
              </tr>
            </thead>
            <tbody>{items}</tbody>
          </table>
        </div>

        {/* <div className="col-sm-4">
          {update && <Branch_Master data={statobj} alert={ParentAlert} />}
        </div> */}
      </div>
    </>
  );
}
