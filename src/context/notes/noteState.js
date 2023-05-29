import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const [notes, setNotes] = useState([]);

  // Get all notes
  const getAllNotes = async () => {
    // Api call
    const response = await fetch(`http://localhost:5000/api/v1/notes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    setNotes(json);
  };


  // ADD note
  const addNote = async (title, description, tag) => {
    // Api call
    await fetch(`http://localhost:5000/api/v1/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });


    let note = {
      title: title,
      description: description,
      tag: tag,
    };
    setNotes(notes.concat(note));
  };


  // UPDATE note
  const editNote = async (id, title, description, tag) => {
    // Api call
    const response = await fetch(
      `http://localhost:5000/api/v1/updatenote/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token'),
        },
        body: JSON.stringify({title, description, tag}),
      }
    );
    await response.json();

    let newNotes = JSON.parse(JSON.stringify(notes))

    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag; 
        break; 
      }
    }
    setNotes(newNotes);
  };


  // DELETE note
  const deleteNote = async (id) => {
    // Api call
    const response = await fetch(
      `http://localhost:5000/api/v1/deletenote/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token":localStorage.getItem('token'),
        },
      }
    );
    const json = await response.json();
    console.log(json);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };


  return (
    <NoteContext.Provider
      value={{ notes, addNote, editNote, deleteNote, getAllNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
