import React from 'react';
import LoginForm from './container/LoginForm'
import ClassIntro from './container/ClassIntro'
import {BrowserRouter, Route} from 'react-router-dom'
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Route path='/' component={LoginForm}>
        <Route path='intro' component={ClassIntro}/>
      </Route>
    </BrowserRouter>
  );
}

export default App;
