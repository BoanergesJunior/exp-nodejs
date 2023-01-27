import express from 'express'

const app = new express()
app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).send('Hello World!')
})

app.listen(3000, () => {
  console.log('Server starts at port 3000');
})
