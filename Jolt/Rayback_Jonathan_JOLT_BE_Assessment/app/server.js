// just imports the app and then starts it

const app = require('./app')
const port = process.env.PORT || 8080

// start server
app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`)
})
