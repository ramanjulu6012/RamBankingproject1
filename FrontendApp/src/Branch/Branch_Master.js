import React, { useState, useEffect } from "react";
import BranchService from "../Services/BranchService";

function Branch_Master(props) {
  const [branchid, setBranchid] = useState("");
  const [branchname, setBranchname] = useState("");
  const [issubmitted, setIssubmitted] = useState("");
  const [lable, setLable] = useState("");
  const [btnlable, setBtnlable] = useState("");
  const [disableid, setDisableid] = useState("");

  useEffect(() => {
    setIssubmitted(false);
    if (props.data.mode === "Update") {
      setBtnlable("Update");
      setLable("Update Branch");
      setBranchid(props.data.branchid);
      setDisableid(true);
      setBranchname(props.data.branchname);
    } else {
      setBtnlable("Add New");
      setLable("Add Branch");
      setBranchid("");
      setDisableid(false);
      setBranchname("");
    }
  }, [props.data]);

  
  const onChangeid = (e) => {
    setBranchid(e.target.value);
  };

  const onChangebranchname = (e) => {
    setBranchname(e.target.value);
  };

  const Save = async () => {
    var data = {
      id: branchid,
      name: branchname,
    };
    BranchService.create(data)
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
              <label htmlFor="id">Branch Id</label>
              <input
                type="text"
                className="form-control"
                readOnly={disableid}
                id="id"
                required
                value={branchid}
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
                value={branchname}
                onChange={onChangebranchname}
                name="name"
              />
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

Branch_Master.propTypes = {};

export default Branch_Master;
