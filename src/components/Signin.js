import { useContext } from 'react'
import { useHistory } from "react-router-dom";
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import logo from '../assets/winddd.png'
import axios from "axios";
import { UserContext } from '../utils/UserContext'
import { openNotification } from '../services/notification'

const LoginContainer = styled.div`
   width: 300px;
   margin: auto;
   position:relative;
   top:170px;
`
const Image = styled.img`
   width: 300px;
   height: 100px;
   object-fit: contain;
   margin-bottom: 25px;
`


const Signin = () => {
   const { user, setUser } = useContext(UserContext)
   let history = useHistory();

   const onFinish = (values) => {
      axios.post('http://localhost:3030/users/login', values)
         .then((user) => {
            openNotification('success', user.data['message'])
            localStorage.setItem('userToken', user.data['token']);
            setUser(user.data['user'])
            history.push(`/p/${user.data.user.username}`)

         }).catch((err) => {
            openNotification('error', err.response.data.message)
         })
   };

   const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
   };

   return (
      <LoginContainer>

         <Image src={logo} alt='Wind Logo' />
         <Form
            name="login"
            className="login-form"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
         >
            <Form.Item
               name="email"
               rules={[
                  {
                     required: true,
                     type: 'email',
                     message: 'Please input your email!',
                  },
               ]}
            >
               <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
            </Form.Item>
            <Form.Item
               name="password"
               rules={[
                  {
                     required: true,
                     message: 'Please input your Password!',
                  },
               ]}
            >
               <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
               />
            </Form.Item>

            <Form.Item>
               <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  block shape='round'
               >
                  Log in
               </Button>
            </Form.Item>
         </Form>
      </LoginContainer>
   );
};
export default Signin;