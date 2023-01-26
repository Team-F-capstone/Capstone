import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchClientRequests = createAsyncThunk("fetchClientRequest", async(projectId)=>{
    console.log("HIT THE FETCH CLINT REQUEST THUNK")
try{
    const {data} = await axios.get(`/api/requests/${projectId}`)
    return data

}catch(error){
    console.log("ERROR IN FETCH CLIENT REQUESTS THUNK: ", error)
}
})

const clientRequestsSlice= createSlice({
    name: "clientRequests",
    initialState: [],
    reducers: {},
    extraReducers: (builder)=> {
        builder.addCase(fetchClientRequests.fulfilled, (state, action)=>{
            return action.payload
        })
    }
})

export const selectClientRequests = (state)=>{
    return state.clientRequests
}

export default clientRequestsSlice.reducer 