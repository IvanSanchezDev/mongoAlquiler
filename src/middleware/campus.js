import 'reflect-metadata'
import { plainToClass, classToPlain } from 'class-transformer'
import { validate } from 'class-validator'
import { DTO } from '../helpers/jwt.js'

import { Router } from 'express'
const middlewareVerify = Router()
const DTOData = Router()

middlewareVerify.use((req, res, next) => {
  try {
    const collection = req.collection
    const { iat, exp, ...newPayload } = req.data // newPayload es la data  almacenado en req.data
    const payload = newPayload // extraemos solo la info
    const clone = JSON.stringify(classToPlain(plainToClass(DTO(collection).class, {}, { ignoreDecorators: true })))// traemos el objeto convertido de la clase para comparar
    const Verify = clone === JSON.stringify(payload) // comparamos que los objetos sean iguales
    req.data = undefined; // limpiamos req.data
    (!Verify) ? res.status(406).send({ status: 406, message: 'No Autorizado' }) : next()
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message })
  }
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
