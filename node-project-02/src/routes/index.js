import express from 'express';
import { readFileData, writeFileData } from '../helper/file.js';
import '../helper/state.js'

const router = new express.Router()

router.post('/create', async (req, res) => {
  const { client, product, value } = req.body

  const data = await readFileData()

  const newOrder = {
    id: data.nextId,
    student: client,
    subject: product,
    value,
    timestamp: new Date(),
    delivered: false
  }

  data.nextId++
  data.grades.push(newOrder)

  await writeFileData(data);

  return res.status(200).send(newOrder)
})

export default router;
