import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

const Taginput = ({ tags, setTags }) => {
  const [inputvalue, setInputvalue] = useState("");
  const handleinputchange = (e) => {
    setInputvalue(e.target.value);
  };

  const addnewtag = () => {
    if (inputvalue.trim() !== "") {
      setTags([...tags, inputvalue.trim()]);
      setInputvalue("");
    }
  };
  const handlekeydown = (e) => {
    if (e.key === "Enter") {
      addnewtag();
    }
  };
  const handleremovetag = (tagtoremove) => {
    setTags(tags.filter((tag) => tag !== tagtoremove));
  };

  return (
    <div>
      {tags?.length > 0 && (
        <div>
          {tags.map((tag, index) => (
            <span key={index} className="">
              #{tag}
              <button
                onClick={() => {
                  handleremovetag(tag);
                }}
              >
                <MdClose />
              </button>
            </span>
          ))}
        </div>
      )}
      <div>
        <input
          type="text"
          onChange={handleinputchange}
          onKeyDown={handlekeydown}
          placeholder="Add Tags"
          className="text-sm bg-transparent"
        />
        <button
          onClick={() => {
            addnewtag();
          }}
        >
          <MdAdd />
        </button>
      </div>
    </div>
  );
};

export default Taginput;
