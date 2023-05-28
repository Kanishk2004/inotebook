const Note = require("../models/Notes");

exports.addNote = async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    const note = new Note({
      title,
      description,
      tag,
      user: req.user.id,
    });

    await note.save();

    res.status(200).json({
      success: true,
      note,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error!");
  }
};

exports.getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error!");
  }
};

exports.updateNote = async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    // creating new Note object
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    // Finding note to be updated
    let note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).send("Not found!");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Unauthorised request!");
    }

    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );

    res.json({
      success: true,
      note,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error!");
  }
};

exports.deleteNote = async (req, res) => {
  try {
    // Finding note to be deleted
    let note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).send("Not found!");
    }

    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Unauthorised request!");
    }

    note = await Note.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Note deleted successfully!",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error!");
  }
};
