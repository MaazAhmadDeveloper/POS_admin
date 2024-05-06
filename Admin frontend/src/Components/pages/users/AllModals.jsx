import React, { useEffect } from 'react';
import { Button, Form, Input, Modal, Table, message } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { useNavigate } from 'react-router-dom';

function SecuriModalComp( {securityModal, handlerSecretSubmit} ) {
    const navigate = useNavigate();


  return (
    <Modal title={`Security for Users`} visible={securityModal} onCancel={() => {navigate("/")}} footer={false}>
    <Form layout='vertical' onFinish={handlerSecretSubmit} >
      <FormItem name="userName" label="User Name">
        <Input/>
      </FormItem>
      <FormItem name="secretKey" label="Secret key">
        <Input type='password'/>
      </FormItem>
      <div style={{display: "flex"}} >
        <Button onClick={()=> navigate("/")} className='secret-modal-cancel-btn' >Cancel</Button>
        <Button htmlType='submit' className='secret-modal-cofirm-btn' >Submit</Button>
      </div>
    </Form>
  </Modal>
  )
}
function AddUserModalComp( {handlerSubmit, setPopModal, popModal, editUser, setEditUser} ) {
    const initialValues = {
        userName: editUser?.userName,
        email: editUser?.email,
        password: editUser?.password,
        phoneNumber: editUser?.phoneNumber,
        shopName: editUser?.shopName,
        address: editUser?.address,
        time:editUser?.time,
        loginStatus:editUser?.loginStatus,
      };
  return (
    <Modal title={`${editUser !== null ? "Edit User" : "Add New User"}`} visible={popModal} onCancel={() => {setEditUser(null); setPopModal(false);}} footer={false}>
    <Form layout='vertical' initialValues={initialValues} onFinish={handlerSubmit} >
      <FormItem name="userName" label="User Name">
        <Input/>
      </FormItem>
      <FormItem name="email" label="Email">
        <Input/>
      </FormItem>
      <FormItem name="password" label="Password">
        <Input/>
      </FormItem>
      <FormItem name="phoneNumber" label="Phone Number">
        <Input/>
      </FormItem>
      <FormItem name="shopName" label="Shop Name">
        <Input/>
      </FormItem>
      <FormItem name="address" label="Address">
        <Input/>
      </FormItem>
      <FormItem name="time" label="Time">
        <Input placeholder='Months' type='Number' />
      </FormItem>
      {/* necessory to write "logout" */}
      <FormItem name="loginStatus" label="Login Status">
        <Input placeholder='logout' />
      </FormItem>

        <Button htmlType='submit' className='add-new'>Add</Button>
    </Form>
  </Modal>
  )
}
function DeleteUserModel( {deleteModel, setDeleteModel, handlerDelete} ) {

  return (
    <Modal title={"Delete Product "} visible={deleteModel} onCancel={() => {setDeleteModel(false)}} footer={false}>
    <h3 >Are you sure to delete this product</h3>
    <div style={{display: "flex"}}>
            <Button className='secret-modal-cancel-btn' onClick={()=>{ {setDeleteModel(false)} }}>Cancel</Button>
            <Button className='secret-modal-cofirm-btn' onClick={()=> { handlerDelete(); setDeleteModel(false)} }>Cofirm</Button>
        </div>
  </Modal>
  )
}

export {SecuriModalComp, AddUserModalComp, DeleteUserModel};