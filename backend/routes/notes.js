const express = require('express');
const { getAllNotes, addNote, updateNote, deleteNote } = require('../controllers/noteController');
const fetchUser = require('../middleware/fetchUser');
const router = express.Router();
// routes
router.get(('/notes'), fetchUser, getAllNotes);
router.post(('/addnote'), fetchUser, addNote);
router.put(('/updatenote/:id'), fetchUser, updateNote);
router.delete(('/deletenote/:id'), fetchUser, deleteNote);

module.exports = router;