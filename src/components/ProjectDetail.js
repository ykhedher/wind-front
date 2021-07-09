import React, { useState, createElement, useEffect } from 'react';
import Sidebar from './Sidebar'
import moment from 'moment';
import { openNotification } from '../services/notification';
import { tailFormItemLayout, formItemLayout } from '../utils/formStyles';
import { Table, Comment, Tooltip, DatePicker, Modal, Tabs, Tag, Space, Button, Form, Input, Select, Spin, Avatar, InputNumber, Mentions } from 'antd';
import { getProjectById, removeUser, addMember, getUsersList, addTask, getTasks, deleteTask, getTasklog, getTask, updateTask, createSprint, getSprint } from '../services/index'
const { RangePicker } = DatePicker;
const { Option } = Select;
const { TabPane } = Tabs;
const { TextArea } = Input;

function ProjectDetail() {
   const [isLoading, setLoading] = useState(true);
   const [isModalVisible, setIsModalVisible] = useState(false);
   const [addMemberModal, setAddMemeberModal] = useState(false);
   const [meetingModal, setMeetingModal] = useState(false);
   const [addTaskModal, setAddTaskModal] = useState(false);
   const [taskLogModal, setTaskLogModal] = useState(false);
   const [sprintModal, setSprintModal] = useState(false);
   const [sprint, setSprint] = useState([]);
   const [taskLog, setTasklog] = useState([])
   const [editTaskModal, setEditTaskModal] = useState(false);
   const [tempTask, setTempTask] = useState({});
   const [collabs, setCollabs] = useState([]);
   const [team, setTeam] = useState([]);
   const [tasks, setTasks] = useState([])
   const [project, setProject] = useState();
   const [form] = Form.useForm();
   const [formTask] = Form.useForm();
   useEffect(() => { form.resetFields(); formTask.resetFields() }, [addTaskModal, addMemberModal, isModalVisible, editTaskModal]);
   const projectId = window.location.href.substr(31);

   useEffect(() => {
      let mount = true
      getProjectById(projectId)
         .then(items => {
            if (mount) {
               setProject(items['data'][0]);
               setTeam(items['data'][0].users);
            }
         });
      getTasks(projectId)
         .then((items) => {
            if (mount) {
               setTasks(items['data']);
               console.log(items['data'])
            }
         }).catch((err) => console.log(err))
      getUsersList()
         .then(items => {
            if (mount) {
               setCollabs(items['data'])
            }
         })
      getSprint(projectId)
         .then(items => {
            if (mount) {
               setSprint(items['data'])
               console.log(items['data'])
            }
            setLoading(false)
         });

      return () => mount = false;
   }, [])

   const deleteTaskById = (taskId) => {
      deleteTask(taskId)
         .then((res) => {
            openNotification('success', res.data['message'])
            const newList = tasks.filter((task) => task._id !== taskId);
            setTasks(newList);
         })
         .catch(err => openNotification('error', err.response.data.message))
   }

   const getTaskLog_ = (taskId) => {
      getTasklog(taskId)
         .then((res) => {
            console.log(res.data)
            setTasklog(res.data[0].messages)
            setTaskLogModal(true)
         })
         .catch(err => openNotification('error', err.response.data.message))
   }
   const getTaskById = (taskId) => {
      for (let i = 0; i < tasks.length; i++) {
         if (tasks[i]._id == taskId) {
            const tmp = Object.assign({}, tasks[i]);
            tmp.affectedTo = '@' + tmp.affectedTo.username;
            setEditTaskModal(true);
            setTempTask(tmp);
            break;
         }
      }

      // })
      // .catch(err => openNotification('error', err.response.data.message))
   }

   const Meetings = [
      {
         title: 'Title',
         dataIndex: 'title',
         key: 'title',
      },
      {
         title: 'Description',
         dataIndex: 'description',
         key: 'description',
         render: text => <a>{text}</a>
      },
      {
         title: 'Date',
         dataIndex: 'date',
         key: 'date',
      },
      {
         title: 'Members',
         dataIndex: 'imageA',
         key: 'imageA',
         render: image => (
            <>
               <Avatar src={`http://localhost:3030/uploads/${image}`} />
               <Avatar src={`http://localhost:3030/uploads/${image}`} />
               <Avatar src={`http://localhost:3030/uploads/${image}`} />
            </>)
      }
   ];

   const tasksColumn = [

      {
         title: 'Title',
         dataIndex: 'name',
         key: 'title',
      },
      {
         title: 'Status',
         dataIndex: 'status',
         key: 'status',
         render: text => <a>{text}</a>
      },
      {
         title: 'Priority',
         key: 'priority',
         dataIndex: 'priority',
         render: role => {
            let color = 'volcano';
            if (role === 'LOW') { color = 'green'; }
            if (role === 'MEDIUM') { color = 'yellow' }
            return (<Tag color={color} key={role}>
               {role}
            </Tag>)
         }
      },
      {
         title: 'Created At',
         dataIndex: 'createdAt',
         key: 'createdAt',
         render: text => <p>{moment(text).format('MMMM Do YYYY, HH:mm')}</p>,
      },
      {
         title: 'Created By',
         dataIndex: 'createdBy',
         key: 'createdBy',
         render: user => (<Tooltip title={user.firstName} placement="top">
            <Avatar src={`http://localhost:3030/uploads/${user.image}`} />
         </Tooltip>)
      },
      {
         title: 'Assigned to',
         dataIndex: 'affectedTo',
         key: 'affectedTo',
         render: user => {
            console.log('thsi is user', user)
            return (<Tooltip title={user.firstName} placement="top">
               <Avatar src={`http://localhost:3030/uploads/${user.image}`} />
            </Tooltip>)
         }
      },
      {
         title: 'Action',
         key: 'action',
         dataIndex: '_id',
         render: (_id, user) => (
            <>
               <Button type='link' onClick={() => getTaskById(_id)}>View Task</Button>
               <Button type='link' onClick={() => getTaskLog_(_id)}>Task Log</Button>
               <Button type="link" danger onClick={() => deleteTaskById(_id)}>Delete Task</Button>
            </>
         ),
      },
   ];

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
               <Button type="link" danger onClick={() => removeUserById(projectId, user.username)}>Remove from project</Button>
            </Space>
         ),
      },
   ];

   const removeUserById = (projectId, username) => {
      let data = {}
      data.projectId = projectId;
      data.user = username;
      removeUser(data).then(result => {
         openNotification('success', 'User removed from project');
         const newList = team.filter((user) => user.username !== data.user);
         setTeam(newList);
      })
         .catch(err => {
            openNotification('error', err.response.data.message)
         })
   }

   function handleChange(value) {
      console.log(`selected ${value}`);
   }

   function callback(key) {
      console.log(key);
   }

   const onAddMember = (values) => {
      values.users = values.users.replace(/\s/g, "");
      values.users = values.users.split('@');
      values.users = values.users.filter((value, index, self) => { return self.indexOf(value) === index; });
      values.users.shift();
      values.projectId = projectId;
      addMember(values).then(result => {
         getProjectById(projectId)
            .then(items => {
               setTeam(items['data'][0].users);
               setAddMemeberModal(false);
               openNotification('success', 'Member added successfully');
            })
      });
   }
   const onAddNewTask = (values) => {
      values.affectedTo = values.affectedTo.substring(1).trim();
      values.projectId = projectId;
      console.log(values);
      addTask(values).then(() => {
         getTasks(projectId).then((items) => {
            openNotification('success', 'Task added successfully');
            setTasks(items['data']);
            setAddTaskModal(false);
         })
      })
         .catch((err) => {
            console.log(err)
         })
   }
   const onCreateSprint = (values) => {
      values.dateStart = moment(values.dates[0]._d).format('YYYY-MM-DD');
      values.dateEnd = moment(values.dates[1]._d).format('YYYY-MM-DD');
      values.projectId = projectId;
      createSprint(values).then((items) => {
         openNotification('success', 'Sprint Created successfully');
         setSprintModal(false);
      }).catch((err) => {
         openNotification('error', err);
      })
   }

   const showModal = () => {
      setAddTaskModal(true);
   };
   const handleCancel = () => {
      setIsModalVisible(false);
      setAddMemeberModal(false);
      setAddTaskModal(false);
      setEditTaskModal(false);
      setTaskLogModal(false);
      setSprintModal(false);
      setMeetingModal(false)
   };

   const onTaskUpdate = values => {
      values.affectedTo = values.affectedTo.substring(1).trim();
      updateTask(values).then(() => {
         getTasks(projectId).then((items) => {
            setEditTaskModal(false)
            openNotification('success', 'Task added successfully');
            setTasks(items['data']);
         })
      })
         .catch((err) => {
            console.log(err)
         }).catch((err) => openNotification('error', err))
   }

   if (isLoading) {
      return <><Sidebar /><div class="content"> <Spin size='large' /></div></>;
   }
   return (
      <>
         <Sidebar />
         <Tabs defaultActiveKey="1" style={{ 'marginLeft': 260 }}>
            <TabPane tab='Project' key="1">
               <h1>Project Name: <strong>{project.name}</strong></h1>
               <h1>Project Description: <strong>{project.description}</strong></h1>
               <h1>Project Start Date: <strong>{moment(project.startDate).format('MMMM Do YYYY, HH:mm')}</strong></h1>
            </TabPane>
            <TabPane tab="Backlog" key="2">
               <h2>Backlog tasks</h2>
               <Table dataSource={tasks} scroll={{ x: '100% ' }} className='teamTable' columns={tasksColumn} />
               <Button type='primary' onClick={showModal}>Add New Task</Button>
               <Button type='primary' style={{ marginLeft: 10, marginBottom: 30 }} onClick={() => setSprintModal(true)}>Create a Sprint</Button>
            </TabPane>
            <TabPane tab="Team" key="3">
               <h2>Team in this project:</h2>
               <Table dataSource={team} className='teamTable' columns={columns} />
               <Button type='primary' onClick={() => setAddMemeberModal(true)}>Add New Member</Button>
            </TabPane>
            <TabPane tab="Sprints" key="4">
               {(isLoading) &&
                  <><Sidebar /><div class="content"> <Spin size='large' /></div></>
               }
               {/* <Table dataSource={tasks} scroll={{ x: '100% ' }} className='teamTable' columns={tasksColumn} /> */}
            </TabPane>
            <TabPane tab="Current Sprint" key="5">
               <h1>Current Sprint</h1>
               <h3>Time Left: 20:00:59</h3>
               {/* {(isLoading) &&
                  <><Sidebar /><div class="content"> <Spin size='large' /></div></>
               } */}
               <Table dataSource={sprint[0].tasks} scroll={{ x: '100% ' }} className='teamTable' columns={tasksColumn} />            </TabPane>
            <TabPane tab="Meetings" key="6">
               <h2>Meetings</h2>
               <Table dataSource={team} className='teamTable' columns={Meetings} />
               <Button type='primary' onClick={() => setMeetingModal(true)}>Create Meeting</Button>
            </TabPane>
         </Tabs>
         {/* ********************************** Modal ************************************ */}
         <Modal
            title="Task log"
            okText='Close'
            visible={taskLogModal}
            onCancel={handleCancel}>
            <p>Task created at <b>July 8th 2021, 03:34</b> by <Avatar size={30} src='http://localhost:3030/uploads/1623416082378.jpg' /> <strong>@youssef</strong></p>
            {/* {taskLog.map((item) => {
               console.log(item.message)
               return (<div dangerouslySetInnerHTML={{__html: item.message}}></div>)
            })} */}
         </Modal>

         {/* ********************************** Modal ************************************ */}
         <Modal
            title="Edit task"
            okText='Edit task'
            visible={editTaskModal}
            onOk={() => {
               formTask
                  .validateFields()
                  .then((values) => onTaskUpdate(values))
                  .catch((info) => {
                     console.log('Validate Failed:', info);
                  });
            }}
            onCancel={handleCancel}>
            <Form
               initialValues={tempTask}
               {...formItemLayout}
               form={formTask}
            >
               <Form.Item
                  name="name"
                  label="Task title"
                  rules={[{ required: true, message: 'Please input your the task title!' }]}
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
                  name="status"
                  label="Status"
                  rules={[{ required: true, message: 'Please select a status!' }]}
               >
                  <Select placeholder="Select project status">
                     <Option value="TO_DO">TO DO</Option>
                     <Option value="PROGRESS">PROGRESS</Option>
                     <Option value="DONE">DONE</Option>
                  </Select>
               </Form.Item>
               <Form.Item
                  name="priority"
                  label="Priority"
                  rules={[{ required: true, message: 'Please select task priority!' }]}
               >
                  <Select placeholder="Select project status">
                     <Option value="LOW">LOW</Option>
                     <Option value="MEDIUM">MEDIUM</Option>
                     <Option value="HIGH">HIGH</Option>
                  </Select>
               </Form.Item>
               <Form.Item
                  label="Estimation"
                  name="estimation"
                  rules={[{ required: true, message: 'Please input your estimation!' }]}>
                  <InputNumber />
               </Form.Item>
               <Form.Item
                  name="affectedTo"
                  label="Assign to"
                  rules={[
                     {
                        required: true,
                        message: 'Please select at least one collaborator'
                     },
                  ]}
               >
                  <Mentions rows={3} placeholder="You can use @ to select collaborators here">
                     {
                        team.map((user) => <Option value={user.username}><Avatar size={28} src={`http://localhost:3030/uploads/${user.image}`} style={{ marginRight: 9 }} />{user.username}</Option>)
                     }
                  </Mentions>
               </Form.Item>
               <Form.Item name="_id" noStyle>
                  <Input type='hidden' />
               </Form.Item>
            </Form>
         </Modal>

         {/* ********************************** Modal ************************************ */}
         <Modal
            title="Create a sprint"
            okText='Create Sprint'
            visible={sprintModal}
            onOk={() => {
               form
                  .validateFields()
                  .then((values) => onCreateSprint(values))
                  .catch((info) => {
                     console.log('Validate Failed:', info);
                  });
            }
            }
            onCancel={handleCancel} >
            <Form
               {...formItemLayout}
               form={form}
               name="register"
               scrollToFirstError
            >
               <Form.Item
                  name="dates"
                  label="Duration"
                  rules={[{ required: true, message: 'Please input sprint dates!' }]}
               >
                  <RangePicker showTime format="YYYY-MM-DD" />
               </Form.Item>
               <Form.Item
                  name="tasks"
                  label="Tasks"
                  rules={[{ required: true, message: 'Please add at least one task!' }]}
               >
                  <Select mode="tags" style={{ width: '100%' }} placeholder="Tasks Mode">
                     {
                        tasks.map((task) => <Option value={task._id} key={task._id}>{task.name}</Option>)
                     }
                  </Select>
               </Form.Item>

            </Form>

         </Modal>
         {/* ********************************** Modal ************************************ */}
         <Modal
            title="Add new task"
            okText='Add task'
            visible={addTaskModal}
            onOk={() => {
               formTask
                  .validateFields()
                  .then((values) => onAddNewTask(values))
                  .catch((info) => {
                     console.log('Validate Failed:', info);
                  });
            }}
            onCancel={handleCancel}>
            <Form
               {...formItemLayout}
               form={formTask}
               scrollToFirstError
            >
               <Form.Item
                  name="name"
                  label="Task title"
                  rules={[{ required: true, message: 'Please input your the task title!' }]}
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
                  name="status"
                  label="Status"
                  rules={[{ required: true, message: 'Please select a status!' }]}
               >
                  <Select placeholder="Select project status">
                     <Option value="TO_DO">TO DO</Option>
                     <Option value="PROGRESS">PROGRESS</Option>
                     <Option value="DONE">DONE</Option>
                  </Select>
               </Form.Item>
               <Form.Item
                  name="priority"
                  label="Priority"
                  rules={[{ required: true, message: 'Please select task priority!' }]}
               >
                  <Select placeholder="Select project status">
                     <Option value="LOW">LOW</Option>
                     <Option value="MEDIUM">MEDIUM</Option>
                     <Option value="HIGH">HIGH</Option>
                  </Select>
               </Form.Item>
               <Form.Item
                  label="Estimation"
                  name="estimation"
                  rules={[{ required: true, message: 'Please input your estimation!' }]}>
                  <InputNumber />
               </Form.Item>

               <Form.Item
                  name="affectedTo"
                  label="Assign to"
                  rules={[
                     {
                        required: true,
                        message: 'Please select at least one collaborator'
                     },
                  ]}
               >
                  <Mentions rows={3} placeholder="You can use @ to select collaborators here">
                     {
                        team.map((user) => <Option value={user.username}><Avatar size={28} src={`http://localhost:3030/uploads/${user.image}`} style={{ marginRight: 9 }} />{user.username}</Option>)
                     }
                  </Mentions>
               </Form.Item>
            </Form>
         </Modal>

         {/* ********************************** Modal ************************************ */}
         <Modal
            title="Add member to project"
            okText='Add Member'
            visible={addMemberModal}
            onOk={() => {
               form
                  .validateFields()
                  .then((values) => onAddMember(values))
                  .catch((info) => {
                     console.log('Validate Failed:', info);
                  });
            }}
            onCancel={handleCancel} >
            <Form
               form={form}
            >
               <Form.Item
                  name="users"
                  label="Collaborators"
                  rules={[
                     {
                        required: true,
                        message: 'Please select at least one collaborator'
                     },
                  ]}
               >
                  <Mentions rows={3} placeholder="You can use @ to select collaborators here">
                     {
                        collabs.map((user) => <Option value={user.username} key={user._id}><Avatar size={28} src={`http://localhost:3030/uploads/${user.image}`} style={{ marginRight: 9 }} />{user.username}</Option>)
                     }
                  </Mentions>
               </Form.Item>
            </Form>
         </Modal>
         {/* ********************************** Modal ************************************ */}
         <Modal
            title="Schedule a meeting"
            okText='Schedule meeting'
            visible={meetingModal}
            onOk={() => {
               form
                  .validateFields()
                  .then((values) => console.log(values))
                  .catch((info) => {
                     console.log('Validate Failed:', info);
                  });
            }}
            onCancel={handleCancel} >
            <Form
               form={form}
               {...formItemLayout}
            >

               <Form.Item
                  name="title"
                  label="Meeting Title"
                  rules={[{ required: true, message: 'Please input your Meeting title!' }]}
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
                  name="description"
                  label="Description"
                  rules={[{ required: true, message: 'Please add meeting description' }]}
               >
                  <TextArea />
               </Form.Item>
               <Form.Item
                  name="users"
                  label="Collaborators"
                  rules={[
                     {
                        required: true,
                        message: 'Please select at least one collaborator'
                     },
                  ]}
               >
                  <Mentions rows={3} placeholder="You can use @ to select collaborators here">
                     {
                        collabs.map((user) => <Option value={user.username} key={user._id}><Avatar size={28} src={`http://localhost:3030/uploads/${user.image}`} style={{ marginRight: 9 }} />{user.username}</Option>)
                     }
                  </Mentions>
               </Form.Item>
            </Form>
         </Modal>

      </>
   )
}

export default ProjectDetail;



