import React from 'react'
import { connect } from 'react-redux'
import { getMine } from '../../redux/action/action'
import { useEffect } from 'react'

function Course({socket,mycourse,getMine}) {
    let token = localStorage.getItem('token')
    useEffect(()=>{
        
        if(socket!==null){
            socket.emit('getmine',{token})

            socket.on('getmine',data=>{
                if(data.status==='ok'){
                    console.log(data)
                    getMine(data.courses)
                }
            })
        }
    },[socket])
    if(mycourse!==null)console.log(mycourse)
    return (
        <div>
            <h3 className='text-center'>Purchased courses</h3>
            <div className='col-9 col-md-7 m-auto'>
            {
                mycourse && mycourse.map(item=>(
                    <div key={item._id} 
                    className="card text-left mb-2 border border-dark">
                    <div className="card-body">
                        <h4 className="card-title">{item.courseid.title}</h4>
                        <p className="p-0 m-0 card-text text-secondary">{item.courseid.desc}</p>
                    </div>
                    </div>
                ))
            }
            </div>
        </div>
    )
}

const mapDispatch = dispatch =>{
    return {
        getMine:payload=>dispatch(getMine(payload))
    }
}
export default connect(state=>{return {...state}},mapDispatch)(Course)
