const server = require("express").Router();
const { Product, Category } = require("../db.js");
const Sequelize = require("sequelize");
const { response } = require("../app.js");
const Op = Sequelize.Op;

server.use("/category", require("./category.js"));
// ---Rutas GET--- //
server.get("/", (req, res, next) => {
  Product.findAll({ include: [Category] })
    .then((products) => res.send(products))
    .catch(next);
});
server.get("/search", (req, res, next) => {
  const product = req.query.query;
  console.log(product)
  Product.findAll({
    where: {
      [Op.or]: [
        {
          name: {
            [Op.iLike]: `%${product}%`,
          },
        },
        {
          description: {
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
      return res.send("no se encontraron match").status(400);
    });
});
// ---Rutas POST--- //
server.post('/', (req, res) =>{
  console.log(req.body)
	const addProduct = req.body;
	Product.create({
		name: addProduct.name,
		description: addProduct.description,
		price: addProduct.price,
		stock: addProduct.stock,
		imgs: addProduct.imgProduct, // Que es imgProduct?
	})
	.then(response=>res.status(201).send(response));
})
server.post('/:idProducto/category/setCategories',(req,res)=>{
	var cat;
	Category.findAll({where:{id:{[Op.in]:req.body}}})
	.then(resp=>{
		cat=resp;
	})
	Product.findByPk(req.params.idProducto)
	.then(resp=>{
		resp.setCategories(cat)
		res.send('se deleteo todo')
	})
})
server.get("/:id", (req, res) => {
  let id = req.params.id;
  Product.findOne({
    where: { id: id },
  }).then(function (result) {
    if (result) {
      res.send(result);
    } else {
      res.send(
        "El registro no concuerda con ninguno dentro de la tabla products"
      );
    }
  });
});
server.get("/category/:nombreCat", function (req, res, next) {
  Category.findOne({
    where: {
      name: { [Sequelize.Op.iLike]: req.params.nombreCat },
    },
  })
    .then(function (categories) {
      if (categories === null) {
        return;
      } else {
        return Product.findAll({
          include: [
            {
              model: Category,
              where: {
                id: categories.id,
              },
              attributes: ["id", "name"],
            },
          ],
        });
      } 
    })
    .then(function (products) {
      if (!products) {
        return res.send("La categoria no matchea").status(404);
      }
      if (products == [] || products == 0) {
        return res
          .send("No se encontraron productos asociados a la categoria")
          .status(204);
      }

      return res
        .status(200)
        .send({ data: { count: products.length, rows: products } });
    })
    .catch((err) => {
      console.log("err");
      return res.send(err).status(500);
    });
});
// ---Rutas POST--- //
server.post("/", (req, res) => {
  const addProduct = req.body;
  Product.create({
    name: addProduct.name,
    description: addProduct.description,
    price: addProduct.price,
    stock: addProduct.stock,
    imgs: addProduct.imgs,
  }).then((response) => res.status(201).send(response));
});
server.post("/:idProducto/category/:idCategoria", (req, res) => {
  var cat;
  Category.findByPk(req.params.idCategoria).then((resp) => {
    cat = resp;
  });
  Product.findByPk(req.params.idProducto).then((resp) => {
    resp.addCategory(cat, { through: { selfGranted: false } });
    res.send("Agregado correctamente");
  });
});
// ---Rutas DELETE--- //
server.delete("/:id", (req, res) => {
  let id = req.params.id;
  Product.destroy({
    where: { id: id },
  }).then((result) => {
    if (result) {
      res.redirect(200, "/products");
    } else {
      res.send(
        "El registro no concuerda con ninguno dentro de la tabla products"
      );
    }
  });
});

server.delete("/:idProducto/category/:idCategoria", (req, res) => {
  var cat;
  Category.findByPk(req.params.idCategoria).then((resp) => {
    cat = resp;
  });
  Product.findByPk(req.params.idProducto).then((resp) => {
    resp.removeCategory(cat, { through: { selfGranted: false } });
    res.send("Categoria Eliminada satisfactoriamente");
  });
});
// ---Rutas PUT--- //
server.put("/:id", function (req, res, next) {
  console.log(req.body)
  let {
    name,
    description,
    price,
    stock,
    /* imgs, */
  } = req.body;
  Product.update(
    {
      name: name,
      description: description,
      price: price,
      stock: stock,
      /* imgs: imgs, */
    },
    { returning: true, where: { id: req.params.id } }
  )
    .then((response) => {
      res.json(response);
    })
    .catch(next);
});

module.exports = server;
