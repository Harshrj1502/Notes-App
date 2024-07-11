import React, { useState } from "react";
import Taginput from "../../components/Input/Taginput";
import { MdClose } from "react-icons/md";
const Addeditnotes = ({ onClose, type, notedata }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [error, setError] = useState(null);

  //  const addnewnote=async()=>{}
  //  const editnote=async()=>{}
  const handleaddnote = () => {
    if (!title) {
      setError("enter");
      return;
    }
    setError("");
    // if(type==="edit"){
    //   editnote();
    // }
    // else{
    //   addnewnote();
    // }
  };

  return (
    <div className="p-2">
      <button onClick={onClose}>
        <MdClose />
      </button>
      <div className="flex flex-col gap-2 mt-2">
        <label htmlFor="" className="input-label">
          TITLE
        </label>
        <input
          type="text"
          className="text-2xl text-slate-950 outline-none bg-slate-50 rounded-md p-2"
          placeholder="kuygjhb"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-col gap-2 mt-5">
        <label htmlFor="" className="input-label">
          CONTENT
        </label>
        <textarea
          type="text"
          className="text-2xl text-slate-950 outline-none p-2 rounded-md bg-slate-50"
          placeholder="kuygjhb"
          rows={8}
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
      </div>
      <div className="mt-3">
        <label htmlFor="" className="input-label">
          TAGS
        </label>
        <Taginput tags={tags} setTags={setTags} />
      </div>
      {error && <p className="">{error}</p>}
      <div>
        <button
          className="bg-slate-600 w-full mt-4 h-10 text-white rounded-md"
          onClick={handleaddnote}
        >
          ADD
        </button>
      </div>
    </div>
  );
};

export default Addeditnotes;
