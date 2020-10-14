import React,{useEffect,useState} from 'react'

function FacultyRegister({state,setState,socket}) {
    useEffect(()=>{
        if(socket!==undefined && socket!==null){
            socket.on('fregister',data=>{
                if(data.status==='ok')console.log("register done")
                else{console.log(data)}
            })
        }
    },[socket])
    const handleFacultyRegister = e =>{
        e.preventDefault()
        const {fname,fmail,fpass} = e.target
        if(fname.value!=='' && fmail.value!=='' && fpass.value!==''){
            return socket.emit('fregister',{
                name:fname.value,
                email:fmail.value,
                pass:fpass.value
            })
        }else{
            alert("all fields required")
        }
    }
    return (
        <div className='col-12 col-md-6 p-2 p-md-4'>
            <h4 className='text-center'>Register Faculty</h4>
            <form onSubmit={handleFacultyRegister} className='form p-3 text-center'>
                <input type="text" name="fname" 
                value={state.fname}
                onChange={e=>setState({...state,fname:e.target.value})}
                required={true}
                placeholder="Enter name"
                className='form-control mb-2'/>
                <input type="email" name="fmail" 
                value={state.fmail}
                onChange={e=>setState({...state,fmail:e.target.value})}
                required={true}
                placeholder="Enter email"
                className='form-control mb-2'/>
                <input type="password" name="fpass" 
                value={state.fpass}
                onChange={e=>setState({...state,fpass:e.target.value})}
                required={true}
                placeholder="Enter password"
                className='form-control mb-2'/>
                <button type='submit' className='btn btn-primary'>Register</button>
            </form>
            <p onClick={()=>setState({...state,fstate:"login"})} 
            style={{cursor:"pointer",color:"blue"}}>Already registered? Login here</p>
        </div>
    )
}

export default FacultyRegister
