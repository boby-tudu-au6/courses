import React,{useEffect,useState} from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { facultyLogin } from '../../redux/action/action'

function FacultyLogin({state,setState,socket,history,facultyLogin}) {
    
    useEffect(()=>{
        if(socket!==undefined && socket!==null){
            socket.on('flogin',data=>{
                if(data.status==='ok'){
                    facultyLogin()
                    localStorage.setItem('token',data.token)
                    localStorage.setItem('faculty','true')
                    history.push('/faculty/')
                }
                return console.log(data)
            })
        }
    },[socket])

    
        const handleFacultyLogin = e =>{
            e.preventDefault()
            const {fmail,fpass} = e.target
            if(fmail.value!=='' && fpass.value!==''){
                return socket.emit('flogin',{
                    email:fmail.value,
                    pass:fpass.value
                })
            }else{
                alert("all fields required")
            }
        }
    
    return (
        <div className='col-12 col-md-6 p-2 p-md-4'>
            <h4 className='text-center'>Login Faculty</h4>
            <form onSubmit={handleFacultyLogin} className='form p-3 text-center'>
                <input type="email" name="fmail" 
                value={state.fmail}
                onChange={e=>setState({...state,fmail:e.target.value})}
                required={true}
                placeholder="Enter email"
                className='form-control mb-2'/>
                <input type="password" name="fpass" 
                value={state.fpass}
                required={true}
                onChange={e=>setState({...state,fpass:e.target.value})}
                placeholder="Enter password"
                className='form-control mb-2'/>
                <button type='submit' className='btn btn-primary'>Login</button>
            </form>
            <p onClick={()=>setState({...state,fstate:"register"})} 
            style={{cursor:"pointer",color:"blue"}}>Not registered yet? Register here</p>
        </div>
    )
}
const mapDispatch = dispatch =>{
    return {
        facultyLogin:()=>dispatch(facultyLogin())
    }
}
export default connect(state=>{return {...state}},mapDispatch)(withRouter(FacultyLogin))
