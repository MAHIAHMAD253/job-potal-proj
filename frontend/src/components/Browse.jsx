import { useDispatch, useSelector } from "react-redux"
import Job from "./Job"
import Navbar from "./shared/Navbar"
import useGetAllJobs from "@/hooks/useGetAllJobs"
import { useEffect } from "react"
import { setSearchedQuery } from "@/redux/jobSlice"


const Browse = () => {
  const {allJobs} = useSelector(store =>store.job)
  const dispatch = useDispatch();
  useGetAllJobs ();
  useEffect(()=>{
    dispatch(setSearchedQuery(''))
  })
  return (
    <div>
     <Navbar/>
     <div className="max-w-7xl mx-auto my-10">
      <h1 className="font-bold text-xl my-10">Search Results{allJobs.length}</h1>
      <div className="grid grid-cols-3 gap-4 mt-5">
      {
        allJobs.map((job) =>{
          return (
            <Job key={job} job={job}/>
          )
        })
      }
      </div>
     </div>
    </div>
  )
}

export default Browse
