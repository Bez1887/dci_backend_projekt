const Order = require("../models/Order");

const router = require("express").Router();

//CREATE

router.post("/", async (req, res) => {
  const { userId, products, amount, address, status } = req.body;

  try {
    // Erstelle ein neues Bestellungs-Objekt mit den übergebenen Daten
    const newOrder = new Order({
      userId,
      products,
      amount,
      address,
      status,
    });

    // Speichere die Bestellung in der Datenbank
    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder); // 201 steht für "Created"
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET-Anfrage zum Abrufen aller Bestellungen
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// GET-Anfrage zum Abrufen einer einzelnen Bestellung nach ID
router.get("/:orderId", async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) {
      return res.status(404).json({ msg: "Bestellung nicht gefunden" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).send(error.message);
  }
  /*  console.log("ID", orderId); */
});

// DELETE-Anfrage zum Löschen einer Bestellung nach ID
router.delete("/:orderId", async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.orderId);
    if (!deletedOrder) {
      return res.status(404).json({ msg: "Bestellung nicht gefunden" });
    }
    res.status(200).json({ msg: "Bestellung wurde gelöscht" });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
