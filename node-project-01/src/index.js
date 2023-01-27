const express = require('express')
const router = require('./router')

const app = new express()
app.use(express.json())

app.use('/marcas', router)

app.listen(3000, () => {
  console.log('Server starts at port 3000');
})
