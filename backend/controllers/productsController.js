const pool = require("../config/Db/DBConfig"); //*DB
const productSchema = require("../Helpers/products_schema"); //* Product data validation


const ErrorApi = require("../error/ErrorApi");

//TODO: Handle Errors

//* Get all products
const selectProducts = (req, res) => {
  const selectQuery = "SELECT * FROM produits";
  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(selectQuery, (err, result) => {
      res.send({ result });
      connection.destroy();
      if (err) throw err;
    });
  });
};

//* Get one product by id
const selectProduct = async (req, res) => {
  try {
    const validId = await productSchema.regexId.validateAsync(req.params.id);
    const getProductQuery = "SELECT * FROM produits WHERE id = ?";

    pool.getConnection((err, connection) => {
      if (err) res.send(err).status(500);
      connection.query(getProductQuery, validId, (error, result) => {
        if (Object.keys(result).length === 0) res.sendStatus(404);
        else {
          res.send(result).status(200);
        }
        connection.destroy();
      });
    });
  } catch (e) {
    if (e.isJoi === true) res.sendStatus(422);
  }
};

//*Insert one product
//TODO: Subir imagen/es de producto y añadir path en db al guardar el producto
const insertProduct = async (req, res) => {
  try {
    if (req.file) {
      console.log(req.file);
    }
    const validData = await productSchema.insertProduct.validateAsync(req.body);
    const selectUniqueQuery =
      "INSERT INTO produits (name, description, price)  VALUES (?,?,?)";
    pool.getConnection((err, connection) => {
      if (err) res.send(err).status(500);
      else {
        connection.query(
          selectUniqueQuery,
          [validData["name"], validData["description"], validData["price"]],
          (error, result) => {
            if (error) res.send(error).status(500);
            upload(req, res, (err) => {
              if (err) {
                res.sendStatus(500);
              }
              res.send("Producto añadido").status(200);
              connection.destroy();
            });
          }
        );
      }
    });
  } catch (e) {
    if (e.isJoi === true) res.send(e);
  }
};

//*Update one product by Id
const updateProduct = async (req, res) => {
  try {
    const validData = await productSchema.updateProduct.validateAsync(req.body);
    const validId = await productSchema.regexId.validateAsync(req.params.id);
    const updateQuery = "UPDATE produits SET ? WHERE id = ?";
    pool.getConnection((err, connection) => {
      if (err) res.send(err).status(500);
      connection.query(updateQuery, [validData, validId], (error, result) => {
        console.log(result);
        if (result["affectedRows"] === 0) res.sendStatus(404);
        else if (error) res.send(error).status(500);
        else {
          res.sendStatus(200);
          connection.destroy();
        }
      });
    });
  } catch (e) {
    if (e.isJoi === true) res.sendStatus(422);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deleteQuery = "DELETE FROM produits where id = ?";
    const validId = await productSchema.regexId.validateAsync(req.params.id);
    pool.getConnection((err, connection) => {
      if (err) throw err;
      connection.query(deleteQuery, validId, (error, result) => {
        res.sendStatus(200);
        connection.destroy();
        if (error) res.send(error).status(500);
      });
    });
  } catch (e) {
    if (e.isJoi === true) res.sendStatus(422);
  }
};

//*Upload image locally
const uploadImage = (req, res, next) => {
  const { file, body } = req;
  

  console.log(fileName);
};

module.exports = {
  selectProducts,
  selectProduct,
  insertProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
