import React from 'react'

export default function SelectionData(data){
    var data = data.data
    return (        
        <div>

        {data.map((d, i) => {
            return(
            <div className='my-2' key={i} style={{marginLeft:"30px"}}>
                <h4 className='mb-1'>課程名稱：{d.course_name}</h4>
                <h4 >您選的志願序：{d.priority}</h4>
            </div>
        )})}

        </div>
    )
}