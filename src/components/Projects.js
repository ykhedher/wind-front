import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Modal, Card, DatePicker, Col, Row, Button, Tag, Form, Input, Mentions, Tooltip, Switch, Avatar, Upload } from 'antd';
import { UserAddOutlined, UserOutlined, AntDesignOutlined } from '@ant-design/icons';
import { addProject, deleteProjectById, getUsersList, getProjects } from '../services/index';
import { openNotification } from '../services/notification'
import { tailFormItemLayout, formItemLayout } from '../utils/formStyles';
import Sidebar from './Sidebar';
import moment from 'moment';
const { TextArea } = Input;
const { Option, getMentions } = Mentions;

//**************** Main ************************** */
function Projects() {
   const [form] = Form.useForm();
   const [projects, setProjects] = useState([]);
   const [isModalVisible, setIsModalVisible] = useState(false);
   const [visible, setVisible] = useState(false);
   const [collabs, setCollabs] = useState([]);
   const [temp, setTemp] = useState(null);
   useEffect(() => form.resetFields(), [visible, isModalVisible]);


   useEffect(() => {
      let mounted = true;
      getProjects()
         .then(items => {
            if (mounted) {
               console.log(items['data'])
               setProjects(items['data'])
               // setIsLoading(false)
            }
         })
      return () => mounted = false;
   }, [])

   const createProject = data => {
      addProject(data)
         .then((res) => {
            // setUsers([...users, values])
            setIsModalVisible(false)
            openNotification('success', res.data['message'])

         })
         .catch(err => {
            openNotification('error', err.response.data.message)
         })
   }

   const onFinish = (values) => {
      values.dateStart = moment(values.dateStart._d).format('YYYY-MM-DD');
      values.users = values.users.replace(/\s/g, "");
      values.users = values.users.split('@');
      values.users = values.users.filter((value, index, self) => { return self.indexOf(value) === index; });
      values.users.shift();
      createProject(values)
   }
   const onProjectUpdate = () => {

   }
   const handleOk = () => {
      setIsModalVisible(false);
      setVisible(false);
   }
   const showModal = () => {
      setIsModalVisible(true);
   }
   const onEdit = (project) => {
      setTemp(project)
      console.log(project)
      setVisible(!visible);
   }
   const handleCancel = () => {
      setIsModalVisible(false);
      setVisible(false)
   }
   const deleteProject = (projectId) => {
      deleteProjectById(projectId)
         .then((res) => {
            openNotification('success', res.data['message'])
            const newList = projects.filter((project) => project._id !== projectId);
            setProjects(newList);
         })
         .catch(err => openNotification('error', err.response.data.message))
   }
   if (collabs.length === 0) {
      getUsersList()
         .then(items => {
            console.log(items['data']);
            setCollabs(items['data'])
         })
   }


   return (
      <>
         <Sidebar />
         <div className="site-card-wrapper" style={{ 'marginLeft': 260, marginTop: 30 }}>
            <Row gutter={9}>
               {projects.map((project) => (
                  <Col span={5} style={{ paddingTop: 10 }} >
                     <Card title={project.name} bordered={true}>
                        <h4>Status: <Tag color='green'>{project.status}</Tag></h4>
                        <h4>Date Start: <Tag color='geekblue'>{moment(project.dateStart).format("MM-DD-YYYY")}</Tag></h4>
                        <div>
                           <Link to={`projects/${project._id}`}>View Project</Link>
                           <Button type='link' onClick={() => { onEdit(project) }} >Edit</Button>
                           <Button type='link' danger onClick={() => deleteProject(project._id)}>Delete</Button>
                        </div>
                        <Avatar.Group
                           maxCount={2}
                           maxStyle={{
                              color: '#f56a00',
                              backgroundColor: '#fde3cf',
                           }}
                        >
                           <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                           <Avatar
                              style={{
                                 backgroundColor: '#f56a00',
                              }}
                           >
                              K
                           </Avatar>
                           <Tooltip title="Ant User" placement="top">
                              <Avatar
                                 style={{
                                    backgroundColor: '#87d068',
                                 }}
                                 icon={<UserOutlined />}
                              />
                           </Tooltip>
                           <Avatar
                              style={{
                                 backgroundColor: '#1890ff',
                              }}
                              icon={<AntDesignOutlined />}
                           />
                        </Avatar.Group>
                     </Card>
                  </Col>
               ))}
            </Row>
            <Button onClick={showModal} type="primary" icon={<UserAddOutlined />} style={{ marginTop: 30 }}>Add new Project</Button>


            {/* ************** Modal ******************* */}
            <Modal title="Create new project" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
               <Form
                  {...formItemLayout}
                  form={form}
                  name="register"
                  onFinish={onFinish}
                  scrollToFirstError
               >
                  <Form.Item
                     name="name"
                     label="Project Name"
                     rules={[{ required: true, message: 'Please input your Project Name!' }]}
                  >
                     <Input />
                  </Form.Item>
                  <Form.Item name="dateStart" label="Start Date" rules={[{
                     required: true,
                     message: 'Please select date!',
                  }]}>
                     <DatePicker format="YYYY-MM-DD" />
                  </Form.Item>
                  <Form.Item
                     name="status"
                     label="Status"
                     rules={[{ required: true, message: 'Please input your Project status!' }]}
                  >
                     <Input />
                  </Form.Item>
                  <Form.Item
                     name="description"
                     label="Description"
                     rules={[{ required: true, message: 'Please add project description' }]}
                  >
                     <TextArea />
                  </Form.Item>
                  <Form.Item
                     name="users"
                     label="Collaborators"
                     rules={[
                        {
                           required: true,
                        },
                     ]}
                  >
                     <Mentions rows={3} placeholder="You can use @ to select collaborators here">
                        {
                           collabs.map((user) => <Option value={user.username}><Avatar size={28} src={`http://localhost:3030/uploads/${user.image}`} style={{ marginRight: 9 }} />{user.username}</Option>)
                        }
                     </Mentions>
                  </Form.Item>
                  <Form.Item {...tailFormItemLayout}>
                     <Button type="primary" htmlType="submit">
                        Create Project
                     </Button>
                  </Form.Item>
               </Form>
            </Modal>

            {/* ************** Edit project ******************* */}
            <Modal title="Edit project" visible={visible} onOk={handleOk} onCancel={handleCancel}>
               <Form
                  {...formItemLayout}
                  form={form}
                  name="editProject"
                  onFinish={onProjectUpdate}
                  // initialValues={temp}
               >
                  <Form.Item
                     name="name"
                     label="Project Name"
                     rules={[{ required: true, message: 'Please input your Project Name!' }]}
                  >
                     <Input />
                  </Form.Item>
                  <Form.Item name="dateStart" label="Start Date" rules={[{
                     required: true,
                     message: 'Please select date!',
                  }]}>
                     <DatePicker format="YYYY-MM-DD" />
                  </Form.Item>
                  <Form.Item
                     name="status"
                     label="Status"
                     rules={[{ required: true, message: 'Please input your Project status!' }]}
                  >
                     <Input />
                  </Form.Item>
                  <Form.Item
                     name="description"
                     label="Description"
                     rules={[{ required: true, message: 'Please add project description' }]}
                  >
                     <TextArea />
                  </Form.Item>
                 
                  <Form.Item {...tailFormItemLayout}>
                     <Button type="primary" htmlType="submit">
                        Edit project
                     </Button>
                  </Form.Item>
               </Form>
            </Modal>
         </div>
      </>
   )
}

export default Projects
