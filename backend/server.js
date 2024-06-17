const express = require('express')
const cors = require('cors')
const app = express()
const port = 5000

app.use(cors());

app.get('/', (req, res) => {
  console.log("sent Hello World")
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
