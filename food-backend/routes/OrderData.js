const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");

router.post("/orderData", async (req, res) => {
  let data = req.body.order_data;
  await data.splice(0, 0, { order_date: req.body.order_date });
  let eId = await Order.findOne({ email: req.body.email });
  console.log(eId);
  if (eId === null) {
    try {
      await Order.create({
        email: req.body.email,
        order_data: [data],
      }).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      console.log(error.message);
      res.send("Server Error b", error);
    }
  } else {
    try {
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } },
        { new: true } // Ensures you get the updated document
      ).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      res.send("Server Error");
    }
  }
});

router.post("/myOrderedData", async (req, res) => {
  try {
    console.log(req.body); // Check what's being received
    
    if (!req.body.email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const result = await Order.findOne({ email: req.body.email });

    res.json({ orderDate: result });
  } catch (error) {
    console.error(error); // Log full error details
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
