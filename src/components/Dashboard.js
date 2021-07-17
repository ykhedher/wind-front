import React, { useState, useEffect } from 'react'
import { Card, Col, Row } from 'antd';
import { Doughnut } from 'react-chartjs-2';
import Sidebar from './Sidebar';
import { Typography, Spin } from 'antd';
import ReactWeather, { useOpenWeather } from 'react-open-weather';
import moment from 'moment'
import { getProjects, getUsersList, getDoneProjects } from '../services';
const { Title, Text } = Typography;
function Dashboard() {
   const [loading, setLoading] = useState(true);
   const [projectNumber, setProjectNumber] = useState(0);
   const [doneProjects, setDoneProjects] = useState(0)
   const [staff, setStaff] = useState(0)

   useEffect(() => {
      let mount = true
      getProjects()
         .then(items => {
            if (mount) {
               setProjectNumber(items['data'].length);
            }
         });
      getDoneProjects()
         .then(items => {
            if (mount) {
               setDoneProjects(items['data'].length);
            }
         });
      getUsersList()
         .then(items => {
            if (mount) {
               setStaff(items['data'].length);
               setLoading(false)
            }
         })
      return () => mount = false;
   }, [])


   const { data, isLoading, errorMessage } = useOpenWeather({
      key: 'af30419d1c51e6c69db2c2513406a74a',
      lat: '35.5024',
      lon: '11.0457',
      lang: 'en',
      unit: 'metric', // values are (metric, standard, imperial)
   });
   const dataChart = {
      labels: ['DONE', 'PROGRESS', 'TO DO'],
      datasets: [
         {
            data: [7, 9, 10],
            backgroundColor: [
               'rgba(58, 254, 9, 0.2)',
               'rgba(54, 162, 235, 0.2)',
               'rgba(255, 206, 86, 0.2)',
            ],
            borderColor: [
               'rgba(58, 254, 9, 1)',
               'rgba(54, 162, 235, 1)',
               'rgba(255, 206, 86, 1)',
            ],
            borderWidth: 1,
         },
      ],
   };

   if (loading) {
      return <><Sidebar /><div class="content"> <Spin size='large' /></div></>;
   }
   return (
      <>
         <Sidebar />
         <div className="site-card-wrapper" style={{ 'marginLeft': 260, marginTop: 30 }}>
            <Title>Dashboard</Title>
            <Row gutter={10}>
               <Col span={5}>
                  <Card bordered={true}>
                     <Title level={4}>Projects</Title>
                     <Title type='success'>{projectNumber}</Title>
                  </Card>
               </Col>
               <Col span={5}>
                  <Card bordered={true}>
                     <Title level={4}>Employees</Title>
                     <Title type='success'>{staff}</Title>
                  </Card>
               </Col>
               <Col span={5}>
                  <Card bordered={true}>
                     <Title level={4}>Finished Projects</Title>
                     <Title type='success'>{doneProjects}</Title>
                  </Card>
               </Col>
               <Col span={7} style={{ marginLeft: 100 }}>
                  <Card bordered={true}>
                     <ReactWeather
                        isLoading={isLoading}
                        errorMessage={errorMessage}
                        data={data}
                        lang="en"
                        locationLabel="Mahdia"
                        unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
                        showForecast
                     />
                  </Card>
               </Col>
            </Row>
            <div style={{ width: 400, height: 400 }} className='chart'>
               <Title level={3}>Tasks this week</Title>
               <Doughnut
                  data={dataChart}
                  width='200px'
                  options={{
                     responsive: true,
                     maintainAspectRatio: true,
                  }} />
            </div>

         </div>
      </>
   )
}

export default Dashboard
