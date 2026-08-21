const express = require("express");
const db = require("../database");

const router = express.Router();

// Save a detected sign
router.post("/", (req, res) => {
  const { sign, confidence, userId = "guest" } = req.body;

  if (!sign) {
    return res.status(400).json({
      message: "Sign is required"
    });
  }

  const sql = `
    INSERT INTO history (sign, confidence, userId)
    VALUES (?, ?, ?)
  `;

  db.run(sql, [sign, confidence || 0, userId], function (error) {
    if (error) {
      return res.status(500).json({
        message: "Could not save history",
        error: error.message
      });
    }

    res.status(201).json({
      message: "Sign saved successfully",
      id: this.lastID,
      sign,
      confidence: confidence || 0,
      userId
    });
  });
});

// Get all saved signs
router.get("/", (req, res) => {
  db.all(
    "SELECT * FROM history ORDER BY createdAt DESC",
    [],
    (error, rows) => {
      if (error) {
        return res.status(500).json({
          message: "Could not get history",
          error: error.message
        });
      }

      res.json(rows);
    }
  );
});

module.exports = router;