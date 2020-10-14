import React,{useEffect,useState} from 'react'

function CourseForm({socket}) {

    const token = localStorage.getItem('token')
    const handleCourseCreate = e =>{
        e.preventDefault()
        const {title,dept,desc,team,waitlist,room} = e.target
        socket.emit('createcourse',{
            data:{title:title.value,
                room:room.value,
                desc:desc.value,
                dept:dept.value,
                team:team.value,
                waitlist:waitlist.value},
                token
        })
        document.querySelector('#close').click()
    }
    return (
        <div>
            <button type="button" className="btn btn-outline-dark" data-toggle="modal" data-target="#myModal">
            Create course
            </button>
            <div className="modal fade" id="myModal">
                <div className="modal-dialog">
                    <div className="modal-content">

                    
                    <div className="modal-header text-center">
                        <h4 className="modal-title text-center">Create Course here</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>

                    
                    <div className="modal-body">
                        <form onSubmit={handleCourseCreate} 
                        className='col-12 p-3'
                        method="post">
                            <input type="text" placeholder='Enter title'
                            name="title" className='form-control mb-2' required={true}/>
                            <input type="text" placeholder='Enter Department'
                            name="dept" className='form-control mb-2' required={true}/>
                            <input type="text" placeholder='Description '
                            name="desc" className='form-control mb-2' required={true}/>
                            <input type="text" placeholder='Enter Room'
                            name="room" className='form-control mb-2' required={true}/>
                            <input type="text" placeholder='Enter waitlist'
                            name="waitlist" className='form-control mb-2' required={true}/>
                            <input type="text" placeholder='Enter team names'
                            name="team" className='form-control mb-2' required={true}/>
                            <button type="submit" className='btn btn-outline-primary'>Create</button>
                        </form>
                        <button id='close' className="d-none btn btn-danger" data-dismiss="modal">Close</button>
                    </div>

                    </div>
                </div>
                </div>
        </div>
    )
}

export default CourseForm
