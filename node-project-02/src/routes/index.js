import express from 'express';
import { readFileData, writeFileData } from '../helper/file.js';
import '../helper/initial.state.js'

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

router.put('/update/:id', async (req, res) => {
  const { id } = req.params
  const { client, product, value, delivered } = req.body

  const data = await readFileData();

  let changed = false

  const newGrades = data.grades.map((item) => {
    if (item.id === Number(id)) {
      changed = true;

      return {
        ...item,
        student: client,
        subject: product,
        value,
        delivered,
      }
    }

    return item
  })

  if (!changed) return res.status(404).send({ message: `Order ${id} not found` })

  await writeFileData({ ...data, grades: newGrades })

  return res.status(200).send(true)
})

export default router;
