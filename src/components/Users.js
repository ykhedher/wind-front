import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../utils/UserContext'
import { Table, Modal, Tag, Space, Button, Form, Input, Select, Switch, Avatar, Upload } from 'antd';
import { CloseOutlined, CheckOutlined, UserAddOutlined, UploadOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { getUsersList, deleteUserById, editUser, addUser } from '../services/index';
import { openNotification } from '../services/notification'
import Sidebar from './Sidebar';
import { tailFormItemLayout, formItemLayout } from '../utils/formStyles';


const ListContainer = styled.div`
   width: 60%;
   height: 300px;
   margin: 25px;
   position: relative;
   left: 20%;
   top: 50%;
`
function Users() {

   const [users, setUsers] = useState([]);
   const [isModalVisible, setIsModalVisible] = useState(false);
   const [isLoading, setIsLoading] = useState(true);
   const [visible, setVisible] = useState(false);
   const [temp, setTemp] = useState(null);
   const [file, setFile] = useState(null);

   const { Option } = Select;
   const [form] = Form.useForm();
   useEffect(() => form.resetFields(), [visible, isModalVisible]);
   useEffect(() => {
      let mounted = true;
      getUsersList()
         .then(items => {
            if (mounted) {
               setUsers(items['data'])
               setIsLoading(false)
            }
         })
      return () => mounted = false;
   }, [])


   const deleteUser = (id) => {
      deleteUserById(id)
         .then((res) => {
            openNotification('success', res.data['message'])
            const newList = users.filter((user) => user._id !== id);
            setUsers(newList);
         })
         .catch(err => openNotification('error', err.response.data.message))
   }

   const addNewUser = (data, values) => {
      addUser(data)
         .then((res) => {
            setUsers([...users, values])
            openNotification('success', res.data['message'])
         })
         .catch(err => {
            openNotification('error', err.response.data.message)
         })
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

   const onChange = (checked, user) => {
      let data = { _id: user._id, "isActive": !checked }
      editUser(data)
         .then((res) => {
            openNotification('success', 'User status changed')
         })
         .catch(err => {
            openNotification('error', err.response.data.message)
         })

   }

   const showModal = () => {
      setIsModalVisible(true);
   };
   const handleCancel = () => {
      setIsModalVisible(false);
      setVisible(false)
   };
   const onEdit = (user) => {
      setTemp(user)
      setVisible(!visible);
   }

   const onFinish = (values) => {
      values.image = file;
      console.log(values, Date.now())
      const data = new FormData();
      for (let key in values) {
         data.append(key, values[key]);
      }
      addNewUser(data, values);
      setIsModalVisible(false);
   };
   const dummyRequest = ({ file, onSuccess }) => {
      setTimeout(() => {
         onSuccess("ok");
         setFile(file);
      }, 0);
   };
   const onUserUpdate = values => {
      updateUser(values);
      setVisible(false)
      setIsLoading(true)
      getUsersList().then(items => {
         setUsers(items['data']);
         setIsLoading(false);
      })
   }

   const columns = [
      {
         title: '',
         dataIndex: 'image',
         key: 'image',
         render: image => <Avatar src={`http://localhost:3030/uploads/${image}`} />
      },
      {
         title: 'Name',
         dataIndex: 'firstName',
         key: 'name',
         render: text => <a>{text}</a>,
      },
      {
         title: 'Status',
         dataIndex: 'isActive',
         key: 'user',
         render: (e, user) => (
            <Switch onChange={() => { onChange(e, user) }} defaultChecked={e} Children={<CheckOutlined />}
               unCheckedChildren={<CloseOutlined />}
            />
         )

      },
      {
         title: 'Email',
         dataIndex: 'email',
         key: 'email',
      },
      {
         title: 'Role',
         key: 'userType',
         dataIndex: 'userType',
         render: role => {
            let color = 'volcano';
            if (role === 'ADMIN') { color = 'green'; }
            if (role === 'SCRUM_MASTER') { color = 'geekblue' }
            return (<Tag color={color} key={role}>
               {role}
            </Tag>)
         }

      },
      {
         title: 'Action',
         key: 'action',
         dataIndex: '_id',
         render: (_id, user) => (
            <Space size="middle">
               <a onClick={() => { onEdit(user) }}>Edit</a>
               <Button type="link" danger onClick={() => deleteUser(_id)}>Delete</Button>
            </Space>
         ),
      },
   ];


   return (
      <>
         <Sidebar />
         <ListContainer>
            <Table dataSource={users} loading={isLoading} columns={columns} />
            <Button onClick={showModal} type="primary" icon={<UserAddOutlined />} >Add New User</Button>
         </ListContainer>


         {/* ************** Modal ******************* */}
         <Modal title="Add new user" visible={isModalVisible} okText='Add New User' onOk={() => {
            form
               .validateFields()
               .then((values) => onFinish(values))
               .catch((info) => {
                  console.log('Validate Failed:', info);
               });
         }} onCancel={handleCancel}>
            <Form
               {...formItemLayout}
               form={form}
               name="register"
               scrollToFirstError
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
                  rules={[
                     {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                     },
                     {
                        required: true,
                        message: 'Please input your E-mail!',
                     },
                  ]}
               >
                  <Input />
               </Form.Item>

               <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                     {
                        required: true,
                        message: 'Please input your password!',
                     },
                  ]}
               >
                  <Input.Password />
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
                  name="userType"
                  label="Role"
                  rules={[{ required: true, message: 'Please select a role!' }]}
               >
                  <Select placeholder="select user role">
                     <Option value="ADMIN">ADMIN</Option>
                     <Option value="SCRUM_MASTER">SCRUM MASTER</Option>
                     <Option value="COLLABORATOR">COLLABORATOR</Option>
                  </Select>
               </Form.Item>
               <Form.Item
                  name="image"
                  label="User Image"
                  extra="user image"
                  rules={[{ required: true, message: 'Please upload an image!' }]}
               >
                  <Upload name="image" listType="picture" maxCount={1} customRequest={dummyRequest} >
                     <Button icon={<UploadOutlined />}>Click to upload</Button>
                  </Upload>
               </Form.Item>
            </Form>
         </Modal>


         {/* ************************** User Modal  **********************************/}
         <Modal
            title="Edit user"
            okText='Edit User'
            centered
            onCancel={handleCancel}
            visible={visible}
            width={700}
            bodyStyle={{ height: 600 }}
            onOk={() => {
               form
                  .validateFields()
                  .then((values) => onUserUpdate(values))
                  .catch((info) => {
                     console.log('Validate Failed:', info);
                  });
            }}
         >
            <Form
               form={form}
               layout="vertical"
               name="form_in_modal"
               initialValues={temp}
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
                  rules={[
                     {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                     },
                     {
                        required: true,
                        message: 'Please input your E-mail!',
                     },
                  ]}
               >
                  <Input />
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
                  name="userType"
                  label="Role"
                  rules={[{ required: true, message: 'Please select a role!' }]}
               >
                  <Select placeholder="select user role">
                     <Option value="ADMIN">ADMIN</Option>
                     <Option value="SCRUM_MASTER">SCRUM MASTER</Option>
                     <Option value="COLLABORATOR">COLLABORATOR</Option>
                  </Select>
               </Form.Item>
               <Form.Item name="_id" noStyle>
                  <Input type='hidden' />
               </Form.Item>
            </Form>
         </Modal>
      </>
   )
}

export default Users

