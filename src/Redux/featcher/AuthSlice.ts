import { createSlice } from "@reduxjs/toolkit"

const initialState={
    loggedInUser:null,
    isLoading:true
}

const AuthSlice=createSlice({
    name:"Authentication",
    initialState,
    reducers:{
        setUser:(state,action)=>{
            console.log("user is setting",action.payload,"from auth slice.")
            state.loggedInUser=action.payload
            state.isLoading=false
        },
        removeUser:(state)=>{
            state.loggedInUser=null
        },
        setLoading:(state,action)=>{
            state.isLoading=action.payload
        }
    }
})


export const{removeUser,setLoading,setUser}=AuthSlice.actions
const authReducer=AuthSlice.reducer
export default authReducer