import { useNavigate } from "react-router-dom";
import { Badge } from "./ui/badge";

const Latestjobcard = ({job}) => {

  const navigate = useNavigate();


  return (
    <div onClick={()=> navigate(`/description/${job._id}`)}  className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer">
      <div>
        <h1 className="font-bold text-xl ">{job?.company?.name}</h1>
        <p className="text-sm text-gray-500">Pakistan</p>
      </div>
      <div>
        <h1 className="font-bold text-xl my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className={"text-blue-700 font-bold"} variant="ghost">{job?.position}</Badge>
        <Badge className={"text-[#F83002] font-bold"} variant="ghost">{job?.jobType}</Badge>
        <Badge className={"text-[#7209b7] font-bold"} variant="ghost">{job?.salary}</Badge>
      </div>
    </div>
  );
};

export default Latestjobcard;
