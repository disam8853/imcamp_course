import React from 'react'

export default function SelectionData(data){
    var data = data.data
    console.log(data)
    return (        
        <div className='my-3'>
            <h4 >課程名稱：{data.course_id}</h4>
            <h4 >您選的志願序：{data.priority}</h4>
        </div>
    )
}