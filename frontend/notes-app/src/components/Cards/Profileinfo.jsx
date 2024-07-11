import React from "react";
// import { getInitials } from "../../utils/helper";

const Profileinfo = ({ onLogout }) => {
  return (
    <div className="flex gap-3 items-center">
      <div className="h-12 w-12 rounded-full flex justify-center items-center bg-slate-800 text-white">
        H
      </div>
      <div>
        <p className="text-sm font-medium">Harsh Raj</p>
        <button
          type="submit"
          className="underline text-primary text-sm"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profileinfo;
