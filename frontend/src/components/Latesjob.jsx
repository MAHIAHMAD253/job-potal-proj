import { useSelector } from "react-redux";
import Latestjobcard from "./Latestjobcard";


// const randomNum = [1,2,3,4,5,6,7,8];



const Latesjob = () => {


  const {allJobs} = useSelector(store=>store.job);
  return (
    <div className="max-w-7xl mx-auto my-20"> 
      <h1 className="text-4xl font-bold"><span className="text-[#6A38C2]">Latest & Top</span> Job Opening</h1>
      <div className="grid grid-cols-3 gap-4 my-5">
      {
      
      allJobs.length < 0 ? <span>Not Avaible</span> : allJobs.map((job) => ( <Latestjobcard  key={job._id} job={job} />
        ))
        
        }
      </div>
     
    </div>
  )
}

export default Latesjob
