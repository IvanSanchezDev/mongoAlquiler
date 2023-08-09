import { con } from '../database/connection.js'
import { Router } from 'express'

const appAutomovil = Router()
const db = await con()

// 2. Obtener todos los automóviles disponibles para alquiler.
appAutomovil.get('/automovilesDisponibles', async (req, res) => {
  const alquiler = db.collection('alquiler')
  const result = await alquiler.aggregate([
    {
      $match: {
        estado: 'Disponible'
      }
    },
    {
      $lookup: {
        from: 'automovil',
        localField: 'id_automovil',
        foreignField: '_id',
        as: 'automovil'
      }
    },
    {
      $unwind: '$automovil'
    },
    {
      $project: {
        _id: 0,
        id_alquiler: { $toString: '$_id' },
        estado: '$estado',
        id_automovil: { $toString: '$automovil._id' },
        nombre: '$automovil.nombre',
        marca: '$automovil.marca',
        modelo: '$automovil.modelo'
      }
    }
  ]).toArray()
  res.send(result)
})

// 7. Mostrar la cantidad total de automóviles disponibles en cada sucursal.

appAutomovil.get('/automovilesDisponibles', async (req, res) => {
  const sucursalAutomovil = db.collection('sucursal_automovil')
  const result = await sucursalAutomovil.aggregate([
    {
      $group: {
        _id: '$id_sucursal',
        automovil: {
          $push: '$$ROOT'
        }
      }
    },
    {
      $addFields: {
        cantidad_total: {
          $sum: '$automovil.cantidad_disponible'
        }
      }
    },
    {
      $project: {
        _id: 0,
        id_sucursal: { $toString: '$_id' },
        cantidad_total: 1
      }
    }
  ]).toArray()
  res.send(result)
})

export default appAutomovil
