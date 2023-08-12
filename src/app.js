import express from 'express'
import appCliente from './routes/clientes.routes.js'
import appAlquileres from './routes/alquileres.routes.js'
import appAutomovil from './routes/automoviles.routes.js'
import appEmpleados from './routes/empleados.routes.js'
import appReservas from './routes/reservas.routes.js'
import appSucursalAutomovil from './routes/sucursal_automovil.routes.js'
import { appToken, appVerify } from './helpers/jwt.js'

const app = express()
app.use(express.json())

app.use('/api/:collection', (req, res, next) => {
  const collection = req.params.collection
  req.collection = collection
  next()
})

app.use('/api/cliente', appVerify, appCliente)
app.use('/api/alquiler', appVerify, appAlquileres)
app.use('/api/automovil', appVerify, appAutomovil)
app.use('/api/empleado', appVerify, appEmpleados)
app.use('/api/reserva', appVerify, appReservas)
app.use('/api/sucursalAutomovil', appVerify, appSucursalAutomovil)
app.use('/token', appToken)

app.use((req, res) => {
  res.send('404 not found')
})

const port = process.env.PORT ?? 1234

app.listen(port, () => {
  console.log(`server listening on port http://localhost:${port}`)
})
