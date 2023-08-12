import { con } from '../database/connection.js'
import { Router } from 'express'
import { ObjectId } from 'mongodb'
import { middlewareVerify } from '../middleware/campus.js'
import { limitConfig } from '../helpers/limit.js'

const appAlquileres = Router()
const db = await con()

// 3. Listar todos los alquileres activos junto con los datos de los clientes relacionados.
appAlquileres.get('/alquileresActivos', limitConfig(), middlewareVerify, async (req, res) => {
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
appAlquileres.get('/detallesAlquiler/:_id', limitConfig(), middlewareVerify, async (req, res) => {
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

// 8.Obtener el costo total de un alquiler específico.
appAlquileres.get('/costoAlquiler/:_id', limitConfig(), middlewareVerify, async (req, res) => {
  const idAlquiler = req.params._id
  const alquiler = db.collection('alquiler')

  const result = await alquiler.findOne(
    { _id: new ObjectId(idAlquiler) },
    {
      _id: 0,
      automovil_id: { $toString: '$id_automovil' },
      costo_total: 1
    })
  console.log(result)
  res.send(result)
})

// 11. Obtener los detalles del alquiler que tiene fecha de inicio en '2023-07-05'.
appAlquileres.get('/detallesAlquiler', limitConfig(), middlewareVerify, async (req, res) => {
  const fecha = req.query.fecha
  console.log(fecha)
  const alquiler = db.collection('alquiler')

  const result = await alquiler.aggregate([
    {
      $match: {
        fecha_inicio: {
          $gte: fecha,
          $lt: new Date(fecha + 24 * 60 * 60 * 1000)
        }
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

// 17. Obtener la cantidad total de alquileres registrados en la base de datos.
appAlquileres.get('/totalAlquileres', limitConfig(), middlewareVerify, async (req, res) => {
  try {
    const alquiler = db.collection('alquiler')

    const result = await alquiler.aggregate([
      {
        $group: {
          _id: null,
          total_alquiler: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          total_alquiler: 1
        }
      }
    ]).toArray()
    res.send(result)
  } catch (error) {
    res.status(500).send(error)
  }
})

// 18. Mostrar los automóviles con capacidad igual a 5 personas y que estén disponibles.
appAlquileres.get('/automovilesCapacidadDisponibles', limitConfig(), middlewareVerify, async (req, res) => {
  try {
    const alquiler = db.collection('alquiler')

    const result = await alquiler.aggregate([
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
        $match: {
          'automovil.capacidad': 5,
          estado: 'Disponible'
        }
      },
      {
        $project: {
          _id: 0,
          id_automovil: { $toString: '$automovil._id' },
          marca: '$automovil.marca',
          modelo: '$automovil.modelo',
          capacidad: '$automovil.capacidad'
        }
      }
    ]).toArray()
    res.send(result)
  } catch (error) {
    res.status(500).send(error)
  }
})

// 20. Listar los alquileres con fecha de inicio entre '2023-07-05' y '2023-07-10'.
appAlquileres.get('/alquileres', limitConfig(), middlewareVerify, async (req, res) => {
  try {
    const { fechaInicio, fechaFin } = req.query
    const alquiler = db.collection('alquiler')
    const result = await alquiler.aggregate([
      {
        $match: {
          fecha_inicio: {
            $gte: fechaInicio,
            $lt: new Date(fechaFin + 24 * 60 * 60 * 1000)
          }
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
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default appAlquileres
