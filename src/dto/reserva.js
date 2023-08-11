import { Expose } from 'class-transformer'
import { IsDefined, IsDate, IsString } from 'class-validator'
const __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
  const c = arguments.length; let r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc; let d
  if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function') r = Reflect.decorate(decorators, target, key, desc)
  else for (let i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r
  return c > 3 && r && Object.defineProperty(target, key, r), r
}
const __metadata = (this && this.__metadata) || function (k, v) {
  if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function') return Reflect.metadata(k, v)
}
export class Reserva {
  constructor (data) {
    Object.assign(this, data)
    this.fecha_reserva = new Date()
    this.fecha_inicio = new Date()
    this.fecha_fin = new Date()
    this.estado = ''
    this.id_cliente = ''
    this.id_automovil = ''
  }
}
__decorate([
  Expose({ name: 'fechaReserva' }),
  IsDefined({ message: 'La fecha de reserva es obligatoria' }),
  IsDate({ message: 'La fecha de reserva debe ser una fecha válida' }),
  __metadata('design:type', Date)
], Reserva.prototype, 'fecha_reserva', void 0)
__decorate([
  Expose({ name: 'fechaInicio' }),
  IsDefined({ message: 'La fecha de inicio es obligatoria' }),
  IsDate({ message: 'La fecha de inicio debe ser una fecha válida' }),
  __metadata('design:type', Date)
], Reserva.prototype, 'fecha_inicio', void 0)
__decorate([
  Expose({ name: 'fechaFin' }),
  IsDefined({ message: 'La fecha de fin es obligatoria' }),
  IsDate({ message: 'La fecha de fin debe ser una fecha válida' }),
  __metadata('design:type', Date)
], Reserva.prototype, 'fecha_fin', void 0)
__decorate([
  Expose({ name: 'estado' }),
  IsDefined({ message: 'El estado es obligatorio' }),
  IsString({ message: 'El estado debe ser una cadena de texto' }),
  __metadata('design:type', String)
], Reserva.prototype, 'estado', void 0)
__decorate([
  Expose({ name: 'idCliente' }),
  IsDefined({ message: 'El ID del cliente es obligatorio' }),
  __metadata('design:type', String)
], Reserva.prototype, 'id_cliente', void 0)
__decorate([
  Expose({ name: 'idAutomovil' }),
  IsDefined({ message: 'El ID del automóvil es obligatorio' }),
  __metadata('design:type', String)
], Reserva.prototype, 'id_automovil', void 0)
