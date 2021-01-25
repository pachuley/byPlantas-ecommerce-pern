const server = require("express").Router();
const { Product, Category } = require("../db.js");
const Sequelize = require("sequelize");
const { response } = require("../app.js");
const Op = Sequelize.Op;

server.use("/category", require("./category.js"));
// -------------------------- Rutas GET -------------------------- //
server.get("/", async (req, res) => {
  try {
    let products = await Product.findAll({ include: [Category] });
    res.send(products);
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: erros.message,
    });
  }
});
server.get("/search", (req, res) => {
  const product = req.query.query;
  console.log(product);
  Product.findAll({
    where: {
      [Op.or]: [
        {
          nameProduct: {
            [Op.iLike]: `%${product}%`,
          },
        },
        {
          descriptionProduct: {
            [Op.iLike]: `%${product}%`,
          },
        },
      ],
    },
  })
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      return res
        .json({ status: "error", message: "no se encontraron match" })
        .status(400);
    });
});
server.get("/:id", async (req, res) => {
  let id = req.params.id;
  try {
    const produ = await Product.findAll({
      where: { id: id },
    });
    res.json(produ);
  } catch (err) {
    res.status(400).send({
      status: "error",
      message: error.message,
    });
  }
});
server.get("/category/:nombreCat", async function (req, res, next) {
  try {
    const selectCategory = await Category.findOne({
      where: {
        name: { [Sequelize.Op.iLike]: req.params.nombreCat },
      },
    });
    const prod = await Product.findAll({
      include: [
        {
          model: Category,
          where: {
            id: selectCategory.id,
          },
          attributes: ["id", "name"],
        },
      ],
    });
    res.status(200).json({
      data: { count: prod.length, rows: prod },
    });
  } catch (error) {
    return res
      .json({
        status: "success",
        message: error.message,
      })
      .status(400);
  }
});
// -------------------------- Rutas POST -------------------------- //
server.post("/", (req, res) => {
  const addProduct = req.body;
  Product.create({
    nameProduct: addProduct.nameProduct,
    descriptionProduct: addProduct.descriptionProduct,
    priceProduct: addProduct.priceProduct,
    stockProduct: addProduct.stockProduct,
    urlProduct: addProduct.urlProduct,
  }).then((response) => res.status(201).send(response));
});
server.post("/:idProducto/category/setCategories", async (req, res) => {
  try {
    const cat = await Category.findAll({
      where: { id: { [Op.in]: req.body } },
    });
    const prod = await Product.findByPk(req.params.idProducto);
    prod.setCategories(cat);
    res.json({
      status: "success",
      message: "se seteo correctamente la categoria",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
});
server.post("/:idProducto/category/:idCategoria", (req, res) => {
  var cat;
  Category.findByPk(req.params.idCategoria).then((resp) => {
    cat = resp;
  });
  Product.findByPk(req.params.idProducto).then((resp) => {
    resp.addCategory(cat, { through: { selfGranted: false } });
    res.send("Agregado corrects");
  });
});
// -------------------------- Rutas DELETE -------------------------- //
server.delete("/:id", (req, res) => {
  let id = req.params.id;
  Product.destroy({
    where: { id: id },
  })
    .then((result) => {
      if (result) {
        res.redirect(200, "/products");
      } else {
        throw new Error("No se encontro un producto con ede Id");
      }
    })
    .catch((error) => {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    });
});

server.delete("/:idProducto/category/:idCategoria", async (req, res) => {
  try {
    const cat = await Category.findByPk(req.params.idCategoria);
    const product = await Product.findByPk(req.params.idProducto);
    product.removeCategory(cat, { through: { selfGranted: false } });
    if (cat !== null) {
      res.status(200).json({
        status: "success",
        message: "Categoria Eliminada satisfactoriamente",
      });
    } else {
      throw new Error("No coincide con ninguna categoria");
    }
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
});
// -------------------------- Rutas PUT -------------------------- //
server.put("/:id", function (req, res, next) {
  let {
    nameProduct,
    descriptionProduct,
    priceProduct,
    stockProduct,
    urlProduct,
  } = req.body;
  Product.update(
    {
      nameProduct: nameProduct,
      descriptionProduct: descriptionProduct,
      priceProduct: priceProduct,
      stockProduct: stockProduct,
      urlProduct: urlProduct,
    },
    { returning: true, where: { id: req.params.id } }
  )
    .then((response) => {
      res.json(response);
    })
    .catch(next);
});

module.exports = server;
