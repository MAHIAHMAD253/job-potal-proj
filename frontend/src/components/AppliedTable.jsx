import { useSelector } from "react-redux";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const AppliedTable = () => {
  const { allAppliedJob} = useSelector((store) => store.job); 

  return (
    <div>
      <Table>
        <TableCaption>A List of Applied Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead> {/* Fixed Header Title */}
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            allAppliedJob?.length < 0 ? <span>you have dont applied job</span>  :   allAppliedJob?.map((appliedJob) => (
              <TableRow key={appliedJob?._id}>
                <TableCell>{appliedJob.createdAt.split("T")[0]}</TableCell> {/* Replace with actual date */}
                <TableCell>{appliedJob?.job?.title}</TableCell>
                <TableCell>{appliedJob?.job?.company?.name}</TableCell>
                <TableCell className="text-right">
                  <Badge className="bg-black text-white">{appliedJob.status}</Badge>
                </TableCell>
              </TableRow>
            ))
          }
          
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedTable;
