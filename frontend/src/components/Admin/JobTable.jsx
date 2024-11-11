
import { Eye, MoreHorizontal } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const JobTable = () => {
  const { allAdminJob , serachJobFilterText } = useSelector(
    (store) => store.job
  );
  const [filterJob, setFilterJob] = useState(allAdminJob);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredJob = allAdminJob.length > 0 && allAdminJob.filter((job) => {
        if (!serachJobFilterText) {
          return true;
        }
        return job?.title?.toLowerCase().includes(serachJobFilterText.toLowerCase());
      });
    setFilterJob(filteredJob);
  }, [allAdminJob, serachJobFilterText]);

  return (
    <div>
      <Table>
        <TableCaption>A list of your recents project company</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Job Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
     {filterJob?.map((job) => (
            <>
              <tr>
                <TableCell>{job?.company?.name}</TableCell>
                <TableCell>{job?.title}</TableCell>
                <TableCell>{job.company.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger >
                      <MoreHorizontal  />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      {/* <div
                        onClick={() => navigate(`/admin/job/${job._id}`)
                        }
                        className="flex items-center gap-2 w-fit cursor-pointer"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div> */}
                      <div  onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className="w-fit flex items-center gap-2 cursor-pointer mt-2">
                        <Eye className="w-4"/> <span>Appliacants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </tr>
            </>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default JobTable;


