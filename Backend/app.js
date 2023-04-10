//34:00 
//COMP-1537 - Assignment #3 - Victor Liu #A00971668, Set F
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

// app.listen(3000, () => {
//     console.log('Server is running on port 3000');
// });
app.use(cors());
app.use(express.json());

const unicornModel = require('./models/unicorns.js');


app.post('/search', async (req, res) => {
    function projectionFilters() {
        if (req.body.projectionFilters.name == true && req.body.projectionFilters.weight == false) {
            return { "name": 1, "_id": 0 };
        } else if (req.body.projectionFilters.name == false && req.body.projectionFilters.weight == true) {
            return { "weight": 1, "_id": 0 };
        } else if (req.body.projectionFilters.name == true && req.body.projectionFilters.weight == true) {
            return { "name": 1, "weight": 1, "_id": 0 };
        } else if (req.body.projectionFilters.name == false && req.body.projectionFilters.weight == false) {
            return { "_id": 0 };
        }
    }

    if (req.body.type === 'nameSearch') {
        console.log(`app.js line 23: req.body ${req.body}`)
        var selectionArgument = {}
        if (req.body.name) {
            selectionArgument = { name: req.body.name, }
        }
        var projectionArgument = projectionFilters();
        const result = await unicornModel.find(selectionArgument, projectionArgument);
        res.json(result);

    } else if (req.body.type === 'weightSearch') {
        var selectionArgument = {}
        if (req.body.minWeight && req.body.maxWeight) {
            selectionArgument = { weight: { $gte: req.body.minWeight, $lte: req.body.maxWeight } }
        } else if (req.body.minWeight) {
            selectionArgument = { weight: { $gte: req.body.minWeight } }
        } else if (req.body.maxWeight) {
            selectionArgument = { weight: { $lte: req.body.maxWeight } }
        }
        var projectionArgument = projectionFilters();
        const result = await unicornModel.find(selectionArgument, projectionArgument);
        res.json(result);

    } else if (req.body.type === 'lovesSearch') {
        console.log(`app.js line 23: req.body ${req.body}`)
        var selectionArgument = {}
        if (req.body.loves) {
            selectionArgument = { loves: { $all: req.body.loves } }
        }
        var projectionArgument = projectionFilters();
        const result = await unicornModel.find(selectionArgument, projectionArgument);
        res.json(result);

    } else if (req.body.type === "setFilters") {
        var selectionArgument = {};
        var selectionQueryArray = [];

        if (req.body.name) {
            selectionQueryArray.push({ name: req.body.name });
        }

        if (req.body.minWeight && req.body.maxWeight) {
            selectionQueryArray.push({
                weight: { $gte: req.body.minWeight, $lte: req.body.maxWeight },
            });
        } else if (req.body.minWeight) {
            selectionQueryArray.push({ weight: { $gte: req.body.minWeight } });
        } else if (req.body.maxWeight) {
            selectionQueryArray.push({ weight: { $lte: req.body.maxWeight } });
        }

        if (req.body.loves && req.body.loves.length > 0) {
            selectionQueryArray.push({ loves: { $all: req.body.loves } });
        }

        if (selectionQueryArray) {
            selectionArgument = { $and: selectionQueryArray };
        }

        var projectionArgument = projectionFilters();
        const result = await unicornModel.find(selectionArgument, projectionArgument);
        res.json(result);
    }
});


module.exports = app;
