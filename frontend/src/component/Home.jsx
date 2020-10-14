import React, { useEffect, useState, useMemo } from 'react'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux'

import { setEvents,setLoading, getAllfn } from '../redux/action/action'

function Home({history,setLoading,socket,getall,getAllfn,...props}) {
    
    const [con,setCon] = useState('')
    const [value,setValue] = useState('')
    let token = localStorage.getItem('token')
    let faculty = localStorage.getItem("faculty")
    if(token===null)history.push('/login')
    if(faculty==='true')history.push('/faculty')

    useEffect(()=>{

        
        if(socket!==null){

            socket.emit('getallcourse')

            socket.on('getallcourse',data=>{
                if(data.status==='ok'){
                    getAllfn(data.courses)
                }
            })

            socket.on('buycourse',data=>{
                setLoading(false)
                if(data.status==='ok'){
                    console.log(data)
                }
            })

            
        }
    },[socket])

    const buyCourse = _id =>{
        setLoading(true)
        socket.emit('buycourse',{_id,token})
    }

    

    return (
        <div>
            <h3 className='display-4 font-weight-light text-center'>All available courses</h3>
            <div className='col-10 m-auto col-md-7 pt-5'>
            {
                getall && getall.map(item=>(
                    <div key={item._id} className="card text-left mb-2 border border-dark">
                    <div className="card-body">
                        <h4 className="card-title">{item.title}</h4>
                        <p className="p-0 m-0 card-text text-secondary">{item.desc}</p>
                        <p className='p-0 m-0'><strong>Department: </strong>{item.dept}</p>
                        <p className='p-0 m-0'><strong>Room: </strong>{item.room}</p>
                        <p className='p-0 m-0'><strong>team: </strong>{item.team}</p>
                        <p className='p-0 m-0'><strong>waitlist: </strong>{item.waitlist}</p>
                        <button 
                        onClick={()=>buyCourse(item._id)}
                        className='btn btn-outline-success'>Buy</button>
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
        setEvents:payload=>dispatch(setEvents(payload)),
        setLoading:payload=>dispatch(setLoading(payload)),
        getAllfn:payload=>dispatch(getAllfn(payload))
    }
}

export default connect(state=>{return {...state}},mapDispatch)(withRouter(Home))
