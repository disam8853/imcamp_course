import React from 'react'

class Finish extends React.Component{
    
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
                <h1 style={{"textAlign":"center","height":"30vh", "margin-top":"20vh"}}>已收到您的提交</h1>
            </div>
        )
    }
}
export default Finish