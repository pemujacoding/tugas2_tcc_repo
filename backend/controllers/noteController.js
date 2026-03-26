const noteModel = require("../models/noteModels");

const getAllNotes = async (req, res) => {
  const notes = await noteModel.findAll();
  res.json(notes);
};

const createNote = async (req, res) => {
  const newNote = await noteModel.create(req.body);
  res.json(newNote);
};

const updateNote = async (req, res) => {
  await noteModel.update(req.params.id, req.body);
  res.json({ message: "Updated" });
};

const deleteNote = async (req, res) => {
  await noteModel.remove(req.params.id);
  res.json({ message: "Deleted" });
};

module.exports = { getAllNotes, createNote, updateNote, deleteNote };