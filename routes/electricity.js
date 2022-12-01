const express = require("express");
const {
    createElectricity,
    getElectricity,
    getElectricityById,
    updateElectricity,
    deleteElectricity,
} = require("../controllers/electricity");

const router = express.Router();

router.get("/", getElectricity);
router.get("/:id", getElectricityById);
router.post("/", createElectricity);
router.put("/", updateElectricity);
router.delete("/:id", deleteElectricity);

module.exports = router;
