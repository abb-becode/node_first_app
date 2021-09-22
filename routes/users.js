// const express = require('express')
const router = require('express-promise-router')()
// const router = express.Router

// const UsersController = require('../controllers/users');
const jsonfile = require('jsonfile')
// eslint-disable-next-line camelcase
const file_path = './DB/users.json'

// Get users
router.route('/users')
  .get((req, res) => {
    console.log('fetching all users')

    // jsonfile reading
    // eslint-disable-next-line handle-callback-err
    jsonfile.readFile(file_path, (err, content) => {
    // send file contents back to sender
      res.send(content)
    })
  })

// Create a new user
router.route('/new')
  .post((req, res) => {
    let { email, username } = req.body

    // load json file to content variable
    // eslint-disable-next-line handle-callback-err
    jsonfile.readFile(file_path, (err, content) => {
      // add user to array
      content.push({ email: email, username: username })

      console.log(`Added ${email} to DB.`)

      // write content to json file
      jsonfile.writeFile(file_path, content, (err) => {
        console.log(err)
      })

      res.sendStatus(200)
    })
  })

// Remove user from json file
router.route('/delete')
  .delete((req, res) => {
    let email = req.body.email

    // eslint-disable-next-line handle-callback-err
    jsonfile.readFile(file_path, (err, content) => {
      for (let i = content.length - 1; i >= 0; i--) {
        if (content[i].email === email) {
          console.log('removing ' + content[i].email + 'from DB')
          content = content.filter(el => el.email !== email)
        }
      }

      jsonfile.writeFile(file_path, content, function (err) {
        console.log(err)
      })

      res.sendStatus(200)
    })
  })

// Update user
router.route('/update')
  .put((req, res) => {
    let user
    let username = req.body.username
    let email = req.query.email

    // eslint-disable-next-line handle-callback-err
    jsonfile.readFile(file_path, (err, content) => {
      for (let i = content.length - 1; i >= 0; i--) {
        if (content[i].email === email) {
          console.log('user updated ' + req.query.email + ' has now username : ' + username)

          user = content[i]
          user.username = username
        }
      }

      jsonfile.writeFile(file_path, content, function (err) {
        console.log(err)
      })
    })
    res.send(user)
  })

// Get a specific user (by email)
router.route('/user')
  .get((req, res) => {
    let user
    let email = req.query.email

    // eslint-disable-next-line handle-callback-err
    jsonfile.readFile(file_path, (err, content) => {
      for (let i = content.length - 1; i >= 0; i--) {
        if (content[i].email === email) {
          console.log('found user :')
          console.log(content[i])
          user = content[i]
        }
      }

      res.send(user)
    })
  })

module.exports = router
