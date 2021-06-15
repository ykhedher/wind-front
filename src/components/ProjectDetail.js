import React from 'react'
import Sidebar from './Sidebar'
import { Tabs } from 'antd';

const { TabPane } = Tabs;


function ProjectDetail() {
   console.log(window.location.href)
   function callback(key) {
      console.log(key);
   }
   return (
      <div>
         <Sidebar />
         <Tabs defaultActiveKey="1" onChange={callback} style={{ 'margin-left': 260 }}>
            <TabPane tab="Project" key="1">
               Content of Tab Pane 1
            </TabPane>
            <TabPane tab="Tasks" key="2">
               Content of Tab Pane 2
            </TabPane>
            <TabPane tab="Team" key="3">
               Content of Tab Pane 3
            </TabPane>
             <TabPane tab="Sprints" key="4">
               Content of Tab Pane 3
            </TabPane>
            
         </Tabs>
      </div>
   )
}

export default ProjectDetail
