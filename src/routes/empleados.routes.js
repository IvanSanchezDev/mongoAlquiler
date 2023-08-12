import { con } from '../database/connection.js'
import { Router } from 'express'
import { middlewareVerify } from '../middleware/campus.js'
import { limitConfig } from '../helpers/limit.js'

const appEmpleados = Router()
const db = await con()

// 6.Listar los empleados con el cargo de "Vendedor".
appEmpleados.get('/empleadosVendedor', limitConfig(), middlewareVerify, async (req, res) => {
  const empleado = db.collection('empleado')
  const result = await empleado.find({ cargo: { $eq: 'Vendedor' } }, {
    _id: 0,
    id_vendedor: '$_id',
    nombre_completo: {
      $concat: ['$nombre', ' ', '$apellido']
    },
    cargo: 1,
    direccion: 1,
    telefono: 1,
    dni: 1
  }).toArray()
  res.send(result)
})

// 13. Mostrar los empleados con cargo de "Gerente" o "Asistente".
appEmpleados.get('/empleadosGerenteorAsistente', limitConfig(), middlewareVerify, async (req, res) => {
  const empleado = db.collection('empleado')
  const result = await empleado.find({
    $or: [
      { cargo: 'Asistente' },
      { cargo: 'Gerente' }
    ]
  },
  {
    _id: 0,
    id_vendedor: '$_id',
    nombre_completo: {
      $concat: ['$nombre', ' ', '$apellido']
    },
    cargo: 1,
    direccion: 1,
    telefono: 1,
    dni: 1
  }).toArray()

  res.send(result)
})

export default appEmpleados
