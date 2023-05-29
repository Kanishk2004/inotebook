import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
  
  const context = useContext(noteContext);
  const { deleteNote } = context;
  
  const { note, updateNote } = props;

  return (
    <>
      <div className="col-md-4">
        <div className="card m-3 p-3">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <div className="icons">
            <i className="fa-solid fa-pen-to-square m-2" onClick={()=>{updateNote(note)}}></i>
            <i className="fa-solid fa-trash m-2" onClick={()=>{deleteNote(note._id)}}></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteItem;
