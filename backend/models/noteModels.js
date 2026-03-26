const Note = require("../schema/Note");

const findAll = async () => {
  return await Note.findAll({
    attributes: ["id", "judul", "isi", "createdAt", "updatedAt"],
  });
};

const create = async (data) => {
  return await Note.create(data);
};

const update = async (id, data) => {
  return await Note.update(data, {
    where: { id },
  });
};

const remove = async (id) => {
  return await Note.destroy({
    where: { id },
  });
};

module.exports = { findAll, create, update, remove };