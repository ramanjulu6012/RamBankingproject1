import React, { useState, useEffect } from "react";
import BranchService from "../Services/BranchService";

function Customer_Benf_Master(props) {
  const [id, setId] = useState("");
  const [accountid, setAccountid] = useState("");
  const [acno, setAcno] = useState("");
  const [bank, setBank] = useState("");
  const [branchname, setBranchname] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [maxtxnamount, setMaxtxnamount] = useState("");
  const [issubmitted, setIssubmitted] = useState("");
  const [lable, setLable] = useState("");
  const [btnlable, setBtnlable] = useState("");
  const [disableid, setDisableid] = useState("");

  useEffect(() => {
    console.log(props.data);
    setIssubmitted(false);
    if (props.data.mode === "Update") {
      setBtnlable("Update");
      setLable("Update Beneficiary");
      setId(props.data.id);
      setAccountid(props.data.accountid);
      setDisableid(true);
      setAcno(props.data.beneficiaryacno);
      setBank(props.data.beneficiarybank);
      setBranchname(props.data.beneficiarybranch);
      setIfsc(props.data.beneficiaryifsc);
      setMaxtxnamount(props.data.maxtxnamount);
    } else {
      setBtnlable("Add New");
      setLable("Add Beneficiary");
      setAccountid(props.data.accountid);
      setAcno("");
      setBank("");
      setBranchname("");
      setIfsc("");
      setMaxtxnamount("");
      setDisableid(false);
      setBranchname("");
    }
  }, [props.data]);

  const onChangeid = (e) => {
    setAcno(e.target.value);
  };

  const onChangeBank = (e) => {
    setBank(e.target.value);
  };

  const onChangebranchname = (e) => {
    setBranchname(e.target.value);
  };

  const onChangeIFSC = (e) => {
    setIfsc(e.target.value);
  };

  const onChangeMaxTxnAmt = (e) => {
    setMaxtxnamount(e.target.value);
  };

  const Save = async () => {
    var data;
    if (props.data.mode === "Update") {
      data = {
        accountid: accountid,
        beneficiaryacno: acno,
        beneficiarybank: bank,
        beneficiarybranch: branchname,
        beneficiaryifsc: ifsc,
        maxtxnamount: maxtxnamount,
        id: id
      };
    } else {
      data = {
        accountid: accountid,
        beneficiaryacno: acno,
        beneficiarybank: bank,
        beneficiarybranch: branchname,
        beneficiaryifsc: ifsc,
        maxtxnamount: maxtxnamount,
      };
    }
    BranchService.createBenf(data)
      .then((response) => {
        setIssubmitted(true);
        props.alert();
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
              <label htmlFor="id">Account No</label>
              <input
                type="text"
                className="form-control"
                id="acno"
                required
                value={acno}
                onChange={onChangeid}
                name="acno"
              />
            </div>

            <div className="form-group">
              <label htmlFor="branchname">Bank</label>
              <input
                type="text"
                className="form-control"
                id="branchname"
                required
                value={bank}
                onChange={onChangeBank}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="branchname">Branch</label>
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

            <div className="form-group">
              <label htmlFor="branchname">IFSC</label>
              <input
                type="text"
                className="form-control"
                id="branchname"
                required
                value={ifsc}
                onChange={onChangeIFSC}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="branchname">Max Txn Amount</label>
              <input
                type="text"
                className="form-control"
                id="branchname"
                required
                value={maxtxnamount}
                onChange={onChangeMaxTxnAmt}
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

Customer_Benf_Master.propTypes = {};

export default Customer_Benf_Master;
