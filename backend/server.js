import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import Item from './models/Item.js';
// const express = require('express')
const app = express()
const port = 3000

app.use(cors());

app.use(express.json({limit: '10mb'}));

mongoose.connect('mongodb://localhost:27017/items')

app.get('/', (req, res) => {
    res.send('Server running!')
})

app.post('/add-item', async (req, res) => {
    const newItem = new Item(req.body);
    await newItem.save();
    res.status(201).json({ message: 'Item successfully added' });
})

app.get('/items', async (req, res) => {
    const items = await Item.find();
    res.json(items);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
