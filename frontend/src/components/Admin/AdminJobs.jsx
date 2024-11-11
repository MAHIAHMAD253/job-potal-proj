import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import JobTable from "./JobTable";
import useGetAdminJob from "@/hooks/useGetAdminJobs";
import { setSearchJobFilterText } from "@/redux/jobSlice";

const AdminJobs = () => {

  const navigate = useNavigate();
  useGetAdminJob()
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobFilterText(input));
  }, [input]);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input
            className="w-fit"
            placeholder="Filter by name"
            onChange={(e) => setInput(e.target.value)}
          />
          <Button
            onClick={() => navigate("/admin/jobs/create")}
            className="bg-black text-white"
          >
            New Job
          </Button>
        </div>

 <JobTable/>
      </div>
    </div>
  );
};

export default AdminJobs;
