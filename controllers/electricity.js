const electricity = require("../models/electricity");

const getElectricity = async (req, res) => {
    try {
        const response = await electricity.findAll();
        if (response) {
            res.send(response);
        }
    } catch (e) {
        res.sendStatus(500);
    }
};

const getElectricityById = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const response = await electricity.findById(id);
        if (response.length === 1) {
            res.send(response[0]);
        } else {
            res.status(404).send("Not Found");
        }
    } catch (e) {
        res.sendStatus(500);
    }
};

const createElectricity = async (req, res) => {
    const electricityData = {
        cost: req.body.cost,
        month: req.body.month,
        usage: req.body.usage,
    };

    try {
        const response = await electricity.save(electricityData);
        if (response) {
            electricityData.id = response.insertId;
            res.status(201).send(electricityData);
        }
    } catch (e) {
        res.sendStatus(500);
    }
};

const updateElectricity = async (req, res) => {
    const electricityData = {
        id: req.body.id,
        name: req.body.name,
        country: req.body.country,
    };
    try {
        const response = await electricity.updateById(electricityData);
        if (response) {
            res.send(electricityData);
        }
    } catch (e) {
        res.sendStatus(500);
    }
};

const deleteElectricity = async (req, res) => {
    const id = parseInt(req.params.id, 10);
    try {
        const response = await electricity.deleteById(id);
        if (response) {
            res.send("electricity deleted");
        }
    } catch (e) {
        res.sendStatus(500);
    }
};

module.exports = {
    createElectricity,
    deleteElectricity,
    getElectricity,
    getElectricityById,
    updateElectricity,
};
