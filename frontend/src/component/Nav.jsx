import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import { setSocket, logout, 
    setLoading, setEvents } from '../redux/action/action'
import { withRouter,NavLink } from 'react-router-dom'

function Nav({setSocket,setLoading,history,logout,...props}) {
    // const [socket,setConn] = useState(io.connect('http://localhost:8080'))
    const [socket,setConn] = useState(io.connect('https://coursemine.herokuapp.com'))
    const token = localStorage.getItem('token')
    const faculty = localStorage.getItem("faculty")
    useEffect(() => {
        
        setSocket(socket)

    }, [])




    return (
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
            <a href="/" className='navbar-brand'>Logo</a>
            {
                token!==null?
                <ul className="navbar-nav ml-auto">
                <NavLink exact className="nav-item" to={faculty===null?'/':'/faculty/'} 
                activeClassName='active'>
                    <p className='nav-link'>Home</p>
                </NavLink>
                <NavLink exact className="nav-item" 
                to={faculty===null?'/profile':'/faculty/profile'} 
                activeClassName='active'>
                    <p className='nav-link'>Profile</p>
                </NavLink>
                <NavLink exact className="nav-item" 
                to={faculty===null?'/course':'/faculty/course'}
                activeClassName='active'>
                    <p className='nav-link'>My Courses</p>
                </NavLink>
                <li className="nav-item">
                    <a className="nav-link" href="/" onClick={e=>{
                        e.preventDefault()
                        logout()
                        return history.push('/login')
                    }}>Logout</a>
                </li>
                </ul>
                :null
            }
            </nav>
    )
}

const mapDispatch = dispatch =>{
    return {
        setSocket:payload=>dispatch(setSocket(payload)),
        logout:()=>dispatch(logout()),
        setLoading:payload=>dispatch(setLoading(payload))
    }
}
export default connect(state=>{return {...state}},mapDispatch)(withRouter(Nav))
