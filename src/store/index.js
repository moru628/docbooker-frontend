import {configureStore} from '@reduxjs/toolkit'
import simpleReducer from './modules/simple'
import authReducer from './modules/authStore'
const store = configureStore({
    reducer:{
        simple: simpleReducer, 
        auth: authReducer,
    }
})

export default store