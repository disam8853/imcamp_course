import React from 'react'
import Selector from '../component/Selector'
import {Link} from 'react-router-dom'
const axios = require('axios');
//import '../css/main.css'

class LoginForm extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            account: "",
            password: "",
            isStudent: true 
        }
        document.getElementsByClassName("wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50")[0].setAttribute("class","wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50")
        document.title="系統登入"
    }
    
    handleAccount = (e)=>{
        this.setState({account: e.target.value})
    }

    handlePassword = (e)=>{
        this.setState({password: e.target.value})
    }

    handleStuOnclick = (e)=>{
        this.setState({isStudent: true})
    }

    handleTeachOnclick = (e)=>{
        this.setState({isStudent:false})
    }

    handleSubmit = (e)=>{
        e.preventDefault();
        console.log(1)
    }

    render(){
        return(
            <form className="login100-form validate-form">
                <span className="login100-form-title p-b-33">
                    系統登入
                </span>

                <div className="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                    <input className="input100" type="text" name="email" placeholder="Account" onChange={this.handleAccount}/>
                    <span className="focus-input100-1"></span>
                    <span className="focus-input100-2"></span>
                </div>

                <div className="wrap-input100 rs1 validate-input" data-validate="Password is required">
                    <input className="input100" type="password" name="pass" placeholder="Password" onChange={this.handlePassword}/>
                    <span className="focus-input100-1"></span>
                    <span className="focus-input100-2"></span>
                </div>
                <Selector isStudent={this.state.isStudent} stuOnclick={this.handleStuOnclick} teachOnclick={this.handleTeachOnclick}/>
                <div className="container-login100-form-btn m-t-20">
                    <button className="login100-form-btn" onClick={this.handleSubmit}>
                        <Link to="/intro" style={{display: 'block', fontSize:"14px", width:"100%", color:"white"}}>登入</Link>
                    </button>
                </div>

            </form>
        )
    }
}

export default LoginForm