// import { Edit2, MoreHorizontal } from "lucide-react";
// import { Avatar, AvatarImage } from "../ui/avatar";
// import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../ui/table";
// import { useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const CompaniesTable = () => {
//   const {companies, filterCompanyText } = useSelector(store => store.company);
//   const [filterCompany,setFilterCompany] =useState(companies);
//   const navigate = useNavigate();

//   useEffect(()=>{
//     const filteredCompany = companies.length > 0 && companies.filter((company)=>{
//       if(!filterCompanyText){
//         return true
//       }
//       return company?.name?.toLowerCase().includes(filterCompanyText.toLowerCase())
//     })
//     setFilterCompany(filteredCompany)
//   },[companies,filterCompanyText])

//   return (
//     <div>
//       <Table>
//         <TableCaption>A list of your recents project company</TableCaption>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Logo</TableHead>
//             <TableHead>Name</TableHead>
//             <TableHead>Date</TableHead>
//             <TableHead className="text-right">Action</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
     
//            {
//               filterCompany?.map((company)=>(
//               <>
//                 <tr>
                        
//                   <TableCell>
//                 <Avatar>
//                   <AvatarImage src={company.logo} />
//                 </Avatar>
//               </TableCell>
//               <TableCell>{company.name}</TableCell>
//               <TableCell>{company.createdAt.split("T")[0]}</TableCell>
//               <TableCell className="text-right cursor-pointer">
//                 <Popover>
//                   <PopoverTrigger>
//                     <MoreHorizontal />
//                   </PopoverTrigger>
//                   <PopoverContent className="w-32">
//                     <div onClick={()=>navigate(`/admin/companies/${company._id}`)} className="flex items-center gap-2 w-fit cursor-pointer">
//                       <Edit2 className="w-4" />
//                       <span>Edit</span>
//                     </div>
//                   </PopoverContent>
//                 </Popover>
//               </TableCell>
             

//                 </tr>
              
//                 </>
//               ))
//             }
        
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default CompaniesTable;

// // import { Edit2, MoreHorizontal } from "lucide-react";
// // import { Avatar, AvatarImage } from "../ui/avatar";
// // import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
// // import {
// //   Table,
// //   TableBody,
// //   TableCaption,
// //   TableCell,
// //   TableHead,
// //   TableHeader,
// //   TableRow,
// // } from "../ui/table";
// // import { useSelector } from "react-redux";
// // import { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";

// // const CompaniesTable = () => {
// //   const { companies , filterCompanyText } = useSelector(store => store.company); // Default to an empty array
// //   const [filterCompany, setFilterCompany] = useState(companies);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     // Filter companies based on the filterCompanyText
// //     const filteredCompany = companies.filter((company) => {
// //       if (!filterCompanyText) {
// //         return true; // Show all companies if no filter text is provided
// //       }
// //       return company.name.toLowerCase().includes(filterCompanyText.toLowerCase());
// //     });
// //     setFilterCompany(filteredCompany);
// //   }, [companies, filterCompanyText]);

// //   return (
// //     <div>
// //       <Table>
// //         <TableCaption>A list of your recent project companies</TableCaption>
// //         <TableHeader>
// //           <TableRow>
// //             <TableHead>Logo</TableHead>
// //             <TableHead>Name</TableHead>
// //             <TableHead>Date</TableHead>
// //             <TableHead className="text-right">Action</TableHead>
// //           </TableRow>
// //         </TableHeader>
// //         <TableBody>
// //           {filterCompany.length > 0 ? ( 
// //             filterCompany.map((company) => (
// //               <TableRow key={company._id}> 
// //                 <TableCell>
// //                   <Avatar>
// //                     <AvatarImage src={company.logo} />
// //                   </Avatar>
// //                 </TableCell>
// //                 <TableCell>{company.name}</TableCell>
// //                 <TableCell>{company.createdAt.split("T")[0]}</TableCell>
// //                 <TableCell className="text-right cursor-pointer">
// //                   <Popover>
// //                     <PopoverTrigger>
// //                       <MoreHorizontal />
// //                     </PopoverTrigger>
// //                     <PopoverContent className="w-32">
// //                       <div onClick={() => navigate(`/admin/companies/${company._id}`)} className="flex items-center gap-2 w-fit cursor-pointer">
// //                         <Edit2 className="w-4" />
// //                         <span>Edit</span>
// //                       </div>
// //                     </PopoverContent>
// //                   </Popover>
// //                 </TableCell>
// //               </TableRow>
// //             ))
// //           ) : (
// //             <TableRow>
// //               <TableCell colSpan={4} className="text-center">No companies found</TableCell>
// //             </TableRow>
// //           )}
// //         </TableBody>
// //       </Table>
// //     </div>
// //   );
// // };

// // export default CompaniesTable;


import { Edit2, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
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

const CompaniesTable = () => {
  const { companies, filterCompanyText } = useSelector((store) => store.company);
  const [filterCompany, setFilterCompany] = useState(companies);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany = companies.filter((company) => {
      if (!filterCompanyText) {
        return true;
      }
      return company?.name?.toLowerCase().includes(filterCompanyText.toLowerCase());
    });
    setFilterCompany(filteredCompany);
  }, [companies, filterCompanyText]);

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent project companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filterCompany.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No companies found
              </TableCell>
            </TableRow>
          ) : (
            filterCompany.map((company) => (
              <TableRow key={company._id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage src={company.logo} />
                  </Avatar>
                </TableCell>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div
                        onClick={() => navigate(`/admin/companies/${company._id}`)}
                        className="flex items-center gap-2 w-fit cursor-pointer"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;
