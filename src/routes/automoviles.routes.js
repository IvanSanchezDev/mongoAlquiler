import { con } from '../database/connection.js'
import { Router } from 'express'
import { middlewareVerify } from '../middleware/campus.js'

import { limitConfig } from '../helpers/limit.js'

const appAutomovil = Router()
const db = await con()

// 2. Obtener todos los automóviles disponibles para alquiler.
appAutomovil.get('/automovilesDisponibles', limitConfig(), middlewareVerify, async (req, res) => {
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

appAutomovil.get('/automovilesDisponibles', limitConfig(), middlewareVerify, async (req, res) => {
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

// 10. Mostrar todos los automóviles con una capacidad mayor a 5 personas
appAutomovil.get('/automovilesCapacidad', limitConfig(), middlewareVerify, async (req, res) => {
  const automovil = db.collection('automovil')
  const result = await automovil.find({ capacidad: { $gt: 5 } },
    {
      _id: 0,
      id_automovil: { $toString: '$_id' },
      marca: '$marca',
      modelo: '$modelo',
      capacidad: 1
    }
  ).toArray()
  res.send(result)
})

// 15. Listar todos los automóviles ordenados por marca y modelo
appAutomovil.get('/automovilesOrdenados', limitConfig(), middlewareVerify, async (req, res) => {
  const automovil = db.collection('automovil')
  const result = await automovil.aggregate([
    {
      $sort: {
        marca: -1
      }
    },
    {
      $project: {
        _id: 0,
        marca: '$marca',
        modelo: '$modelo',
        precio_diario: '$precio_diario',
        capacidad: '$capacidad'
      }
    }
  ]).toArray()
  res.send(result)
})

export default appAutomovil
