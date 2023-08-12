import { con } from '../database/connection.js'
import { Router } from 'express'
import { middlewareVerify } from '../middleware/campus.js'
import { limitConfig } from '../helpers/limit.js'

const appSucursalAutomovil = Router()
const db = await con()

// 16. Mostrar la cantidad total de automóviles en cada sucursal junto con su dirección

appSucursalAutomovil.get('/totalAutomoviles', limitConfig(), middlewareVerify, async (req, res) => {
  try {
    const sucursalAutomovil = db.collection('sucursal_automovil')
    const result = sucursalAutomovil.aggregate([
      {
        $lookup: {
          from: 'sucursal',
          localField: 'id_sucursal',
          foreignField: '_id',
          as: 'sucursal'
        }
      },
      {
        $unwind: '$sucursal'
      },
      {
        $project: {
          _id: 0,
          id_sucursal: '_id',
          direccion: '$sucursal.direccion',
          cantidad_disponible: '$cantidad_disponible'
        }
      },
      {
        $group: {
          _id: '$direccion',
          sucursal: {
            $push: {
              cantidad_disponible: '$cantidad_disponible'
            }
          },
          direccion: { $first: '$direccion' }
        }
      },
      {
        $project: {
          _id: 0,
          cantidad_total: {
            $sum: '$sucursal.cantidad_disponible'
          },
          direccion: 1
        }
      }
    ]).toArray()
    res.send(result)
  } catch (error) {
    res.status(500).send(error)
  }
})

export default appSucursalAutomovil
