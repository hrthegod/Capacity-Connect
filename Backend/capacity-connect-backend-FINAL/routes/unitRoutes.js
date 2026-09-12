const express = require("express");
const router = express.Router();

const unitController = require("../controllers/unitController");
const { authenticateToken } = require("../middleware/authMiddleware");

// Create Unit
router.post("/", authenticateToken, unitController.createUnit);

// Get all Units of a Course
router.get("/course/:courseId", unitController.getUnitsByCourse);

// Get Unit by ID
router.get("/:id", unitController.getUnitById);

// Update Unit
router.put("/:id", authenticateToken, unitController.updateUnit);

// Delete Unit
router.delete("/:id", authenticateToken, unitController.deleteUnit);

module.exports = router;
