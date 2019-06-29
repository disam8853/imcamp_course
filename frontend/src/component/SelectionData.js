import React from 'react'

export default function SelectionData(data){
    var data = data.data
    return (        
        <div>

        {data.map((d, i) => (
            <div className='my-2'>
                <h4 >課程名稱：{d.course_id}</h4>
                <h4 >您選的志願序：{d.priority}</h4>
            </div>
        ))}

        </div>
    )
}