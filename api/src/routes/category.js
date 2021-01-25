const server = require("express").Router();
const { Category } = require("../db.js");

// -------------------------- Rutas GET -------------------------- //
server.get("/", async (req, res) => {
  try {
    const cat = await Category.findAll();
    res.status(200).json(cat);
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
});
// -------------------------- Rutas POST -------------------------- //
server.post("/", async (req, res) => {
  try {
    const { name, description } = req.body;
    await Category.create({
      name: name,
      description: description,
    });
    res.status(200).send("category was added successfully");
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
});
// -------------------------- Rutas DELETE -------------------------- //
server.delete("/:id", async (req, res) => {
  try {
    let resp = await Category.destroy({ where: { id: req.params.id } });
    if (resp === 0) {
      return res.status(400).json({
        status: "error",
        message: "No matchea el id con ninguna categoria",
      });
    } else {
      res.send(`se elimino la categoria numero: ${req.params.id}`);
    }
  } catch (error) {
    req.status(400).json({
      status: "error",
      message: "Ocurrio un problema al eliminar la categoria, revise sus datos",
    });
  }
});
// -------------------------- Rutas PUT -------------------------- //
server.put("/:id", (req, res) => {
  Category.update(
    {
      name: req.body.name,
      description: req.body.description,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  ).then((result) => {
    res.status(201).send(result);
  });
});

module.exports = server;
