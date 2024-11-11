
import axios from "axios";
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { COMPANY_API_END_POINT } from "../../utils/constant"
import { setSingleCompany } from "@/redux/companySlice";

const useGetCompanyById =  (companyId) => {
    const disPatch = useDispatch();

    useEffect(()=>{
        const fetchCompanyId = async ()=>{
            try {
                const res = await axios.get (`${COMPANY_API_END_POINT}/getcompany`,{withCredentials:true});
                if(res.data.success){
                    disPatch(setSingleCompany(res.data.company))
                }
            } catch (error) {
                console.log(error)
                
            }
        }
        fetchCompanyId();

    },[companyId, disPatch])
}

export default useGetCompanyById
