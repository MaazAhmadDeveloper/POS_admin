import React, { useEffect, useState } from 'react';
import LayoutApp from '../../layout/Layout';
import { Button, Form, Input, Modal, Table, message, Menu } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import axios from 'axios';
import { DeleteOutlined, EditOutlined, DownCircleOutlined } from '@ant-design/icons';
import { SecuriModalComp, AddUserModalComp, DeleteUserModel } from './AllModals';

function getItem(label, key, icon, children, type) {
  return { key,icon,children,label,type,};
}

function Users() {
    const [userData , setUserData] = useState([]);
    const [popModal, setPopModal] = useState(false);
    const [deleteModel, setDeleteModel] = useState(false);
    const [securityModal, setSecurityModal] = useState(true);
    const [allowToUser, setAllowToUser] = useState(false);
    const [userDelete, setUserDelete] = useState();
    const [editUser, setEditUser] = useState(null);

    useEffect(()=>{console.log(editUser);},[popModal])

const handlerSecretSubmit =(value)=>{
    if (value.userName === "Maaz" && value.secretKey === "123456") {
        message.success("Users Section successfully unlocked")
        setSecurityModal(false);
        setAllowToUser(true);
    }else{
        message.error("Incorrect Credentials");
    }
}
const handlerDelete = async () => {
    try {
      await axios.post('/api/users/deleteusers', {userId:userDelete._id});
      message.success("User Deleted Successfully!")
      setDeleteModel(false);
      getUsers();
    } catch(error) {
      message.error("Error!")
      console.log(error);
    }
}

const deleteProductHandle =(record)=>{
    setUserDelete(record);
    setDeleteModel(true);
}
const editProductHandle =(record)=>{
    setEditUser(record);
    setPopModal(true);
}
    const columns = [
        {
            title: "User Name",
            dataIndex: "userName"
        }, 
        {
            title: "Email",
            dataIndex: "email"
        }, 
        {
          title: "Password",
          dataIndex: "password",
        },
        {
          title: "Phone Number",
          dataIndex: "phoneNumber",
        },
        {
            title: "Shop Name",
            dataIndex: "shopName",
        },
        {
            title: "Address",
            dataIndex: "address",
        },
        {
            title: "Login Status",
            dataIndex: "loginStatus",
        },
        {
            title: "Duration",
            dataIndex: "time",
            // " Months"
            render: (time, render) => ( time + " Months" )
        },
        {
            title: "Start",
            dataIndex: "createdAt",
            render: (starteingDate, render) => ( new Date(starteingDate).toLocaleDateString('en-GB'))
        },
        {
            title: "Action",
            dataIndex: "_id",
            render: (id, record) => (
              <div style={{display:"flex"}}>
                <DeleteOutlined className='user-action' onClick={() => deleteProductHandle(record)} />
                <EditOutlined className='user-edit' onClick={() => editProductHandle(record)} />
              </div>
            ),
          }
];

const getUsers = async ()=>{
    const {data} = await axios.get('/api/users/getusers');
    setUserData(data);
    console.log(data);
};
useEffect(()=>{
    getUsers();       
},[]);

const handlerSubmit = async (value)=>{
    if(editUser === null) {
        try {
          await axios.post('/api/users/addusers', {...value });
          message.success("User Added Successfully!")
          setPopModal(false);
          getUsers();
        } catch(error) {

          message.error("Error!")
          console.log(error);
        }
      } else {
        try {

         await axios.put('/api/users/updateusers', {...value, userId:editUser._id});
          message.success("Product Updated Successfully!")      
          setPopModal(false);
          getUsers();
          setEditUser(null);
        } catch(error) {
          message.error("Error!")
          console.log(error);
        }
      }
}    

  return (
    <LayoutApp>
        {allowToUser ?  
        <div className="top">
            <h1>Total Users: {userData.length} </h1>
            <Button className='add-new' style={{}} onClick={() => {setEditUser(null); setPopModal(true)}}>Add New</Button>
            <h1>All Users</h1>
            <Table dataSource={userData} columns={columns} bordered size='small'  />
        </div>
        :
        <div className="top">
            <h1>First Enter you Cedentials </h1>
        </div>
        }

<SecuriModalComp 
    handlerSecretSubmit={handlerSecretSubmit}
    securityModal={securityModal}
/>

{popModal && <AddUserModalComp 
    handlerSubmit={handlerSubmit}
    setPopModal={setPopModal}
    popModal={popModal}
    editUser={editUser}
    setEditUser={setEditUser}
/>}

<DeleteUserModel 
    setDeleteModel={setDeleteModel}
    deleteModel={deleteModel}
    handlerDelete={handlerDelete}
/>
    </LayoutApp>
  )
}

export default Users