import React, { useState, useEffect } from "react";
import Account_Master from "./Account_Master";
import CustomerService from "../Services/CustomerService";

function Transaction_Master(props) {
  const [accountno, SetAccountno] = useState("");
  //const [customername, SetCustomerName] = useState("");
  const [drcr, SetDrcr] = useState("");
  const [txntype, SetTxntype] = useState("");
  const [instrumentno, SetInstrumentno] = useState("");
  const [narration, SetNarration] = useState("");
  const [custobj, setCustobj] = useState("");
  const [mode, SetMode] = useState(false);
  const [msgstring, SetMsgstring] = useState("");
  const [viewaccount, setViewAccount] = useState(false);
  const [branchid, setBranchid] = useState(0);

  //text : sessionStorage.getItem("user") 
  const [txnamount, setTxnamount] = useState("");


  useEffect(() => {
    setBranchid(sessionStorage.getItem("branchid"))
    const Obj = {
      accountno: "",
      accountclosedate: "",
      accountopendate: "",
      accountstatus: "",
      balance: "",
      branchid: "",
      closedbyuser: "",
      customerid: "",
      modeofoperation: "",
      openbyuser: "",
      productid: "",
    };
    setCustobj(Obj);
  }, [mode]);

  const onChangeAccountNo1 = (e) => {
    //console.log('blur')

    const Obj = {
      accountno: "",
      accountclosedate: "",
      accountopendate: "",
      accountstatus: "",
      balance: "",
      branchid: "",
      closedbyuser: "",
      customerid: "",
      modeofoperation: "",
      openbyuser: "",
      productid: "",
    };

    CustomerService.GetSingleAccount(accountno)
      .then((response) => {
        setCustobj(response.data);
        //var date = Date.parse(response.data.dob);
        //response.data.dob = date;
        setCustobj(response.data);
        setViewAccount(true);
        //console.log(response.data)
        if (response.data.accountno === undefined) {
          setViewAccount(false);
          setCustobj(Obj);
        }
      })
      .catch((e) => {
        setCustobj(Obj);
      });
  };

  const onChangeAccountNo = (e) => {
    setViewAccount(false);
    SetAccountno(e.target.value);
    if (accountno>1)
    {
      
    }
  };
  // const onChangeCustomerName = (e) => {
  //   SetCustomerName(e.target.value);
  // };
  const onChangeDrCr = (e) => {
    SetDrcr(e);
  };
  const onChangeTxnType = (e) => {
    SetTxntype(e);
  };
  const onChangeInstrumentNo = (e) => {
    SetInstrumentno(e.target.value);
  };
  const onChangeNarration = (e) => {
    SetNarration(e.target.value);
  };

  const onChangeTxnAmount = (e) => {
    setTxnamount(e.target.value);
  };

  const reaload = (e) =>{

    SetMode(false);

   
    

  }
  const Save = (e) => {
    const date = new Date();
    const txndate = date
      .toLocaleDateString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .split("/")
      .reverse()
      .join("-");

    const data = {
      accountid: accountno,
      drcr: drcr,
      narration: narration,
      txntype: txntype,
      instrno: instrumentno,
      branchid: branchid,
      txndate: txndate,
      txnamount: txnamount,
    };

    CustomerService.SaveTxn(data)
      .then((response) => {
        console.log(data);
        console.log(response.data);
        

        SetMode(true);

        SetMsgstring(
          "Transaction refno #" + response.data.txnid + " Added successfully !"
        );
      })
      .catch((e) => {
        console.log("error=", e);
      })
      .finally((x) => {
        //console.log("finally=", x);
      });
  };

  return (
    <>
      {mode ? (
        <div className="row my-4">
          <h6 className="alert alert-success">{msgstring}

          <button  onClick={reaload}  type="button" className="close float-right" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
          </h6>
        </div>
      ) : (
        <div className="row my-2">
          <div className="col-sm-7">
            <div className="row">
              <div className="form-group col-md-4">
                <label htmlFor="inputPassword4">A/c No</label>

                <input
                  type="text"
                  className="form-control"
                  id="accountno"
                  required
                  value={accountno}
                  onChange={onChangeAccountNo}
                  onBlur={onChangeAccountNo1}
                  name="customerid"
                  placeholder="Account No"
                />
              </div>
            </div>

            <div className="row">
              <div className="form-group col-md-4">
                <label htmlFor="inputPassword4">Debit/Credit</label>
                <select
                  onChange={(e) => onChangeDrCr(e.target.value)}
                  value={drcr}
                  className="form-select my-2"
                  aria-label="Select Option"
                >
                  <option selected>Select Option</option>
                  <option value="Dr">Dr</option>
                  <option value="Cr">Cr</option>
                </select>
              </div>

              <div className="form-group col-md-8">
                <label htmlFor="inputPassword4">Narration</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Narration"
                  id="narration"
                  required
                  value={narration}
                  onChange={onChangeNarration}
                  name="narration"
                />
              </div>
            </div>

            <div className="row">
              <div className="form-group col-md-4">
                <label htmlFor="inputPassword4">Transaction Type</label>
                <select
                  onChange={(e) => onChangeTxnType(e.target.value)}
                  value={txntype}
                  className="form-select my-2"
                  aria-label="Select Option"
                >
                  <option selected>Select Option</option>
                  <option value="0">Cash</option>
                  <option value="1">Transfer</option>
                </select>
              </div>

              <div className="form-group col-md-4">
                <label htmlFor="inputPassword4">Transaction Amount</label>

                <input
                  type="text"
                  className="form-control"
                  id="txnamount"
                  required
                  value={txnamount}
                  onChange={onChangeTxnAmount}
                  name="customerid"
                  placeholder="Txn Amouont"
                />
              </div>

              <div className="form-group col-md-8">
                <label htmlFor="inputPassword4">Instrument No</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Instrument No"
                  id="instrumentno"
                  required
                  value={instrumentno}
                  onChange={onChangeInstrumentNo}
                  name="customername"
                />
              </div>
            </div>

            <div className="row">
              <div className="row col-sm-2">
                <button onClick={Save} className="btn btn-dark mx-3 my-3">
                  Save
                </button>
              </div>
            </div>
          </div>

          {viewaccount ? (
            <div className="col-sm-4">
              <Account_Master Mode="View" obj={custobj} />
            </div>
          ) : (
            <div></div>
          )}
        </div>
      )}
    </>
  );
}

export default Transaction_Master;
