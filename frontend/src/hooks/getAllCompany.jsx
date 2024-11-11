
import axios from "axios";
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { COMPANY_API_END_POINT } from "../../utils/constant"
import { setCompanies } from "@/redux/companySlice";


const useGetAllCompany =  () => {
    const disPatch = useDispatch();

    useEffect(()=>{
        const fetchgetAllCompany = async ()=>{
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/getcompany`,{withCredentials:true});
                if(res.data.success){
                    disPatch(setCompanies(res.data.company))
                }
            } catch (error) {
                console.log(error)
                
            }
        }
        fetchgetAllCompany();

    },[])
}

export default useGetAllCompany
