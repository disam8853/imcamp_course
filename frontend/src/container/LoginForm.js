import React from 'react'
import Selector from '../component/Selector'
//import '../css/main.css'

class LoginForm extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            account: "",
            password: "",
            isStudent: true 
        }
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
    }

    render(){
        return(
            <form class="login100-form validate-form">
                <span class="login100-form-title p-b-33">
                    系統登入
                </span>

                <div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
                    <input class="input100" type="text" name="email" placeholder="Account" onChange={this.handleAccount}/>
                    <span class="focus-input100-1"></span>
                    <span class="focus-input100-2"></span>
                </div>

                <div class="wrap-input100 rs1 validate-input" data-validate="Password is required">
                    <input class="input100" type="password" name="pass" placeholder="Password" onChange={this.handlePassword}/>
                    <span class="focus-input100-1"></span>
                    <span class="focus-input100-2"></span>
                </div>
                <Selector isStudent={this.state.isStudent} stuOnclick={this.handleStuOnclick} teachOnclick={this.handleTeachOnclick}/>
                <div class="container-login100-form-btn m-t-20">
                    <button class="login100-form-btn" onClick={this.handleSubmit}>
                    登入
                    </button>
                </div>

            </form>
        )
    }
}

export default LoginForm