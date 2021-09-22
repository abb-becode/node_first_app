// set up ==========================================================
// get all the tools we need

const express = require('express')
const bodyParser = require('body-parser') // parse posts

const userRoutes = require('./routes/users')

const app = express()

app.use(bodyParser.json()) // get information from html forms

// Routes==========================================================
// Routes which should handle requests
app.use('/', userRoutes)

module.exports = app
