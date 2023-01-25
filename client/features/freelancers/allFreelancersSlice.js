import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllFreelancers = createAsyncThunk ('allFreelancers', async ()=>{
    try{
        const {data} = await axios.get('/api/freelancers')
        return data
    }catch(error){
        console.log("ERROR IN FETCHALLFRELANCERS THUNK: ", error)
    }

})


const allFreelancersSlice = createSlice({
    name: "allFreelancers",
    initialState: [],
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(fetchAllFreelancers.fulfilled, (state, action)=>{
            return action.payload
        })
    }
})

export const selectAllFreelancers = (state)=>{
    return state.allFreelancers
}

export default allFreelancersSlice.reducer