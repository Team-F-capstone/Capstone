import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const fetchClientRequests = createAsyncThunk('fetchClientRequests',async(id)=>{
    console.log("HI FROM THUNK")
    try{
    const {data} = await axios.get(`/api/requests/${id}`)
    return
    }catch(error){
        console.log("Error in fetchClient requests")
    }
})



const clientRequestsSlice = createSlice({
    name: 'clientRequests',
    initialState: [],
    reducer: {},
    
})
