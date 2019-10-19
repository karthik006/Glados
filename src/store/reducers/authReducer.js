const initState = {
    authError: null
}

const authReducer = (state = initState, action) => {
    switch(action.type){
        case 'LOGIN_ERROR':
            return {
                ...state,
                authError: 'Login Failed'
            }
        case 'LOGIN_SUCCESS':
            return {
                ...state, 
                authError: null
            }
        case 'LOGIN_SUCCESS_VER':
            return {
                ...state,
                authError: 'Email not verified'
            }
        case 'SIGNOUT_SUCCESS':
            return state
        case 'SIGNUP_SUCCESS':
            return {
                ...state,
                authError: 'Verification Email sent'
            }
        case 'SIGNUP_ERROR':
            return {
                ...state,
                authError: 'Error signing up'
            }
        default:
            return state;
    }
}

export default authReducer