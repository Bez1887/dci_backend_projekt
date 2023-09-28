const router = require("express").Router();

const Product = require("../models/Product");

router.post("/", async (req, res) => {
  try {
    const { title, description, img, size, categories, color, price } =
      req.body;

    // Überprüfe, ob ein Produkt mit dem angegebenen Titel bereits existiert
    const productExist = await Product.findOne({ title: title });
    if (productExist) {
      return res.status(500).json({ msg: "Produkt existiert bereits" });
    }
    //CREATE
    // Erstelle ein neues Produkt-Objekt
    const newProduct = new Product({
      title,
      description,
      img,
      size,
      categories,
      color,
      price,
    });

    // Speichere das Produkt in der Datenbank
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// GET-Anfrage zum Abrufen aller Produkte
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// GET-Anfrage zum Abrufen eines einzelnen Produkts nach ID
router.get("/:productId", async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) {
      return res.status(404).json({ msg: "Produkt nicht gefunden" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// PUT-Anfrage zum Aktualisieren eines Produkts nach ID
router.put("/:productId", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      req.body,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ msg: "Produkt nicht gefunden" });
    }
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// DELETE-Anfrage zum Löschen eines Produkts nach ID
router.delete("/:productId", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(
      req.params.productId
    );
    if (!deletedProduct) {
      return res.status(404).json({ msg: "Produkt nicht gefunden" });
    }
    res.status(200).json({ msg: "Produkt wurde gelöscht" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
