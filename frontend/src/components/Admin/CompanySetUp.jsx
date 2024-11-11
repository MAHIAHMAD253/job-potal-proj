import { ArrowLeft, Loader2 } from "lucide-react";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import axios from "axios";
import { COMPANY_API_END_POINT } from "../../../utils/constant";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import useGetCompanyById from "../../hooks/useGetCompanyById";

const CompanySetUp = () => {
  const params = useParams();
  useGetCompanyById(params.id)
  
  const navigate = useNavigate();
  const {singleCompany} = useSelector(store =>store.company)
 
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const changeHandle = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandle = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const [loading,setLoading] = useState(false)

  const submitHander = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name",input.name);
    formData.append("description",input.description);
    formData.append("website",input.website);
    formData.append("location",input.location);

    if (input.file) {
      formData.append("file",input.file);
    }

    try {
      setLoading(true)
      const res = await axios.put(
        `${COMPANY_API_END_POINT}/updatecompany/${params.id}`,formData,{
            headers:{
                'Content-Type':'multipart/form-data '
            },
            withCredentials:true
        });

        if(res.data.success){
            toast.success(res.data.message);
            navigate('/admin/companies');
        }
    } catch (error) {
      console.log(error);
    } finally{
      setLoading(false)
    }
  };


  useEffect(() => {
    if (singleCompany) { 
      setInput({
        name: singleCompany.name || "",
        description: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        file: null, // Reset file input to null
      });
    }
  }, [singleCompany]);
  
  return (
    <div>
      <Navbar />
      <div className="max-w-xl mx-auto my-10">
        <form onSubmit={submitHander}>
          <div className="flex items-center gap-5 p-8">
            <Button onClick={()=> navigate("/admin/companies")}
              variant="outline"
              className="flec items-center gap-3 text-gray-500 font-semibold"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl">Company Set-Up</h1>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Company Name</Label>
              <Input
                type="type"
                name="name"
                value={input.name}
                onChange={changeHandle}
              />
            </div>

            <div>
              <Label>Description</Label>
              <Input
                type="type"
                name="description"
                value={input.description}
                onChange={changeHandle}
              />
            </div>

            <div>
              <Label>website</Label>
              <Input
                type="type"
                name="website"
                value={input.website}
                onChange={changeHandle}
              />
            </div>

            <div>
              <Label>Location</Label>
              <Input
                type="type"
                name="location"
                value={input.location}
                onChange={changeHandle}
              />
            </div>

            <div>
              <Label>Logo</Label>
              <Input
                type="file"
                name="image/*"
                value={input.logo}
                onChange={changeFileHandle}
              />
            </div>
          </div>
          {loading ? (
            <Button disabled className="w-full my-4 bg-black text-white">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4 bg-black text-white">
              Update
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};

export default CompanySetUp;
