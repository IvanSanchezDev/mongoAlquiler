import { Expose } from 'class-transformer'
import { IsDefined } from 'class-validator'
const __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  const c = arguments.length; let r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc; let d
  if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function') r = Reflect.decorate(decorators, target, key, desc)
  else for (let i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r
  return c > 3 && r && Object.defineProperty(target, key, r), r
}
const __metadata = (this && this.__metadata) || function (k, v) {
  if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function') return Reflect.metadata(k, v)
}
export class Automovil {
  constructor (data) {
    Object.assign(this, data)
    this.marca = ''
    this.modelo = 0
    this.anio = 0
    this.tipo = ''
    this.capacidad = 0
    this.precio_diario = 0
  }
}
__decorate([
  Expose({ name: 'marca_automovil' }),
  IsDefined({ message: () => { throw { status: 422, message: 'la marca del automovil es obligatoria' } } }),
  __metadata('design:type', String)
], Automovil.prototype, 'marca', void 0)
__decorate([
  Expose({ name: 'modelo_automovil' }),
  IsDefined({ message: () => { throw { status: 422, message: 'el modelo del automovil  es obligatoria' } } }),
  __metadata('design:type', Number)
], Automovil.prototype, 'modelo', void 0)
__decorate([
  Expose({ name: 'anio_automovil' }),
  IsDefined({ message: () => { throw { status: 422, message: 'el año del  automovil  es obligatoria' } } }),
  __metadata('design:type', Number)
], Automovil.prototype, 'anio', void 0)
__decorate([
  Expose({ name: 'tipo_automovil' }),
  IsDefined({ message: () => { throw { status: 422, message: 'tl tipo del automovil  es obligatoria' } } }),
  __metadata('design:type', String)
], Automovil.prototype, 'tipo', void 0)
__decorate([
  Expose({ name: 'capacidad_automovil' }),
  IsDefined({ message: () => { throw { status: 422, message: 'la capacidad del automovil es obligatoria' } } }),
  __metadata('design:type', Number)
], Automovil.prototype, 'capacidad', void 0)
__decorate([
  Expose({ name: 'preciodiario_automovil' }),
  IsDefined({ message: () => { throw { status: 422, message: 'el precio diario del automovil  es obligatoria' } } }),
  __metadata('design:type', Number)
], Automovil.prototype, 'precio_diario', void 0)
