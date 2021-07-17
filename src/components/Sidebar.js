import React, { useContext } from 'react'
import { UserContext } from '../utils/UserContext'
import { NavLink, useHistory } from 'react-router-dom'
import logo from '../assets/logo.png'
import { Layout, Menu, Avatar, Typography, Divider } from 'antd';
import styled from 'styled-components'
import {
   AppstoreOutlined,
   BarChartOutlined,
   CloudOutlined,
   UserOutlined,
   UsergroupAddOutlined,
   PieChartOutlined,
   LogoutOutlined
} from '@ant-design/icons';

const { Sider } = Layout;
const { Title } = Typography;
const UserInfoContainer = styled.div`
   display: flex;
   flex-direction: column;
   align-content: center;
   justify-content: center;
   align-items: center;
   padding: 1;
   position: relative;
   top: 10px;
`
const Image = styled.img`
   width: 150px;
   padding-bottom: 20px;
`

function Sidebar() {
   const { user } = useContext(UserContext);
   let history = useHistory();

   const logOut = () => {
      localStorage.removeItem('userToken');
      history.push('/');
   }

   return (
      <Layout>
         <Sider className='sider'>
            <UserInfoContainer>
               <div className="logo">
                  <Image src={logo} alt='wind logo' />
               </div>
               <Avatar shape="circle" size={128} src={`http://localhost:3030/uploads/${user.image}`} />
               <Title level={2} style={{ color: "#fff" }}>Hi {user.firstName}</Title>
            </UserInfoContainer>
            <Divider />
            <Menu theme="dark" mode="inline">
               <Menu.Item key="1" icon={<UserOutlined />}>
                  <NavLink to={`/p/${user.username}`} activeClassName="selected">Profile</NavLink>
               </Menu.Item>
               <Menu.Item key="2" icon={<AppstoreOutlined />}>
                  <NavLink to='/projects' activeClassName="selected">Projects</NavLink>
               </Menu.Item>
               {user.userType === 'ADMIN' && (
                  <>
                     <Menu.Item key="3" icon={<UsergroupAddOutlined />}>
                        <NavLink to='/users' activeClassName="selected">Users</NavLink>
                     </Menu.Item>
                     <Menu.Item key="7" icon={<PieChartOutlined />}>
                        <NavLink to='/dashboard' activeClassName="selected">Dashboard</NavLink>
                     </Menu.Item>
                  </>
               )}
               <Menu.Item key="8" onClick={logOut} icon={<LogoutOutlined />}>
                  Log out
               </Menu.Item>
            </Menu>
         </Sider>
      </Layout>
   )
}

export default Sidebar
