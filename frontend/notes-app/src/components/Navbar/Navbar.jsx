import React, { useState } from "react";
import Profileinfo from "../../components/Cards/Profileinfo";
import { useNavigate } from "react-router-dom";
import Searchbar from "../../components/Searchbar/Searchbar";
const Navbar = () => {
  const [searchquery, setSearchquery] = useState("");
  const navigate = useNavigate;
  const onlogout = () => {
    navigate("/login");
  };

  const handlesearch = () => {};
  const onclearsearch = () => {
    setSearchquery("");
  };

  return (
    <div className="flex items-center justify-between drop-shadow px-6 py-2 bg-slate-50">
      <h2 className="text-xl font-medium text-black py-2">Notes</h2>
      <Searchbar
        value={searchquery}
        onchange={(e) => {
          setSearchquery(e.target.value);
        }}
        handlesearch={handlesearch}
        onclearsearch={onclearsearch}
      />
      <Profileinfo onLogout={onlogout} />
    </div>
  );
};

export default Navbar;
