import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    Array: ["lahore", "karachi", "faslabad", "multan"]
  },
  {
    filterType: "Industry",
    Array: ["Frontend developer", "Backend developer", "Full stack developer"]
  },
  {
    filterType: "Salary",
    Array: ["0-40k", "45k-1 lak", "1Lak-1.5Lak"]
  }
];

const FilterCard = () => {

  const [selectedValue , setSelectedValue] = useState('')
  const dispatch = useDispatch()

  const changeHandler =(value)=>{
    setSelectedValue(value)
  }

  useEffect(()=>{
    dispatch(setSearchedQuery(selectedValue))
  },[selectedValue])




  return (
    <div className="w-full bg-white p-3 rounded-full">
      <h1>Filter Jobs</h1>
      <hr className="mt-3" />
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {
        filterData.map((item, index) => (
          <div key={index}>
            <h1 className="font-bold text-lg">{item.filterType}</h1>

            {
            item.Array.map((value, idx) => {
           
               const itemId = `id${index}-${idx}`
                return (
              <div  className="flex items-center space-x-2 my-2"  key={idx}>
                
                <RadioGroupItem value={value}  id={itemId}/>
                <label htmlFor={itemId}>{value}</label> 
              </div>
              )
            })
            }
          </div>
        ))
        }
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
