import { Contact, Mail, Pen } from "lucide-react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedTable from "./AppliedTable";
import { useState } from "react";
import UpDateProfileDialog from "./UpDateProfileDialog";
import { useSelector } from "react-redux";
import useGetAppliedJob from "@/hooks/useGetAppliedJob";



const Profile = () => {
  useGetAppliedJob()
  const { user } = useSelector((store) => store.auth);
  const [open, setOpen] = useState(false);
  const isResume = true;

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-gray-200 p-8 my-5">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsDcwXQ2w9u4FMlEf_MMgtV0UGOblUKItSPQ&s" />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="text-right"
            variant="outline"
          >
            <Pen />
          </Button>
        </div>

        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail /> <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact /> <span>{user?.phoneNumber}</span>
          </div>
        </div>

        <div className="my-5">
          <h1>Skills</h1>
          <div className="flex items-center gap-3">
            {user?.profile?.skills.length > 0 ? (
              user?.profile?.skills.map((item, index) => (
                <Badge className="bg-black text-white" key={index}>
                  {item}
                </Badge>
              ))
            ) : (
              <span>Not found</span>
            )}
          </div>
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label className="text-md font-bold mt-5">Resume</Label>
          {isResume ? (
            <a
              target="_blank"
              href={user?.profile?.resume}
              className="text-blue-500 w-full hover:underline cursor-pointer"
            >
            {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span>Not found</span>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="font-bold text-xl my-5">Applied Jobs</h1>
        <AppliedTable />
      </div>

      <UpDateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;

