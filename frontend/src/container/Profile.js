import React from 'react'
import { Redirect } from 'react-router-dom'
import SelectionData from '../component/SelectionData'

const axios = require('axios');
//import '../css/main.css'

class Profile extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      token: localStorage.getItem('token'),
      name: "王松億",
      school: "台北市立松山高中",
      section: [],
      redirect: false
    };
  }

  componentWillMount() {
    if (!this.state.token) {
      alert("please sign in!")
      this.setState({redirect: true});
    }

    axios.post('/api/profile', {
        token: this.state.token
      })
      .then(response => {
        console.log(response.data.section);
        this.setState({
          name: response.data.name,
          school: response.data.school,
          section: response.data.section
        });
      })
      .catch(error => {
        console.log(error);
        alert('請重新登入！')
        this.setState({redirect: true});
      });
  }

  render() {
    if (this.state.redirect) {
      return (<Redirect push to="/"/>)
    } else {
    return (
      <div className='profile'>
        <div className='proHeader'>
          <h1>個人主頁</h1>
        </div>
        <hr/>
        <div className='proBody'>
          <h3 >{this.state.name}</h3>
          <h4 className='my-3'>{this.state.school}</h4>
          <h3>選課資料：</h3>
          <ol>
            {this.state.section.map(data => 
              <li><SelectionData data={data} /></li>
            )}
          </ol>
          
        </div>
      </div>
    )}
  }
}

export default Profile