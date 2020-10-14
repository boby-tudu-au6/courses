import React, { useState } from 'react';
import { Switch,Route } from 'react-router-dom';
import { connect } from 'react-redux'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import Nav from './component/Nav'
import Home from './component/Home'
import Login from './component/login/Login'
import Profile from './component/profile/Profile'
import Course from './component/course/Course'
import Spinner from './component/Spinner'
import Fhome from './component/faculty/home/Fhome'
import Fprofile from './component/faculty/profile/FacultyProfile'
import Fcourse from './component/faculty/course/Course'
export const base = 'http://localhost:8080'
const App = ({loading,faculty}) => {

  return (
    <div>
      <Spinner data={loading} />
       <Nav />
        <Switch>
          <Route exact path='/login' component={Login} />
          
            <Route exact path='/' component={Home} />
            <Route exact path='/profile' component={Profile} />
            <Route exact path='/course' component={Course} />
            <Route exact path='/faculty/' component={Fhome} />
            <Route exact path='/faculty/profile' component={Fprofile} />
            <Route exact path='/faculty/course' component={Fcourse} />
        </Switch>
    </div>
  );
}

export default connect(state=>{return {...state}})(App);