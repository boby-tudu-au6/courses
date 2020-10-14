import React, { useEffect } from 'react'

function UserRegister({state,setState,socket}) {
    useEffect(()=>{
        if(socket!==undefined && socket!==null){
            socket.on('uregister',data=>{
                if(data.status==='ok')console.log("register done")
                else{console.log(data)}
            })
        }
    },[socket])
    const handleUserRegister = e =>{
        e.preventDefault()
        const {uname,umail,upass} = e.target
        if(uname.value!=='' && umail.value!=='' && upass.value!==''){
            return socket.emit('uregister',{
                name:uname.value,
                email:umail.value,
                pass:upass.value
            })
        }else{
            alert("all fields required")
        }
    }

    
    return (
        <div className='col-12 col-md-6 p-2 p-md-4 border-right border-dark'>
            <h4 className='text-center'>Register user</h4>
            <form onSubmit={handleUserRegister} 
            method='post'
            className='form p-3 text-center'>
                <input type="text" name="uname" 
                value={state.uname}
                onChange={e=>setState({...state,uname:e.target.value})}
                required={true}
                placeholder="Enter name"
                className='form-control mb-2'/>
                <input type="email" name="umail" 
                value={state.umail}
                onChange={e=>setState({...state,umail:e.target.value})}
                required={true}
                placeholder="Enter email"
                className='form-control mb-2'/>
                <input type="password" name="upass" 
                value={state.upass}
                onChange={e=>setState({...state,upass:e.target.value})}
                required={true}
                placeholder="Enter password"
                className='form-control mb-2'/>
                <button type='submit' className='btn btn-primary'>Register</button>
            </form>
            <p onClick={()=>setState({...state,ustate:"login"})} 
            style={{cursor:"pointer",color:"blue"}}>Already registered? Login here</p>
        </div>
    )
}

export default UserRegister
