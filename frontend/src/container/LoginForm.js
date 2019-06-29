import React from 'react'
import Selector from '../component/Selector'
import { Redirect, Link} from 'react-router-dom'
const axios = require('axios');
//import '../css/main.css'

class LoginForm extends React.Component {


    constructor(props){
        super(props)
        this.state = {
            account: "",
            password: "",
            isStudent: true,
            link:"/intro",
            token: this.props.token,
            login: false
        }
        document.getElementsByClassName("wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50")[0].setAttribute("class","wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50")
        document.title="系統登入"
    }
    
    handleAccount = (e)=>{
        this.setState({account: e.target.value})
    }


  handleAccount = (e) => {
    this.setState({ account: e.target.value })
  }

    handleStuOnclick = (e)=>{
        this.setState({isStudent: true,link:"/intro"})
    }

    handleTeachOnclick = (e)=>{
        this.setState({isStudent:false,link:"/teacher"})
    }
    handlePassword = (e) => {
      this.setState({ password: e.target.value })
    }


  handleSubmit = (e) => {
    e.preventDefault();
    console.log(1)
    let api = (this.state.isStudent ? '/api/login' : '/api/teacher/login')
    axios.post(api , {
        email: this.state.account,
        password: this.state.password
      })
      .then(response => {
        console.log(response);
        if (response.data.error) {
          // login fail
          console.log(response.data.error)
          alert(response.data.error)
        } else {
          // login successfully
          let token = response.data.token,
            name = response.data.name;
          console.log(token)
          this.setState({ token: token, login: true});
          localStorage.setItem('name', name);
          this.props.handleToken(token);
        }
      })
      .catch(error => {
        alert(error)
        console.log(error);
      });
  }

  render() {
    if (this.state.login) {
        return (<Redirect push to={this.state.link} token={this.state.token}/>)
    }
    return (
      <form className="login100-form validate-form">
                <span className="login100-form-title p-b-33">
                    系統登入
                </span>

                <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">

                    <input className="input100" type="text" name="email" placeholder="Email" onChange={this.handleAccount}/>
                    <span className="focus-input100-1"></span>
                    <span className="focus-input100-2"></span>
                </div>

                <div className="wrap-input100 rs1 validate-input" data-validate="Password is required">
                    <input className="input100" type="password" name="pass" placeholder="Password" onChange={this.handlePassword} />
                    <span className="focus-input100-1"></span>
                    <span className="focus-input100-2"></span>
                </div>
                <Selector isStudent={this.state.isStudent} stuOnclick={this.handleStuOnclick} teachOnclick={this.handleTeachOnclick}/>
                <div className="container-login100-form-btn m-t-20">
                    <button className="login100-form-btn" onClick={this.handleSubmit}>
                        <div style={{display: 'block', fontSize:"14px", width:"100%", color:"white", height:"50px", paddingTop:"12px"}}>登入</div>

                    </button>
                </div>

            </form>
    )
  }
}

export default LoginForm