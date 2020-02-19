import { LOGIN, LOGOUT } from './userActions';

const initialState = {
    email: "",
    password: "",
    id: 0,
    token: "",
    isAuthenticated: false
}

const user = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN: {
            return {
                email: action.payload.email,
                id: action.payload.id,
                isAuthenticated: true
            }
        }
        case LOGOUT: {
            return initialState
        }
        default: {
            return state
        }
    }
}

export default user;