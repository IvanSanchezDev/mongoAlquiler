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

// 14.Obtener los datos de los clientes que realizaron al menos un alquiler.

appCliente.get('/clientesAlMenosUnAlquiler', async (req, res) => {
  const alquiler = db.collection('alquiler')
  const result = await alquiler.aggregate([
    {
      $lookup: {
        from: 'cliente',
        localField: 'id_cliente',
        foreignField: '_id',
        as: 'cliente'
      }
    },
    {
      $unwind: '$cliente'
    },
    {
      $project: {
        _id: 0,
        cliente_nombre: { $concat: ['$cliente.nombre', ' ', '$cliente.apellido'] },
        id_cliente: { $toString: '$cliente._id' },
        email: '$cliente.email',
        dni: '$cliente.dni',
        telefone: '$cliente.telefono',
        direccion: '$cliente.direccion'
      }
    },
    {
      $group: {
        _id: '$id_cliente',
        cliente_nombre: { $first: '$cliente_nombre' },
        datos: {
          $push: {
            email: '$email',
            dni: '$dni',
            telefone: '$telefone',
            direccion: '$direccion'
          }
        }
      }
    },
    {
      $project: {
        _id: 0,
        id_cliente: '$_id',
        cliente_nombre: 1,
        datos: 1
      }
    }
  ]).toArray()

  res.send(result)
})

export default appCliente
