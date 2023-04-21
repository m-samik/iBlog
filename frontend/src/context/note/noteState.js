import NoteContext from "./noteContext";
import { useContext } from "react";
import React from 'react'
import AuthContext from "../auth/authContext";

const NoteState = (props) => {
  const host = process.env.REACT_APP_BACKEND;
  const { auth } = useContext(AuthContext);

  // Get all Notes
  const getAllNotes = async () => {
    const response = await fetch(`${host}/api/v1/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 401) {
      throw new Error("Unauthorized");
    } else if (response.status === 404) {
      throw new Error("Not Found");
    } else if (response.status === 500) {
      throw new Error("Internal Server Error");
    }
    const json = await response.json();
    return json;
  };

  // Add a Note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/v1/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authtoken: auth,
      },
      body: JSON.stringify({ title, description, tag }),
    });
    if (response.status === 401) {
      throw new Error("Unauthorized");
    } else if (response.status === 404) {
      throw new Error("Not Found");
    } else if (response.status === 500) {
      throw new Error("Internal Server Error");
    }
    const json = await response.json();
    return json;
  };

  // Delete a Note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/v1/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authtoken: auth,
      },
    });
    if (response.status === 401) {
      throw new Error("Unauthorized");
    } else if (response.status === 404) {
      throw new Error("Not Found");
    } else if (response.status === 500) {
      throw new Error("Internal Server Error");
    }
    const json = await response.json();
    return json;
  };

  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    const response = await fetch(`${host}/api/v1/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authtoken: auth,
      },
      body: JSON.stringify({ title, description, tag }),
    });
    if (response.status === 401) {
      throw new Error("Unauthorized");
    } else if (response.status === 404) {
      throw new Error("Not Found");
    } else if (response.status === 500) {
      throw new Error("Internal Server Error");
    }
    const json = await response.json();
    return json;
  };

  return (
    <NoteContext.Provider
      value={{ addNote, deleteNote, editNote, getAllNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
