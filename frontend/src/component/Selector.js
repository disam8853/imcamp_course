import React from 'react'

export default function Selector(props){
    if(props.isStudent === true){
        return(
            <div className="col stDiv">
                    <div className="row">
                    <div className="col-6 stOrTeacher selected" onClick={props.stuOnclick}>學生</div>
                    <div className="col-6 stOrTeacher" onClick={props.teachOnclick}>老師</div>
                    </div>
            </div>
        )
    }
    else{
        return(
            <div className="col stDiv">
                    <div className="row">
                    <div className="col-6 stOrTeacher" onClick={props.stuOnclick}>學生</div>
                    <div className="col-6 stOrTeacher selected" onClick={props.teachOnclick}>老師</div>
                    </div>
            </div>
        )
    }
}