
import axios from "axios";
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { APPLICATION_API_END_POINT} from "../../utils/constant"
import { setAllAplliedJob } from "@/redux/jobSlice";


const useGetAppliedJob =  () => {
    const disPatch = useDispatch();

    useEffect(()=>{
        const fetchGetAppliedJob = async ()=>{
            try {
                const res = await axios.get (`${APPLICATION_API_END_POINT}/get`,{withCredentials:true});
                if(res.data.success){
                    disPatch(setAllAplliedJob(res.data.application))
                }
            } catch (error) {
                console.log(error)
                
            }
        }
        fetchGetAppliedJob();

    },[])
}

export default useGetAppliedJob
