import { createSlice } from "@reduxjs/toolkit"; // Correct import

const applicationSlice = createSlice({
    name: 'application',
    initialState: {
        applicants: [],
        

    },
    reducers: {
        setAppplicants: (state, action) => {
            state.applicants = action.payload;
        }
        
    }
        
});

export const { setAppplicants } = applicationSlice.actions;
export default applicationSlice.reducer;
