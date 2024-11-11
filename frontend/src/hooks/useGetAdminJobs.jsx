import { setAdminAllJob } from "@/redux/jobSlice";
import axios from "axios";
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { JOB_API_END_POINT } from "../../utils/constant"

const useGetAdminJob =  () => {
    const disPatch = useDispatch();

    useEffect(()=>{
        const fetchAdminJob = async ()=>{
            try {
                const res = await axios.get (`${JOB_API_END_POINT}/get`,{withCredentials:true});
                if(res.data.success){
                    disPatch(setAdminAllJob(res.data.job))
                }
            } catch (error) {
                console.log(error)
                
            }
        }
        fetchAdminJob();

    },[])
}

export default useGetAdminJob
