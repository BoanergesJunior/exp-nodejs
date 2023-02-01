import express from 'express';
import { readFileData, writeFileData } from '../helper/file.js';
// import '../helper/initial.state.js'

const router = new express.Router()

router.post('/create', async (req, res) => {
  const { cliente, produto, valor } = req.body

  const data = await readFileData()

  const newOrder = {
    id: data.nextId,
    cliente,
    produto,
    valor,
    timestamp: new Date(),
    entregue: false
  }

  data.nextId++
  data.pedidos.push(newOrder)

  await writeFileData(data);

  return res.status(200).send(newOrder)
})

router.put('/update/:id', async (req, res) => {
  const { id } = req.params
  const { cliente, produto, valor, entregue } = req.body

  const data = await readFileData();

  let changed = false

  const newOrder = data.pedidos.map((item) => {
    if (item.id === Number(id)) {
      changed = true;

      return {
        ...item,
        cliente,
        produto,
        valor,
        entregue,
      }
    }

    return item
  })

  if (!changed) return res.status(404).send({ message: `Order ${id} not found` })

  await writeFileData({ ...data, pedidos: newOrder })

  return res.status(200).send(true)
})

router.put('/update-status/:id', async (req, res) => {
  const { id } = req.params
  const { entregue } = req.body

  const data = await readFileData();

  const updatedOrders = data.pedidos.map((item) => {
    if (item.id === Number(id))
      return { ...item, entregue }
    return item
  })

  await writeFileData({ ...data, pedidos: updatedOrders })

  return res.status(200).send(true)
})

router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params

  const data = await readFileData();

  const deletedOrders = data.pedidos.map((item) => {
    if (item.id !== Number(id))
      return item
  })

  await writeFileData({ ...data, pedidos: deletedOrders })

  return res.status(200).send(true)
})

router.get('/get/:id', async (req, res) => {
  const { id } = req.params

  const data = await readFileData();

  let order;

  for (const item of data.pedidos) {
    if (item.id === Number(id))
      order = item
  }

  return res.status(200).send(order)
})

router.get('/total-client', async (req, res) => {
  const { cliente } = req.body

  const data = await readFileData();

  let amount = 0;

  for (const item of data.pedidos) {
    console.log(item);
    if (item.entregue && item.cliente === cliente)
      amount = amount + item.valor;
  }

  return res.status(200).send({ value: amount })
})

router.get('/total-product', async (req, res) => {
  const { produto } = req.body

  const data = await readFileData();

  let amount = 0;

  for (const item of data.pedidos) {
    if (item.entregue && item.produto === produto)
      amount = amount + item.valor;
  }

  return res.status(200).send({ value: amount })
})

router.get('/most-sold', async (req, res) => {
  const data = await readFileData();

  const result = data.pedidos.reduce((acc, currItem) => {
    if (!acc[currItem.produto]) {
      acc[currItem.produto] = []
    }

    acc[currItem.produto] = Number(acc[currItem.produto] + 1)

    return acc
  }, [])

  return res.status(200).send(result.sort().reverse())
})

export default router;
