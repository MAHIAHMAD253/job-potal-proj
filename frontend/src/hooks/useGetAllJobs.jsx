import { setAllJobs } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { JOB_API_END_POINT } from "../../utils/constant"

const useGetAllJobs =  () => {
    const disPatch = useDispatch();
    const { searchedQuery} = useSelector(store => store.job)

    useEffect(()=>{
        const fetchAllJob = async ()=>{
            try {
                const res = await axios.get (`${JOB_API_END_POINT}/get?keyword=${searchedQuery}`,{withCredentials:true});
                if(res.data.success){
                    disPatch(setAllJobs(res.data.job))
                }
            } catch (error) {
                console.log(error)
                
            }
        }
        fetchAllJob();

    },[])
}

export default useGetAllJobs
