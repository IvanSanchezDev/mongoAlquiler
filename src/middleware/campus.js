import 'reflect-metadata'
import { plainToClass, classToPlain } from 'class-transformer'
import { validate } from 'class-validator'
import { DTO } from '../helpers/jwt.js'

import { Router } from 'express'
const middlewareVerify = Router()
const DTOData = Router()

middlewareVerify.use((req, res, next) => {
  if (!req.rateLimit) return
  const { direccion_cliente } = req.data // payload es el codigo jwt almacenado en req.data
  // const { exp, ...newPayload } = payload// desestructuracion del codigo jwt
  // payload = newPayload // extraemos solo la info
  const Clone = JSON.stringify(classToPlain(plainToClass(DTO('cliente').class, {}, { ignoreDecorators: true })))// traemos la clase para comparar
  const Verify = Clone === JSON.stringify(direccion_cliente) // comparamos que las clases sean iguales
  req.data = undefined; // limpiamos req.data
  (!Verify) ? res.status(406).send({ status: 406, message: 'No Autorizado' }) : next()
})

DTOData.use(async (req, res, next) => {
  try {
    const data = plainToClass(DTO('cliente').class, req.body)// convertimos el objeto que pasamos desde la solicitud a la clase
    await validate(data)// validamos que se cumplan las condiciones de la clase
    req.body = JSON.parse(JSON.stringify(data)) // almacenamos los datos validados en req.body
    req.data = undefined
    next()
  } catch (err) {
    res.status(err.status).send(err)
  }
})

export {
  middlewareVerify,
  DTOData
}
