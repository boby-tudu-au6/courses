import { SET_SOCKET, LOGOUT, SET_LOADING, F_LOGIN, SET_ALL_COURSE, GET_ALL, GET_MINE } from "../action/action";

const initState = {
    socket : null,
    profile:null,
    loading:false,
    facultyProfile:null,
    faculty:false,
    allcourse:null,
    mycourse:null,
    getall:null
}
function rootReducer(state=initState,action){
    const {type,payload} = action
    switch (type) {
        case SET_SOCKET:return {...state,socket:payload}
        case F_LOGIN:return {...state,faculty:true}
        case LOGOUT:return {...state,
            profile:null,
            facultyProfile:null,
            allcourse:null,
            faculty:false,
            mycourse:null}
        case SET_LOADING:return {...state,loading:payload}
        case SET_ALL_COURSE:return {...state,allcourse:payload}
        case GET_ALL:return {...state,getall:payload}
        case GET_MINE:return {...state,mycourse:payload}
        default : return state
    }
}

export default rootReducer