const express = require("express");
const router = express.Router();

const topicController = require("../controllers/topicController");
const { authenticateToken } = require("../middleware/authMiddleware");
const { uploadPDF } = require("../middleware/uploadMiddleware");

// Create Topic
router.post("/", authenticateToken, topicController.createTopic);

// Get all Topics of a Unit
router.get("/unit/:unitId", topicController.getTopicsByUnit);

// Topic Material Routes
router.get("/:topicId/materials", topicController.getTopicMaterials);
router.post(
  "/:topicId/materials",
  authenticateToken,
  uploadPDF.single("pdf"),
  topicController.uploadTopicMaterial
);
router.delete(
  "/materials/:materialId",
  authenticateToken,
  topicController.deleteTopicMaterial
);

// Get Topic by ID
router.get("/:id", topicController.getTopicById);

// Update Topic
router.put("/:id", authenticateToken, topicController.updateTopic);

// Delete Topic
router.delete("/:id", authenticateToken, topicController.deleteTopic);

module.exports = router;
