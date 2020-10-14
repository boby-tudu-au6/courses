import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import UserLogin from './UserLogin'
import UserRegister from './UserRegister'
import FacultyLogin from './FacultyLogin'
import FacultyRegister from './FacultyRegister'
function Login({history,socket,...props}) {
    const [state,setState] = useState({
        ustate:"register",
        fstate:'register',
        uname:'',
        umail:'',
        upass:'',
        fname:'',
        fmail:'',
        fpass:''
    })

    return (
        <div>
            <div className='rounded col-11 col-md-8 row ml-auto mr-auto mt-5 shadow'>
                {
                    state.ustate==='register'?
                    <UserRegister socket={socket} state={state} setState={setState} />:
                    <UserLogin socket={socket} state={state} setState={setState} />
                }
                {
                    state.fstate==='register'?
                    <FacultyRegister socket={socket} state={state} setState={setState} />:
                    <FacultyLogin socket={socket} state={state} setState={setState} />
                }
            </div>
        </div>
    )
}

const mapState = state =>{return {...state}}

export default connect(mapState)(withRouter(Login))
