import React, { useState, useEffect } from "react";
import BranchService from "../Services/BranchService";
import EmployeeMaster from "./EmployeeMaster";

export default function EmployeeList() {
  const [statobj, setStatobj] = useState("");
  const [statuser, setStatuser] = useState("");
  const [update, setUpdate] = useState(false);

  const Edit = (EmployeeId, Name, Password, BranchId, Mode) => {
    const obj = { employeeid : EmployeeId, name: Name, password : Password, branchid: BranchId, mode: Mode };
    setStatobj(obj);
    setUpdate(true);
  };

  function ParentAlert() {
    GetData();
  }

  const GetData = () => {
    BranchService.GetEmployee()
      .then((response) => {
        setStatuser(response.data);
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
      <tr key={Obj.employeeid}>
        <td>{Obj.employeeid}</td>
        <td>{Obj.name}</td>
        <td>{Obj.branchid}</td>
        <td>{Obj.password}</td>
        <td>
          <button
            className="btn btn-sm btn-dark"
            onClick={() => Edit(Obj.employeeid, Obj.name, Obj.password, Obj.branchid, "Update")}
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
            onClick={() => Edit(0, 0, "Add")}
          >
            Add New
          </button>
          <h6 className="row mx-2">Employee List</h6>
          <table className="table table-sm table-striped table-dark">
            <thead>
              <tr>
                <th scope="col">Employee Id</th>
                <th scope="col">Name</th>
                <th scope="col">Branch</th>
                <th scope="col">Password</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>{items}</tbody>
          </table>
        </div>

        <div className="col-sm-4">
          {update && <EmployeeMaster data={statobj} alert={ParentAlert} />}
        </div>
      </div>
    </>
  );
}
