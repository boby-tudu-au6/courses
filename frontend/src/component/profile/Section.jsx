import React from 'react'
import {Edit2,Save} from 'react-feather'

function Section({label,value,onChange,edit,save,disable}) {
    return (
        <div className='col-12 row m-auto pb-2'>
            <div className='col-2 text-left'>
                <p>{label}</p>
            </div>
            <div className='col-8'>
                <input 
                className='form-control' 
                value={value}
                onChange={onChange}
                disabled={disable}
                type="text"/>
            </div>
            <div className='col-1'>
                <Edit2 
                style={{cursor:"pointer"}}
                onClick={edit}/>
            </div>
            <div className='col-1'>
                <Save 
                style={{cursor:"pointer"}}
                onClick={save}/>
            </div>
        </div>
    )
}

export default Section
