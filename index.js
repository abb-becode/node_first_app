// server

// set up ================================================
// get all the tools we need
const app = require('./app')

// Start the server=======================================
const PORT = 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
