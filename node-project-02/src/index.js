import express from 'express'
import router from './routes/index.js'

const app = new express()
app.use(express.json())
app.use('/', router)

app.listen(3000, () => {
  console.log('Server starts at port 3000');
})
