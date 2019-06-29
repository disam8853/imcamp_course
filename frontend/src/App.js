import React from 'react';
import LoginForm from './container/LoginForm'
import ClassIntro from './container/ClassIntro'
import SelectCourse from './container/SelectCourse'
import Profile from './container/Profile'
import TeacherPanel from './container/TeacherPanel'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      token:"",
      finish:true
    }
  }
  handleToken = (token)=>{
    this.setState({token:token})
    localStorage.setItem('token', token);
  }

  render(){
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={LoginForm} handleToken={this.handleToken}/>
          <Route path='/intro' component={()=><ClassIntro token={this.state.token}/>}/>
          <Route path='/select' component={()=><SelectCourse token={this.state.token}/>}/>
          <Route path='/teacher' component={()=><TeacherPanel token={this.state.token}/>}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
