import React, { useContext, useState, useEffect } from "react";
import NoteContext from "../context/note/noteContext";
import Note from "./Note";

export default function Home(props) {
  const { getAllNotes, deleteNote } = useContext(NoteContext);

  const [notes, setNotes] = useState([]);

  const getNotes = async () => {
    try {
      const notes = await getAllNotes();
      setNotes(notes);
    } catch (error) {
      props.showAlert(error.message, "danger");
    }
  };

  const deleteANote = async (id) => {
    try {
      const note = await deleteNote(id);
      if (note) getNotes();
      props.showAlert("Note deleted successfully", "success");
    } catch (error) {
      props.showAlert(error.message, "danger");
    }
  };

  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="text-center mb-5">Our Latest Blogs</h1>
          <div className="card-group">
            {notes.map((note) => {
              return (
                <Note
                  note={note}
                  key={note._id}
                  handleOnDelete={() => deleteANote(note._id)}
                  showAlert={props.showAlert}
                  getNotes={getNotes}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
