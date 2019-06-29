import React from 'react'
import {Link} from 'react-router-dom'

class Finish extends React.Component{
    
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
                <h1 style={{"textAlign":"center","height":"30vh", "margin-top":"20vh"}}>已收到您的提交</h1>
                <Link to='/' className="btn btn-primary btn-lg mx-auto d-block">回首頁</Link>
            </div>
        )
    }
}
export default Finish