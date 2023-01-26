import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

export const fetchClientRequests = createAsyncThunk('fetchClientRequests',async(id)=>{
    console.log("HI FROM THUNK")
    try{
    const {data} = await axios.get(`/api/requests/${id}`)
    return data
    }catch(error){
        console.log("Error in fetchClient requests")
    }
})



const clientRequestsSlice = createSlice({
    name: 'clientRequests',
    initialState: [],
    reducer: {},
    extraReducers: (builder) =>{
        builder.addCase(fetchClientRequests.fulfilled, (state, action)=>{
            return action.payload
        })
    }
})

export const editAssignFreelancer = createAsyncThunk(
    "editAssignFreelancer",
    async (project) => {
        console.log("PROJECT IN THUNK: ", project.projectId)
      try {
        const { data } = await axios.put(`/api/projects/${project.projectId}`, project);
        return data;
      } catch (err) {
        console.log(err);
      }
    }
  );

export const selectClientRequests = (state)=>{
    return state.clientRequests
}
export default clientRequestsSlice.reducer