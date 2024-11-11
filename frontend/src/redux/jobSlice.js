import {createSlice} from "@reduxjs/toolkit";

const jobSlice = createSlice({
    name:"job",
    initialState:{
        allJobs:[],
        singleJob:null,
        allAdminJob:[],
        serachJobFilterText:"",
        allAppliedJob:[],
        searchedQuery:''

    },
    reducers:{
        setAllJobs:(state,action)=>{
            state.allJobs = action.payload;
        },
        setSingleJob:(state,action)=>{
            state.singleJob = action.payload;
        },
        setAdminAllJob:(state,action)=>{
            state.allAdminJob = action.payload
        },
        setSearchJobFilterText:(state,action)=>{
            state.serachJobFilterText = action.payload
        },
        setAllAplliedJob:(state,action)=>{
            state.allAppliedJob = action.payload
        },
        setSearchedQuery:(state,action)=>{
            state.searchedQuery = action.payload
        }
    }
});

export const {setAllJobs, setSingleJob,setAdminAllJob,setSearchJobFilterText, setAllAplliedJob,setSearchedQuery} = jobSlice.actions;
export default jobSlice.reducer;