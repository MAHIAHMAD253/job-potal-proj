import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import CompaniesTable from "./CompaniesTable";
import useGetAllCompany from "../../hooks/getAllCompany";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setFilterCompanyText } from "../../redux/companySlice";

const Companies = () => {
  useGetAllCompany();
  const navigate = useNavigate();

  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setFilterCompanyText(input));
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
            onClick={() => navigate("/admin/companies/create")}
            className="bg-black text-white"
          >
            New Company
          </Button>
        </div>

        <CompaniesTable />
      </div>
    </div>
  );
};

export default Companies;
