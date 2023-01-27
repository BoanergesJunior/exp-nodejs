const express = require('express')
const cars = require('../car-list.json')

const router = express.Router()

const descendingCar = () => {
  const sortedCars = cars
  return sortedCars.sort((a, b) => b.models.length - a.models.length)
}

const ascendingCar = () => {
  const sortedCars = cars
  return sortedCars.sort((a, b) => a.models.length - b.models.length)
}

router.get('/maisModelos', (req, res) => {
  const greater = descendingCar();
  return res.status(200).send({ brand: greater[0].brand, quantity: greater[0].models.length })
});

router.get('/menosModelos/', (req, res) => {
  const lesser = ascendingCar();
  return res.status(200).send({ brand: lesser[0].brand, quantity: lesser[0].models.length })
});

router.get('/listaMaisModelos/:size', (req, res) => {
  const { size } = req.params
  const greater = descendingCar();
  const models = greater.slice(0, size)
  const response = models.map((each) => `MARCA ${each.brand} - ${each.models.length}`)

  return res.status(200).send(response)
});

router.get('/listaMenosModelos/:size', (req, res) => {
  const { size } = req.params
  const lesser = ascendingCar();
  const models = lesser.slice(0, size)
  const response = models.map((each) => `MARCA ${each.brand} - ${each.models.length}`)

  return res.status(200).send(response)
});

router.get('/listaModelos', (req, res) => {
  const { name } = req.body

  const brand = cars.find((car) => car.brand.toLocaleLowerCase() === name.toLocaleLowerCase())

  return brand ? res.status(200).send(brand.models) : res.send([])
});

module.exports = router;
