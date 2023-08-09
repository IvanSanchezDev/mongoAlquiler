import { con } from '../database/connection.js'
import { Router } from 'express'

const appEmpleados = Router()
const db = await con()

// 6.Listar los empleados con el cargo de "Vendedor".
appEmpleados.get('/empleadosVendedor', async (req, res) => {
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

export default appEmpleados
