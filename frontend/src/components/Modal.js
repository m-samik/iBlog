import React, { useState, useContext } from "react";
import NoteContext from "../context/note/noteContext";

export default function Modal(props) {
  const { editNote } = useContext(NoteContext);

  const documentId = props.note._id;
  const [editCurrNote, setEditCurrNote] = useState({
    title: props.note.title,
    description: props.note.description,
    tag: props.note.tag,
  });

  const onChange = (e) => {
    setEditCurrNote({ ...editCurrNote, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    editANote(editCurrNote.title, editCurrNote.description, editCurrNote.tag);
  };

  const editANote = async (title, description, tag) => {
    try {
      const note = await editNote(documentId, title, description, tag);
      if (note) {
        props.showAlert("Note edited successfully", "success");
        props.handleToggleModal();
      }
    } catch (error) {
      props.showAlert(error.message, "danger");
    }
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <div
        className="modal fade"
        id={props.modalId}
        tabIndex="-1"
        aria-labelledby={props.modalLabel}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {props.modalTitle}
              </h5>
              <h5 className="card-title">{props.note._id}</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="titleInput" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  value={editCurrNote.title}
                  name="title"
                  onChange={onChange}
                  className="form-control"
                  id="titleInput"
                  placeholder="Enter title"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="inputDescription" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  name="description"
                  onChange={onChange}
                  value={editCurrNote.description}
                  id="inputDescription"
                  rows="3"
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="tags" className="form-label">
                  Tag
                </label>
                <select
                  className="form-select"
                  name="tag"
                  id="tags"
                  onChange={onChange}
                >
                  <option defaultValue={editCurrNote.tag}>General</option>
                  <option value="Personal">Personal</option>
                  <option value="Public">Public</option>
                  <option value="Emergency">Emergency</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
