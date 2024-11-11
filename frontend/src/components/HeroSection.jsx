import { Search } from "lucide-react"
import { Button } from "./ui/button"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { setSearchedQuery } from "@/redux/jobSlice"
import { useNavigate } from "react-router-dom"

const HeroSection = () => {

const [query, setQuery] = useState('')
const dispatch = useDispatch();
const navigate = useNavigate();


const searchJobHandler =  ()=>{
  dispatch(setSearchedQuery(query))
  navigate('/browse')
}

  return (
    <div className="text-center">
        <div className="flex flex-col gap-5 my-10" >
        <span className=" mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83003] font-bold">No 1 Job Hunt job</span>
        <h1 className="text-5xl font-bold">Search , Apply & <br/>Get your<span className="text-[#6A38C2]"> Dream Job</span> </h1>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae eveniet velit odio quam consectetur reprehenderit laboriosam! </p>
        <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center mx-auto ">
            <input 
            type='text'
            placeholder="find your job"
            onChange={(e)=>setQuery(e.target.value)}
            className="outline-none border-none w-full mx-3 my-4"
            />
            <Button  onClick={searchJobHandler}  className="rounded-full bg-[#6A38C2] text-white mr-3">
                <Search className="h-5 w-5"/>
            </Button>
        </div>
        </div>


    
    </div>
  )
}

export default HeroSection
