import { Link, useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup } from "../ui/radio-group";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "../../../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { setLoading } from "@/redux/authSlice";

const SignUp = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.auth);



  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);  
    } finally{
      dispatch(setLoading(false))
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5 text-center">SignUp</h1>
          <div className="my-2">
            <Label>Full Name</Label>
            <Input
              className="my-3"
              type="text"
              placeholder="ahmad"
              value={input.fullname}
              name="fullname"
              onChange={changeHandler}
            />
          </div>
          <div className="my-2">
            <Label>Email</Label>
            <Input
              className="my-3"
              type="email"
              placeholder="ahmad@gmail.com"
              value={input.email}
              name="email"
              onChange={changeHandler}
            />
          </div>
          <div className="my-2">
            <Label>Phone Number</Label>
            <Input
              className="my-3"
              type="number"
              placeholder="09738 83921"
              value={input.phoneNumber} // Fixed the case
              name="phoneNumber" // Fixed the case
              onChange={changeHandler}
            />
          </div>
          <div className="my-2">
            <Label>Password</Label>
            <Input
              className="my-3"
              type="text"
              placeholder="password"
              value={input.password}
              name="password"
              onChange={changeHandler}
            />
          </div>

          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"} // Compare instead of assign
                  onChange={changeHandler}
                  className="cursor-pointer my-3"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === "recruiter"} // Compare instead of assign
                  onChange={changeHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-4">
              <Label>Profile</Label>
              <Input
                className="cursor-pointer"
                accept="image/*"
                type="file"
                name="file"
                onChange={fileHandler}
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
              Login
            </Button>
          )}


          <span>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600">
              SignUp
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
