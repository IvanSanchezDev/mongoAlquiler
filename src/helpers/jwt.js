import 'reflect-metadata'
import { plainToClass, classToPlain } from 'class-transformer'
import { Alquiler } from '../dto/alquiler.js'
import { Cliente } from '../dto/cliente.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { Router } from 'express'

dotenv.config('../../')
const appToken = Router()
const appVerify = Router()

const DTO = (p1) => {
  const match = {
    alquiler: Alquiler,
    cliente: Cliente
  }
  const inst = match[p1]
  if (!inst) throw new { status: 404, message: 'Token solicitado no valido' }()
  return { atributos: plainToClass(inst, {}, { ignoreDecorators: true }), class: inst }
}

appToken.use('/:collecion', async (req, res) => {
  try {
    const inst = DTO(req.params.collecion).atributos
    const jwtt = jwt.sign(Object.assign({}, classToPlain(inst)), process.env.JWT_SECRET_KEY, { expiresIn: '1h' })
    res.status(201).send({ status: 201, message: jwtt })
  } catch (error) {
    res.status(error.status).send(error.message)
  }
})

appVerify.use('/', async (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization) return res.status(400).send({ status: 400, token: 'Token no enviado' })
  try {
    jwt.verify(authorization, process.env.JWT_SECRET_KEY, (error, data) => {
      if (error) {
        return res.status(401).json({ message: 'Token inválido o caducado.' })
      }
      req.data = data
      next()
    })
  } catch (error) {
    res.status(498).send({ status: 498, token: 'Token caducado' })
  }
})

export {
  appToken,
  appVerify,
  DTO
}
