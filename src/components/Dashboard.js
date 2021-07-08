import React from 'react'
import { Card, Col, Row } from 'antd';
import { Doughnut } from 'react-chartjs-2';
import Sidebar from './Sidebar';
import { Typography } from 'antd';
import ReactWeather, { useOpenWeather } from 'react-open-weather';
import moment from 'moment'
const { Title, Text } = Typography;
function Dashboard() {
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


   return (
      <>
         <Sidebar />
         <div className="site-card-wrapper" style={{ 'marginLeft': 260, marginTop: 30 }}>
            <Title>Dashboard</Title>
            <Row gutter={10}>
               <Col span={5}>
                  <Card bordered={true}>
                     <Title level={4}>Projects</Title>
                     <Title type='success'>6</Title>
                  </Card>
               </Col>
               <Col span={5}>
                  <Card bordered={true}>
                     <Title level={4}>Employees</Title>
                     <Title type='success'>22</Title>
                  </Card>
               </Col>
               <Col span={5}>
                  <Card bordered={true}>
                     <Title level={4}>Finished Projects</Title>
                     <Title type='success'>3</Title>
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
