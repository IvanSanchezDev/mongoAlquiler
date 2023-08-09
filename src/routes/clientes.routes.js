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

export default appCliente
