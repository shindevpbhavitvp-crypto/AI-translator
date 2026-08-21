const express = require("express");
const db = require("../database");

const router = express.Router();

router.post("/", (req, res) => {
  const { sign, confidence, userId = "guest" } = req.body;

  if (!sign) {
    return res.status(400).json({
      message: "Predicted sign is required"
    });
  }

  const sql = `
    INSERT INTO history (sign, confidence, userId)
    VALUES (?, ?, ?)
  `;

  db.run(sql, [sign, confidence || 0, userId], function (error) {
    if (error) {
      return res.status(500).json({
        message: "Could not save prediction",
        error: error.message
      });
    }

    const io = req.app.get("io");

io.emit("prediction-result", {
  sign,
  confidence: confidence || 0,
  historyId: this.lastID
});

    res.status(201).json({
      message: "Prediction received and saved",
      prediction: {
        sign,
        confidence: confidence || 0
      },
      historyId: this.lastID
    });
  });
});

module.exports = router;