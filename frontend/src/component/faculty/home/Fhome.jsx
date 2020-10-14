import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import CourseForm from './CourseForm'
import { setAllCourse } from '../../../redux/action/action'

function Fhome({socket,allcourse,setAllCourse}) {
    let token = localStorage.getItem('token')
    useEffect(()=>{
        if(socket!==null){
            socket.emit('getfmycourse',{token})

            socket.on('getfmycourse',data=>{
                if(data.status==='ok'){
                    console.log(data)
                    setAllCourse(data.courses)
                }
            })

            socket.on('createcourse',data=>{
                if(data.status==='ok')socket.emit('getfmycourse',{token})
            })
        }

    },[socket])


    
    return (
        <div className='col-12 p-0 text-center'>
            <CourseForm socket={socket} />
            <h3 
            className='display-4 font-weight-light text-center'>My courses</h3>
            <div className='col-10 m-auto col-md-7 pt-5'>
            {
                allcourse && allcourse.map(item=>(
                    <div key={item._id} className="card text-left mb-2 border border-dark">
                    <div className="card-body">
                        <h4 className="card-title">{item.title}</h4>
                        <p className="p-0 m-0 card-text text-secondary">{item.desc}</p>
                        <p className='p-0 m-0'><strong>Department: </strong>{item.dept}</p>
                        <p className='p-0 m-0'><strong>Room: </strong>{item.room}</p>
                        <p className='p-0 m-0'><strong>team: </strong>{item.team}</p>
                        <p className='p-0 m-0'><strong>waitlist: </strong>{item.waitlist}</p>
                    </div>
                    </div>
                ))
            }
            </div>
            
        </div>
    )
}
const mapDispatch = disptach =>{
    return {
        setAllCourse:payload=>disptach(setAllCourse(payload))
    }
}
export default connect(state=>{return {...state}},mapDispatch)(Fhome)
