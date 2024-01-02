import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Protected(props) {
    const {Component}=props;
    const navigate=useNavigate();
    useEffect(()=>{
        let login = sessionStorage.getItem('token');
        if(!login){
            navigate('/employeelogin');
        }
    })
  return (
    <>
    <div>
       <Component/>
    </div>
    </>
  )
}
export default Protected
