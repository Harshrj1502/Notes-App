import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Notecard from "../../components/Cards/Notecard";
import { IoAdd } from "react-icons/io5";
import Addeditnotes from "./Addeditnotes";
import Modal from "react-modal";

const Home = () => {
  // show and hide some parts
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  console.log(openAddEditModal);
  return (
    <>
      <Navbar />
      <div className="">
        <div className="mx-auto max-w-[50vw] my-5 ">
          <Notecard
            title="harsh is good boy"
            date="15 february"
            content="loremipsum haisbdwkebkjbcejrhdw,djn"
            tags="#lorem"
            isPinned={true}
            onEdit={() => {}}
            onDelete={() => {}}
            onPinNote={() => {}}
          />
        </div>
      </div>

      <button
        className="flex rounded-full w-12 h-12 bg-primary text-white items-center justify-center absolute right-10 bottom-10"
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null });
        }}
      >
        <IoAdd size={25} />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contenLabel=""
        className="w-[40%] h-[70%] mx-auto overflow-scroll bg-white rounded-md p-5 mt-20"
      >
        <Addeditnotes
          type={openAddEditModal.type}
          notedata={openAddEditModal.data}
          onClose={() => {
            setOpenAddEditModal({ isShown: false, type: "add", data: null });
          }}
        />
      </Modal>
    </>
  );
};

export default Home;
