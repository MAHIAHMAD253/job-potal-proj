import { useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import axios from "axios";
import { JOB_API_END_POINT } from "../../../utils/constant";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const AdminJobsCreate = () => {

    const navigate = useNavigate();


  const { companies } = useSelector((store) => store.company);
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0 ,
    companyId: "",
  });

  const handlerChanger = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });

  };


  const selectChangeHandler =(value) =>{
    const selectedCompany = companies.find((company)=>company.name.toLowerCase() == value)
    setInput({...input, companyId:selectedCompany._id})
  };


  const submitHandlerEvent = async (e)=>{
    e.preventDefault()


    try {
        const res = await axios.post(`${JOB_API_END_POINT}/post`,input, {
            headers:{
                'Content-Type':'application/json'
            },
            withCredentials:true
        })

        if(res.data.success){
            toast.success(res.data.maessage)
            navigate('/admin/jobs')
        }
    } catch (error) {
        console.log(error)
    }
  } 

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center w-screen my-5">
        <form  onSubmit={submitHandlerEvent}   className="p-8 max-w-7xl border border-gray-200 shadow-lg rounded-md">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                value={input.title}
                onChange={handlerChanger}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>

            <div>
              <Label>Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={handlerChanger}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>

            <div>
              <Label>requirements</Label>
              <Input
                type="text"
                name="requirements"
                value={input.requirements}
                onChange={handlerChanger}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>

            <div>
              <Label>salary</Label>
              <Input
                type="text"
                name="salary"
                value={input.salary}
                onChange={handlerChanger}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>

            <div>
              <Label>location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={handlerChanger}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>

            <div>
              <Label>JobType</Label>
              <Input
                type="text"
                name="jobType"
                value={input.jobType}
                onChange={handlerChanger}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>

            <div>
              <Label>Experience Level</Label>
              <Input
                type="text"
                name="experience"
                value={input.experience}
                onChange={handlerChanger}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>

            <div>
              <Label> position</Label>
              <Input
                type="number"
                name="position"
                value={input.position}
                onChange={handlerChanger}
                className="focus-visible:ring-offset-0 focus-visible:ring-0 my-1"
              />
            </div>
          </div>

          {

            companies.length > 0 && (
                <Select onValueChange={selectChangeHandler}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>

                    {
                        companies.map((company)=>{
                            return(
                                <>
                                <SelectItem value={company?.name?.toLowerCase()}>{company.name}</SelectItem>
                                </>
                            )
                        })
                    }
                  
           
                  </SelectGroup>
                </SelectContent>
              </Select>
            )
          }

         
          <Button className="w-full mt-4 bg-black text-white">
            Post new job
          </Button>
          {
            companies.length == 0 && <p  className="text-red-500 font-bold text-center">Please register the comapny</p>
          }
        </form>
      </div>
    </div>
  );
};

export default AdminJobsCreate;
