import { con } from '../database/connection.js'
import { Router } from 'express'

const appReservas = Router()
const db = await con()

// 4. Mostrar todas las reservas pendientes con los datos del cliente y el automóvil reservado.
appReservas.get('/reservasPendientes', async (req, res) => {
  const reserva = db.collection('reserva')
  const result = await reserva.aggregate([
    {
      $match: {
        estado: 'Pendiente'
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
      $lookup: {
        from: 'cliente',
        localField: 'id_cliente',
        foreignField: '_id',
        as: 'cliente'
      }
    },
    {
      $unwind: '$automovil'
    },
    {
      $unwind: '$cliente'
    },
    {
      $project: {
        _id: 0,
        id_reserva: { $toString: '$_id' },
        fechas: {
          fecha_reserva: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: '$fecha_reserva'
            }
          },
          fecha_inicio: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: '$fecha_inicio'
            }
          },
          fecha_fin: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: '$fecha_fin'
            }
          }
        },

        estado: 1,
        id_automovil: { $toString: '$automovil._id' },
        marca: '$automovil.marca',
        modelo: '$automovil.modelo',
        cliente_nombre: { $concat: ['$cliente.nombre', ' ', '$cliente.apellido'] },
        id_cliente: { $toString: '$cliente._id' },
        precio_diario: '$automovil.precio_diario',
        dni: '$cliente.dni',
        email: '$cliente.email'
      }
    },
    {
      $group: {
        _id: '$id_cliente',
        reserva: {
          $push: {
            id_reserve: '$id_reserva',
            fechas: '$fechas',
            precio_diario: '$precio_diario',
            id_automovil: '$id_automovil',
            marca: '$marca',
            modelo: '$modelo',
            estado: '$estado'
          }
        },
        cliente_nombre: { $first: '$cliente_nombre' },
        dni: { $first: '$dni' },
        email: { $first: '$email' }
      }
    },
    {
      $project: {
        _id: 0,
        id_cliente: '$_id',
        cliente_nombre: 1,
        dni: 1,
        email: 1,
        reserva: 1
      }
    }
  ]).toArray()
  res.send(result)
})

export default appReservas