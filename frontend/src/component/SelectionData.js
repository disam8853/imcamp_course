import React from 'react'

export default function SelectionData(data){
    var data = data.data
    return (        
        <div>

        {data.map((d, i) => (
            <div className='my-2' key={i} style={{marginLeft:"30px"}}>
                <h4 className='mb-1'>課程名稱：{d}</h4>
                <h4 >您選的志願序：{i+1}</h4>
            </div>
        ))}

        </div>
    )
}