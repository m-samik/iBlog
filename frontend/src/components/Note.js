import React, { useRef, useContext } from "react";
import AuthContext from "../context/auth/authContext";
import Modal from "./Modal";
import postImage from "../images/react-nodejs.png"

export default function Note(props) {
  const editModelRef = useRef(null);

  const handleToggleModal = () => {
    editModelRef.current.click();
    props.getNotes();
  };

  const { auth } = useContext(AuthContext);

  return (
    <div className="container">
      <div className="card mb-4">
        <div className="card-body">
        <div className="col-md-12">
        <h4 className="card-title py-4">{props.note.title}</h4>
            <img src={postImage} alt={props.note.title} className="card-img" />
          </div>
          <div className="d-flex align-items-center justify-content-between">
           

            {auth && <i className="fa-solid fa-trash" onClick={props.handleOnDelete}></i>}
            {auth && <i
              className="fa-solid fa-edit"
              data-bs-toggle="modal"
              data-bs-target={"#editModal" + props.note._id}
              ref={editModelRef}
            ></i>}
          </div>
          <br></br>
          <p className="card-text">{props.note.description}</p>
          <h6 className="card-subtitle mb-2 text-muted">{props.note.tag}</h6>
        </div>
      </div>
      <Modal
        modalId={"editModal" + props.note._id}
        modalLabel="modalLabel"
        modalTitle="Edit note"
        key={props.note._id}
        note={props.note}
        handleToggleModal={handleToggleModal}
        showAlert={props.showAlert}
      />
    </div>
  );
}
