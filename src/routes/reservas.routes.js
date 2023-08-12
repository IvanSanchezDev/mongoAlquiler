import { con } from '../database/connection.js'
import { Router } from 'express'
import { ObjectId } from 'mongodb'
import { middlewareVerify } from '../middleware/campus.js'
import { limitConfig } from '../helpers/limit.js'

const appReservas = Router()
const db = await con()

// 4. Mostrar todas las reservas pendientes con los datos del cliente y el automóvil reservado.
appReservas.get('/reservasPendientes', limitConfig(), middlewareVerify, async (req, res) => {
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

// 12. Listar las reservas pendientes realizadas por un cliente específico.
appReservas.get('/reservasPendientes/:idCliente', limitConfig(), middlewareVerify, async (req, res) => {
  const idCliente = req.params.idCliente
  console.log(idCliente)
  const reserva = db.collection('reserva')
  const result = await reserva.aggregate([
    {
      $match: {
        id_cliente: new ObjectId(idCliente)
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

// 19.Obtener los datos del cliente que realizó la reserva

appReservas.get('/infoCliente', limitConfig(), middlewareVerify, async (req, res) => {
  const reserva = db.collection('reserva')
  const result = await reserva.aggregate([
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

export default appReservas
