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

export default appAutomovil
