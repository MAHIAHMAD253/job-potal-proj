import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    singleCompany: null,
    companies:[],
    filterCompanyText:""
  },
  reducers: {
    setSingleCompany: (state, action) => {
      state.singleCompany = action.payload;
    },
    setCompanies: (state, action) => {
        state.companies = action.payload;
      },
      setFilterCompanyText:(state,action)=>{
        state.filterCompanyText = action.payload
      }
  },
});
export const { setSingleCompany,setCompanies,setFilterCompanyText } = companySlice.actions;
export default companySlice.reducer;
