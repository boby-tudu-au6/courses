export const LOGOUT = 'LOGOUT'
export const SET_SOCKET = 'SET_SOCKET'
export const SET_EVENT = 'SET_EVENT'
export const SET_LOADING = 'SET_LOADING'
export const F_LOGIN = 'F_LOGIN'
export const SET_ALL_COURSE = 'SET_ALL_COURSE'
export const GET_ALL = 'GET_ALL'
export const GET_MINE = 'GET_MINE'


export const getMine = payload => dispatch =>{
    return dispatch({type:GET_MINE,payload})
}

export const getAllfn = payload => dispatch =>{
    return dispatch({type:GET_ALL,payload})
}

export const setSocket = payload => dispatch =>{
    return dispatch({type:SET_SOCKET,payload})
}

export const setEvents = payload => dispatch =>{
    return dispatch({type:SET_EVENT,payload})
}

export const setLoading = payload => dispatch =>{
    return dispatch({type:SET_LOADING,payload})
}

export const logout = () => dispatch =>{
    localStorage.removeItem('token')
    localStorage.removeItem('faculty')
    return dispatch({type:LOGOUT})
}

export const facultyLogin = () => dispatch =>{
    return dispatch({type:F_LOGIN})
}

export const setAllCourse = payload => dispatch =>{
    return dispatch({type:SET_ALL_COURSE,payload})
}