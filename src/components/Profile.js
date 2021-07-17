import React, { useContext, useState } from 'react'
import { UserContext } from '../utils/UserContext'
import Sidebar from './Sidebar';
import { Tabs, Form, Select, Input, Button, Upload, Tag } from 'antd';
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
         <div style={{ 'marginLeft': 260 }}>
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
                     >
                        <Input disabled />
                     </Form.Item>
                     <Form.Item
                        name="lastName"
                        label="Last Name"
                     >
                        <Input disabled />
                     </Form.Item>
                     <Form.Item
                        name="email"
                        label="E-mail"
                     >
                        <Input disabled />
                     </Form.Item>

                     <Form.Item
                        name="username"
                        label="username"                     >
                        <Input disabled />
                     </Form.Item>
                     <Form.Item name="_id" noStyle>
                        <Input type='hidden' />
                     </Form.Item>
                     <Form.Item name="userType" label="Role">
                        <Input disabled />
                     </Form.Item>
                     <Form.Item name="isActive" label="Status">
                        <Input disabled />
                     </Form.Item>
                     <Form.Item name="isVerified" label="Verified">
                        <Input disabled />
                     </Form.Item>
                  </Form>
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
                        rules={[{ required: true, message: 'Please input your username!', whitespace: false }]}
                     >
                        <Input disabled />
                     </Form.Item>
                     <Form.Item
                        name="Password"
                        value=''
                        label="Password"
                     >

                        <Input.Password />
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
         </div>
      </div>
   )
}

export default Profile
