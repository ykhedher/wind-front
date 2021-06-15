import React, { useContext, useState } from 'react'
import { UserContext } from '../utils/UserContext'
import Sidebar from './Sidebar';
import { Tabs, Form, Select, Input, Button, Upload } from 'antd';
import { UserOutlined, EditOutlined, UploadOutlined } from '@ant-design/icons';
import { getUsersList, deleteUserById, editUser, addUser } from '../services/index';
import styled from 'styled-components';
import { openNotification } from '../services/notification'


const { TabPane } = Tabs;
const { Option } = Select;
const formItemLayout = {
   labelCol: {
      xs: { span: 20 },
      sm: { span: 8 },
   },
   wrapperCol: {
      xs: { span: 20 },
      sm: { span: 16 },
   },
};

function Profile() {
   const { user } = useContext(UserContext);
   user.password = '';
   const [form] = Form.useForm();
   const callback = () => {
      console.log('hi')
   }
   const updateUser = data => {
      editUser(data)
         .then((res) => {
            openNotification('success', res.data.message)
         })
         .catch(err => {
            openNotification('error', err.response.data.message)
         })
   }

   const onUserUpdate = values => {
      updateUser(values);
   }

   return (
      <div>
         <Sidebar />
         <div style={{ 'margin-left': 260 }}>
            <Tabs defaultActiveKey="1" onChange={callback}>
               <TabPane
                  tab="Profile"
                  key="1"
                  tab={
                     <span>
                        <UserOutlined />
                           Profile
                     </span>
                  }
               >
               <h1>Profile Information</h1>
                  <h2>First Name: {user.firstName}</h2><br/>
                  <h2>Last Name: {user.lastName}</h2><br/>
                  <h2>Username: {user.username}</h2><br/>
                  <h2>Email: {user.email}</h2><br/>
                  <h2>Role: {user.userType}</h2><br/>
               </TabPane>
               <TabPane
                  tab="Edit Profile"
                  tab={
                     <span>
                        <EditOutlined />
                           Edit Profile
                     </span>
                  }
                  key="2">
                  <Form
                     form={form}
                     layout="vertical"
                     name="form_in_modal"
                     onFinish={onUserUpdate}
                     initialValues={user}
                     {...formItemLayout}
                  >
                     <Form.Item
                        name="firstName"
                        label="First Name"
                        rules={[{ required: true, message: 'Please input your First Name!', whitespace: false }]}
                     >
                        <Input />
                     </Form.Item>
                     <Form.Item
                        name="lastName"
                        label="Last Name"
                        rules={[{ required: true, message: 'Please input your Last Name!', whitespace: false }]}
                     >
                        <Input />
                     </Form.Item>


                     <Form.Item
                        name="email"
                        label="E-mail"
                     >
                        <Input disabled />
                     </Form.Item>

                     <Form.Item
                        name="username"
                        label="username"
                        tooltip="What do you want others to call you?"
                        rules={[{ required: true, message: 'Please input your username!', whitespace: false }]}
                     >
                        <Input />
                     </Form.Item>
                     <Form.Item
                        name="Password"
                        value=''
                        label="password"
                     >

                        <Input />
                     </Form.Item>
                     <Form.Item name="_id" noStyle>
                        <Input type='hidden' />
                     </Form.Item>
                     <Form.Item>
                        <Button type="primary" htmlType="submit">
                           Edit Profile
                  </Button>
                     </Form.Item>
                  </Form>
               </TabPane>
            </Tabs>



            {/* <h1>This isss my profile {user.firstName}</h1>
               <h2>hi</h2> */}

         </div>


      </div>
   )
}

export default Profile
