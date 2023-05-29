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
      <span class="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-secondary">
        {note.tag}
      </span>
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <div className="icons">
            <i className="fa-solid fa-pen-to-square m-2" onClick={()=>{updateNote(note)}}></i>
            <i className="fa-solid fa-trash m-2" onClick={()=>{deleteNote(note._id); props.showAlert("Deleted successfully!", "success");}}></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteItem;
