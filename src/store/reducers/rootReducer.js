import authReducer from './authReducer'
import socialReducer from './socialReducer'
import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
    auth: authReducer,
    social: socialReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
})

export default rootReducer