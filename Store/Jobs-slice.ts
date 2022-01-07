import {createSlice} from "@reduxjs/toolkit";

interface JobsState {
    jobs: {
        id: string
        title: string,
        company: string,
        location: string,
        type: string,
        time: string,
    }[];
}
const initialState:JobsState = {
    jobs: [],

};
const jobSlice = createSlice({
    name: "jobs",
    initialState: initialState,
    reducers:{
        removeJobs: (state, action) => {
            state.jobs = [];
        },
        addJobs: (state, action) => {
            state.jobs.push(...action.payload)
        },
        setJobs: (state, action) => {
            state.jobs = action.payload
        }
    }
})
export const JobActions = jobSlice.actions;
export default jobSlice.reducer;