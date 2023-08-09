import { con } from '../database/connection.js'
import { Router } from 'express'

const appCliente = Router()
const db = await con()

// 1. Mostrar todos los clientes registrados en la base de datos.
appCliente.get('/clientes', async (req, res) => {
  const cliente = db.collection('cliente')
  const result = await cliente.find({}).toArray()
  res.send(result)
})

// 9. Listar los clientes con el DNI específico.
appCliente.get('/cliente/:dni', async (req, res) => {
  const dniCliente = req.params.dni
  const cliente = db.collection('cliente')
  const result = await cliente.findOne({ dni: parseInt(dniCliente) })
  console.log(result)
  res.send(result)
})

export default appCliente
