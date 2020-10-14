import React, { useState, useEffect } from 'react'
import {withRouter} from 'react-router-dom'
import Section from './Section'
import { connect } from 'react-redux'
import { setLoading } from '../../redux/action/action'

function Profile({socket,history,setLoading,loading}) {
    const token = localStorage.getItem('token')
    if(token===null)history.push('/login')
    const [state,setState] = useState({
        name:'name',
        email:'',
        phone:'',
        gender:'',
        about:'',
        city:"",
        country:'',
        company:'',
        school:'',
        hometown:'',
        profilePic:'',
        lang:'',

        hometownd:true,
        companyd:true,
        langd:true,
        named:true,
        emaild:true,
        phoned:true,
        genderd:true,
        aboutd:true,
        cityd:true,
        countryd:true,
        schoold:true,
        profilePicd:true,
    })

    useEffect(()=>{
        
        if(socket!==null){
            setLoading(true)
            socket.emit('getprofile',{token})

            socket.on('profileupdate',data=>{
                setLoading(false)
                if(data.status==='ok'){
                    socket.emit('getprofile',{token})}
            })

            socket.on('updateprofilepic',data=>{
                setLoading(false)
                if(data.status==='ok'){
                    socket.emit('getprofile',{token})
                }
            })

            socket.on('getprofile',data=>{
                setLoading(false)
                if(data.status==='ok'){
                    let u = data.data
                    console.log(u.profilePic)
                    return setState({...state,
                        name:u.name,
                        email:u.email,
                        phone:u.phone,
                        city:u.city,
                        country:u.country,
                        lang:u.lang,
                        school:u.school,
                        gender:u.gender,
                        about:u.about,
                        hometown:u.hometown,
                        company:u.company,
                        profilePic:u.profilePic,
                    })
                }
            })
        }

        
    },[socket])

    const updateProfilePic = e =>{
        setLoading(true)
        const file = e.target.files[0]
        socket.emit('updateprofilepic',{token,file:{
            type:file.type,
            name:file.name,
            file
        }})
    }

    const updateSave = () =>{
        setLoading(true)
        socket.emit('profileupdate',{
            
            data:{
                name:state.name,
                email:state.email,
                phone:state.phone,
                gender:state.gender,
                about:state.about,
                city:state.city,
                country:state.country,
                company:state.company,
                school:state.school,
                hometown:state.hometown,
                lang:state.lang
            },token
        })
        setState({...state,loader:true,named:true,emaild:true,phoned:true,
            genderd:true,aboutd:true,cityd:true,countryd:true,
            companyd:true,schoold:true,hometownd:true,langd:true})
    }
    return (
        <div>
            <h3 className='text-center'>Profile</h3>
            <div className='col-11 text-center col-md-8 m-auto p-0'>
                {
                    state.profilePic===''?
                    <img src="https://www.w3schools.com/bootstrap4/img_avatar3.png" 
                    className='p-0 rounded-circle col-4 m-auto mb-3' alt="profilePic"/>:
                    <img src={state.profilePic} 
                    className='p-0 rounded-circle col-4 m-auto mb-3' alt="profilePic"/>
                }

                <br/>
                <button className='btn btn-outline-dark mb-4' onClick={()=>{
                    document.querySelector("#file").click()
                }}>Change</button>
                <input type="file" 
                name="profilePic" 
                id='file'
                accept="image/*"
                className='d-none'
                onChange={updateProfilePic} />
                <Section 
                label='Name'
                disable={state.named}
                value={state.name}
                onChange={e=>setState({...state,name:e.target.value})}
                edit={()=>setState({...state,named:false})}
                save={updateSave}
                 />
                <Section 
                label='Email'
                disable={state.emaild}
                value={state.email}
                onChange={e=>setState({...state,email:e.target.value})}
                edit={()=>setState({...state,emaild:false})}
                save={updateSave}
                 />
                <Section 
                label='Phone'
                disable={state.phoned}
                value={state.phone}
                onChange={e=>setState({...state,phone:e.target.value})}
                edit={()=>setState({...state,phoned:false})}
                save={updateSave}
                 />
                <Section 
                label='City'
                disable={state.cityd}
                value={state.city}
                onChange={e=>setState({...state,city:e.target.value})}
                edit={()=>setState({...state,cityd:false})}
                save={updateSave}
                 />
                <Section 
                label='Country'
                disable={state.countryd}
                value={state.country}
                onChange={e=>setState({...state,country:e.target.value})}
                edit={()=>setState({...state,countryd:false})}
                save={updateSave}
                 />
                <Section 
                label='School'
                disable={state.schoold}
                value={state.school}
                onChange={e=>setState({...state,school:e.target.value})}
                edit={()=>setState({...state,schoold:false})}
                save={updateSave}
                 />
                <Section 
                label='Company'
                disable={state.companyd}
                value={state.company}
                onChange={e=>setState({...state,company:e.target.value})}
                edit={()=>setState({...state,companyd:false})}
                save={updateSave}
                 />
                <Section 
                label='Hometown'
                disable={state.hometownd}
                value={state.hometown}
                onChange={e=>setState({...state,hometown:e.target.value})}
                edit={()=>setState({...state,hometownd:false})}
                save={updateSave}
                 />
                <Section 
                label='Gender'
                disable={state.genderd}
                value={state.gender}
                onChange={e=>setState({...state,gender:e.target.value})}
                edit={()=>setState({...state,genderd:false})}
                save={updateSave}
                 />
                <Section 
                label='About'
                disable={state.aboutd}
                value={state.about}
                onChange={e=>setState({...state,about:e.target.value})}
                edit={()=>setState({...state,aboutd:false})}
                save={updateSave}
                 />
                <Section 
                label='Language'
                disable={state.langd}
                value={state.lang}
                onChange={e=>setState({...state,lang:e.target.value})}
                edit={()=>setState({...state,langd:false})}
                save={updateSave}
                 />
            </div>
        </div>
    )
}
const mapDispatch = dispatch =>{
    return {
        setLoading:payload=>dispatch(setLoading(payload))
    }
}
export default connect(state=>{return {...state}},mapDispatch)(withRouter(Profile))
