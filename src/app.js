import express from 'express'
import appCliente from './routes/clientes.routes.js'
import appAlquileres from './routes/alquileres.routes.js'
import appAutomovil from './routes/automoviles.routes.js'
import appEmpleados from './routes/empleados.routes.js'
import appReservas from './routes/reservas.routes.js'
import appSucursalAutomovil from './routes/sucursal_automovil.routes.js'

const app = express()
app.use(express.json())

app.use('/api/cliente', appCliente)
app.use('/api/alquiler', appAlquileres)
app.use('/api/automovil', appAutomovil)
app.use('/api/empleado', appEmpleados)
app.use('/api/reserva', appReservas)
app.use('/api/sucursalAutomovil', appSucursalAutomovil)

app.use((req, res) => {
  res.send('404 not found')
})

const port = process.env.PORT ?? 1234

app.listen(port, () => {
  console.log(`server listening on port http://localhost:${port}`)
})
