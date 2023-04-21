import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NoteContext from "../context/note/noteContext";
import AuthContext from "../context/auth/authContext";


export default function About(props) {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const {  addNote, getAllNotes } = useContext(NoteContext);

  const [notes, setNotes] = useState([]);
  const [currNote, setCurrNote] = useState({
    title: "",
    description: "",
    tag: "General",
  });

  const getNotes = async () => {
    try {
      const notes = await getAllNotes();
      setNotes(notes);
    } catch (error) {
      props.showAlert(error.message, "danger");
    }
  };

  const onChange = (e) => {
    setCurrNote({ ...currNote, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    addANote(currNote.title, currNote.description, currNote.tag);
    setCurrNote({
      title: "",
      description: "",
      tag: "General",
    });
  };

  

  const addANote = async (title, description, tag) => {
    try {
      const note = await addNote(title, description, tag);
      if (note) getNotes();
      props.showAlert("Blog Post added successfully", "success");
    } catch (error) {
      props.showAlert(error.message, "danger");
    }
  };

  useEffect(() => {
    if(!auth) {
      navigate("/login");
    } else {
      console.log("Notes: ", notes);
    }
  }, [auth]);

    return (
        <div className="container">
            <div className="container col-md-5">
                <h4 className="text-center">Add Blog</h4>
                <form onSubmit={handleOnSubmit}>
                    <div className="mb-3">
                        <label htmlFor="titleInput" className="form-label">
                            Title
                        </label>
                        <input
                            type="text"
                            value={currNote.title}
                            name="title"
                            onChange={onChange}
                            className="form-control"
                            id="titleInput"
                            placeholder="Enter title"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputDescription" className="form-label">
                            Body
                        </label>
                        <textarea
                            className="form-control"
                            name="description"
                            onChange={onChange}
                            value={currNote.description}
                            id="inputDescription"
                            rows="10"
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
                            <option defaultValue={currNote.tag}>General</option>
                            <option value="Personal">Personal</option>
                            <option value="Public">Public</option>
                            <option value="Emergency">Emergency</option>
                        </select>
                    </div>
                    <div className=" text-center mb-4">
                        <button type="submit" className="btn btn-primary">
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

