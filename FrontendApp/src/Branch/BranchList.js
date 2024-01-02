import React, { useState, useEffect } from "react";
import BranchService from "../Services/BranchService";
import Branch_Master from "./Branch_Master";

export default function BranchList() {
  const [statobj, setStatobj] = useState("");
  const [statuser, setStatuser] = useState("");
  const [update, setUpdate] = useState(false);

  const Edit = (Branchid, Name, Mode) => {
    const obj = { branchid: Branchid, branchname: Name, mode: Mode };
    setStatobj(obj);
    setUpdate(true);
  };

  function ParentAlert() {
    GetData();
  }

  const GetData = () => {
    BranchService.GetBranches()
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
      <tr key={Obj.id}>
        <td key={Obj.id}>{Obj.id}</td>
        <td>{Obj.name}</td>
        <td>
          <button
            className="btn btn-sm btn-dark"
            onClick={() => Edit(Obj.id, Obj.name, "Update")}
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
          <h6 className="row mx-2">Branch List</h6>
          <table className="table table-sm table-striped table-dark">
            <thead>
              <tr>
                <th scope="col">Branch Id</th>
                <th scope="col">Name</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>{items}</tbody>
          </table>
        </div>

        <div className="col-sm-4">
          {update && <Branch_Master data={statobj} alert={ParentAlert} />}
        </div>
      </div>
    </>
  );
}
