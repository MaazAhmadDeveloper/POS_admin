import React, {useState, useEffect} from 'react'
import LayoutApp from '../../layout/Layout'
import { RollbackOutlined, UserOutlined, BarsOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Select, Table, message } from 'antd';
import axios from 'axios';

function Home() {
    const [userData , setUserData] = useState([]);

const getUsers = async ()=>{
    const {data} = await axios.get('/api/users/getusers');
    setUserData(data);
    console.log(data);

};
useEffect(()=>{
    getUsers();       
},[]);

  return (
    <LayoutApp>

    <div className="main-container">
        <div className="first-row">
            <div className="card">
                <div className="card-head">
                    <div>
                        <h1 style={{fontSize: "22px", color: "#001e28"}} >Total Users</h1>
                    </div>
                    <div style={{marginLeft: "auto", padding: "5px 10px", borderRadius: "50%", backgroundColor:"#fdfdfd",}}>
                        <BarsOutlined  style={{color:"#ff7f50"}} />
                    </div>
                </div>
                <div style={{margin: "20px"}}>
                    <h1 style={{fontSize: "25px"}} > {userData.length} </h1>
                </div>
            </div>
            <div className="card">
                <div className="card-head">
                    <div>
                        <h1 style={{fontSize: "22px", color: "#001e28"}} >Active Users</h1>
                    </div>
                    <div style={{marginLeft: "auto", padding: "5px 10px", borderRadius: "50%", backgroundColor:"#fdfdfd",}}>
                        <UserOutlined  style={{color:"#ff7f50"}} />
                    </div>
                </div>
                <div style={{margin: "20px"}}>
                    <h1 style={{fontSize: "25px"}} > {userData.filter((obj) => (obj.loginStatus.toString().includes("login"))).length} </h1>
                </div>
            </div>
            <div className="card">
                <div className="card-head">
                    <div>
                        <h1 style={{fontSize: "22px", color: "#001e28"}} >Logout Users</h1>
                    </div>
                    <div style={{marginLeft: "auto", padding: "5px 10px", borderRadius: "50%", backgroundColor:"#fdfdfd",}}>
                        <RollbackOutlined style={{color:"#ff7f50"}} />
                    </div>
                </div>
                <div style={{margin: "20px"}}>
                    <h1 style={{fontSize: "25px"}} >{userData.filter((obj) => (obj.loginStatus.toString().includes("logout"))).length}</h1>
                </div>
            </div>
        </div>
    </div>

    </LayoutApp>
  )
}

export default Home