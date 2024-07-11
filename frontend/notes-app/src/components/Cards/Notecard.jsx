import React from "react";
import { IoMdCreate } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FaMapPin } from "react-icons/fa";
const Notecard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <div className="border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out">
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-sm font-medium">{title}</h6>
          <span className="text-xs text-slate-500">{date}</span>
        </div>
        <FaMapPin
        // onClick={ `icon-btn ${isPinned? "text-primary":"text-white"}`}
        />
      </div>

      <p className="text-xs text-slate-600 mt-2">{content?.slice(0, 60)}</p>
      <div>
        <div className="text-xs text-slate-500">{tags}</div>
        <div className="flex justify-end gap-5">
          <IoMdCreate
            onClick={onEdit}
            className="icon-btn hover:text-red-700"
            size={20}
          />
          <MdDelete
            onClick={onDelete}
            className="icon-btn hover:text-red-700"
            size={20}
          />
        </div>
      </div>
    </div>
  );
};

export default Notecard;
