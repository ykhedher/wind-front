import React, { useState, useMemo } from "react";
import './App.css';
import Signin from './components/Signin'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { UserContext } from "./utils/UserContext";
import Sidebar from "./components/Sidebar";
import Profile from "./components/Profile";
import Users from "./components/Users";
import Projects from './components/Projects';
import ProjectDetail from "./components/ProjectDetail";
import Dashboard from "./components/Dashboard";


function App() {
  const [user, setUser] = useState(null);

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);
  return (
    <div>
     <Router>
        <Switch>
          <UserContext.Provider value={value}>
            <Route path={"/p/:username"} component={Profile} />
            <Route exact path="/">
              <Signin />
            </Route>
            <Route exact path="/users">
              <Users />
            </Route>
            <Route exact path='/projects'>
              <Projects/>
            </Route>
            <Route exact path="/projects/:id"> 
            <ProjectDetail/>
            </Route>
            <Route exact path='/dashboard'>
              <Dashboard/>
            </Route>
          </UserContext.Provider>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
