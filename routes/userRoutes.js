
const jsonfile = require('jsonfile')

module.exports = (app) => {
  app.get('/users', (req, res) => {
    console.log('fetching all users')

    // jsonfile reading
    // eslint-disable-next-line handle-callback-err
    jsonfile.readFile('./DB/users.json', (err, content) => {
      // send file contents back to sender
      res.send(content)
    })
  })
  app.post('/users/new', (req, res) => {
    let { email, username } = req.body

    // eslint-disable-next-line handle-callback-err
    jsonfile.readFile('./DB/users.json', (err, content) => {
      content.push({ email: email, username: username })

      console.log(`Added ${email} to DB.`)

      jsonfile.writeFile('./DB/users.json', content, function (err) {
        console.log(err)
      })

      res.sendStatus(200)
    })
  })
  app.delete('/users/destroy', (req, res) => {
    let email = req.body.email

    // eslint-disable-next-line handle-callback-err
    jsonfile.readFile('./DB/users.json', (err, content) => {
      for (let i = content.length - 1; i >= 0; i--) {
        if (content[i].email === email) {
          console.log('removing ' + content[i].email + 'from DB')
          content.pop(i)
        }
      }

      jsonfile.writeFile('./DB/users.json', content, function (err) {
        console.log(err)
      })

      res.sendStatus(200)
    })
  })
  app.put('/user', (req, res) => {
    let user
    let username = req.body.username
    let email = req.query.email

    // eslint-disable-next-line handle-callback-err
    jsonfile.readFile('./DB/users.json', (err, content) => {
      for (let i = content.length - 1; i >= 0; i--) {
        if (content[i].email === email) {
          console.log('updated user ' + req.query.email + ' has now username : ' + username)

          user = content[i]
          user.username = username
        }
      }

      jsonfile.writeFile('./DB/users.json', content, function (err) {
        console.log(err)
      })
    })
    res.send(user)
  })
  app.get('/user', (req, res) => {
    let user
    let email = req.query.email

    // eslint-disable-next-line handle-callback-err
    jsonfile.readFile('./DB/users.json', (err, content) => {
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
}
