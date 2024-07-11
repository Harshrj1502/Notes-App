import React from "react";
import { IoSearchSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

const Searchbar = ({ onchange, value, handlesearch, onclearsearch }) => {
  return (
    <div className="flex items-center w-80 rounded-md px-4 bg-slate-100 gap-3">
      <input
        className="w-full text-xs bg-transparent py-[11px] outline-none"
        type="text"
        placeholder="Search Text"
        value={value}
        onChange={onchange}
      />
      {value && (
        <RxCross2
          size={20}
          className="text-slate-500 hover:text-black cursor-pointer"
          onClick={onclearsearch}
        />
      )}
      <IoSearchSharp
        onClick={handlesearch}
        className=" text-slate-500 hover:text-black cursor-pointer"
        size={20}
      />
    </div>
  );
};

export default Searchbar;
