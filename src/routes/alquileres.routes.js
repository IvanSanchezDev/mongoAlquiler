import { con } from '../database/connection.js'
import { Router } from 'express'
import { ObjectId } from 'mongodb'

const appAlquileres = Router()
const db = await con()

// 3. Listar todos los alquileres activos junto con los datos de los clientes relacionados.
appAlquileres.get('/alquileresActivos', async (req, res) => {
  const cliente = db.collection('cliente')
  const result = await cliente.aggregate([
    {
      $lookup: {
        from: 'alquiler',
        localField: '_id',
        foreignField: 'id_cliente',
        as: 'alquileres'
      }
    },
    {
      $project: {
        'alquileres._id': 0,
        'alquileres.id_cliente': 0,
        'alquileres.id_automovil': 0
      }
    },
    /** *PERMITE SEPARAR Y PODER USAR LOS METODOS DE COLECCION */
    {
      $unwind: '$alquileres'
    },
    {
      $match: {
        'alquileres.estado': { $eq: 'Disponible' }
      }
    },
    {
      $group: {
        _id: '$_id',
        nombre: { $first: '$nombre' },
        apellido: { $first: '$apellido' },
        dni: { $first: '$dni' },
        telefono: { $first: '$telefono' },
        alquileres: { $push: '$alquileres' }
      }
    }
  ]).toArray()
  res.send(result)
})

// 5. Obtener los detalles del alquiler con el ID_Alquiler específico.
appAlquileres.get('/detallesAlquiler/:_id', async (req, res) => {
  const { _id } = req.params
  const idAlquiler = _id
  const alquiler = db.collection('alquiler')
  const result = await alquiler.aggregate([
    {
      $match: {
        _id: new ObjectId(idAlquiler)
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
        id_alquiler: { $toString: '$_id' },
        estado: 1,
        fechas: {
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
        id_automovil: { $toString: '$automovil._id' },
        marca: '$automovil.marca',
        modelo: '$automovil.modelo',
        cliente_nombre: { $concat: ['$cliente.nombre', ' ', '$cliente.apellido'] },
        id_cliente: { $toString: '$cliente._id' }
      }
    },
    {
      $group: {
        _id: '$id_cliente',
        alquileres: {
          $push: {
            id_alquiler: '$id_alquiler',
            id_automovil: '$id_automovil',
            fechas: '$fechas',
            marca: '$marca',
            modelo: '$modelo',
            estado: '$estado'
          }
        },
        cliente_nombre: { $first: '$cliente_nombre' }
      }
    },
    {
      $project: {
        _id: 0,
        id_cliente: '$_id',
        cliente_nombre: 1,
        alquileres: 1
      }
    }
  ]).toArray()
  res.send(result)
})

export default appAlquileres
