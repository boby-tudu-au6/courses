import React, { useEffect } from 'react'
import {withRouter} from 'react-router-dom'

function UserLogin({state,setState,socket,history}) {

    
    useEffect(()=>{
        if(socket!==undefined && socket!==null){
            socket.on('ulogin',data=>{
                if(data.status==='ok'){
                    localStorage.setItem('token',data.token)
                    history.push('/')
                }
            })
        }
    },[socket])

    const handleUserLogin = e =>{
        e.preventDefault()
        const {umail,upass} = e.target
        if(umail.value!=='' && upass.value!==''){
            return socket.emit('ulogin',{
                email:umail.value,
                pass:upass.value
            })
        }else{
            alert("all fields required")
        }
    }
    return (
        <div className='col-12 col-md-6 p-2 p-md-4'>
            <h4 className='text-center'>Login user</h4>
            <form onSubmit={handleUserLogin} method='post'
            className='form p-3 text-center'>
                <input type="email" name="umail" 
                value={state.umail}
                onChange={e=>setState({...state,umail:e.target.value})}
                required={true}
                placeholder="Enter email"
                className='form-control mb-2'/>
                <input type="password" name="upass" 
                value={state.upass}
                required={true}
                onChange={e=>setState({...state,upass:e.target.value})}
                placeholder="Enter password"
                className='form-control mb-2'/>
                <button type='submit' className='btn btn-primary'>Login</button>
            </form>
            <p onClick={()=>setState({...state,ustate:"register"})} 
            style={{cursor:"pointer",color:"blue"}}>Not registered yet? Register here</p>
        </div>
    )
}

export default withRouter(UserLogin)
