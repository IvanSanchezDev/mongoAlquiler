import { con } from '../database/connection.js'
import { Router } from 'express'

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

export default appAlquileres
