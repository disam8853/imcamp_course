import React from 'react'

export default function ClassPanel({category, id, panelItemOnclick}){
    let all = category.classes.map((clas,index) => (
        <li className="li-link" key={index} onClick={panelItemOnclick}>{clas}</li>
    ));
    return(
        <div className="panel panel-default">
            <div className="panel-heading">
                <h4 className="panel-title">
                <a className="font-size20" data-toggle="collapse" data-parent="#accordion"
                    href={"#"+id}>
                    {category.name}
                </a>
                </h4>
            </div>
            <div id={id} className="panel-collapse collapse">
                <div className="panel-body">
                    <ul>
                        {all}
                    </ul>
                </div>
            </div>
        </div>  
    )
}