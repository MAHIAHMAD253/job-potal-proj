import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { IoCloseSharp } from "react-icons/io5";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const UpDateProfileDialog = ({ open, setOpen }) => {
  // Function to close the dialog
  const handleClose = () => {
    setOpen(false);
  };
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);

  const disPatch = useDispatch();
  const [input, setInput] = useState({
    fullname: user?.fullname,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    bio: user?.profile?.bio,
    skills: user?.profile.skills?.map((e) => e),
    file: user?.profile?.resume,
  });

  const changeHandle =(e) =>{
    setInput({...input, [e.target.name]: e.target.value});
  }

  const SubmitHandle = async (e) =>{
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("fullname",input.fullname)
    formdata.append("email",input.email)
    formdata.append("phoneNumber",input.phoneNumber)
    formdata.append("bio",input.bio)
    formdata.append("skills",input.skills)
    if(input.file){
      formdata.append("file",input.file)
    }
setLoading(true)
    try {
      const res = await axios.post(`${USER_API_END_POINT}/update`,formdata,{
        headers:{
          'Content-Type':'multipart/form-data'
        },
        withCredentials:true
      })
      if(res.data.success){
        disPatch(setUser(res.data.user))
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
    finally{
      setLoading(false)
    }
    setOpen(false)


  }

  const fileHandler =(e) =>{
    const file = e.target.files?.[0]
    setInput({...input,file})
  }



  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent className="bg-white sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>

          <form onSubmit={SubmitHandle}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right" htmlFor="name">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="name"
                  value={input.fullname}
                  onChange={changeHandle}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right" htmlFor="email">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={input.email}
                  onChange={changeHandle}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right" htmlFor="number">
                  Number
                </Label>
                <Input
                  id="number"
                  name="number"
                  value={input.phoneNumber}
                  onChange={changeHandle}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right" htmlFor="bio">
                  Bio
                </Label>
                <Input
                  id="bio"
                  name="bio"
                  value={input.bio}
                  onChange={changeHandle}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right" htmlFor="skills">
                  Skills
                </Label>
                <Input
                  id="skills"
                  name="skills"
                  value={input.skills}
                  onChange={changeHandle}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right" htmlFor="resume">
                  Resume
                </Label>
                <Input
                  id="resume"
                  name="resume"
                  type="file"
                  accept="application/pdf"
                  onChange={fileHandler}
                  className="col-span-3"
                />
              </div>
            </div>

            {/* // footer */}

            <DialogFooter>
              {loading ? (
                <Button disabled className="w-full my-4 bg-black text-white">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="w-full my-4 bg-black text-white"
                >
                  Update
                </Button>
              )}
            </DialogFooter>
          </form>

          <button onClick={handleClose} className="mt-4 text-right">
            <IoCloseSharp />
          </button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpDateProfileDialog;
