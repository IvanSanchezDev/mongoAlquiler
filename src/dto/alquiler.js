var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Expose } from 'class-transformer';
import { IsDefined, IsDate, IsNumber, IsString } from 'class-validator';
export class Alquiler {
    constructor(data) {
        Object.assign(this, data);
        this.fecha_inicio = new Date();
        this.fecha_fin = new Date();
        this.costo_total = 0;
        this.estado = '';
        this.id_cliente = '';
        this.id_automovil = '';
    }
}
__decorate([
    Expose({ name: 'fechaInicio' }),
    IsDefined({ message: 'La fecha de inicio es obligatoria' }),
    IsDate({ message: 'La fecha de inicio debe ser una fecha válida' }),
    __metadata("design:type", Date)
], Alquiler.prototype, "fecha_inicio", void 0);
__decorate([
    Expose({ name: 'fecha_fin' }),
    IsDefined({ message: 'La fecha de fin es obligatoria' }),
    IsDate({ message: 'La fecha de fin debe ser una fecha válida' }),
    __metadata("design:type", Date)
], Alquiler.prototype, "fecha_fin", void 0);
__decorate([
    Expose({ name: 'costo_total' }),
    IsDefined({ message: 'El costo total es obligatorio' }),
    IsNumber({}, { message: 'El costo total debe ser un número' }),
    __metadata("design:type", Number)
], Alquiler.prototype, "costo_total", void 0);
__decorate([
    Expose({ name: 'estado' }),
    IsDefined({ message: 'El estado del alquiler es obligatorio' }),
    IsString({ message: 'El estado del alquiler debe ser un string' }),
    __metadata("design:type", String)
], Alquiler.prototype, "estado", void 0);
__decorate([
    Expose({ name: 'id_cliente' }),
    IsDefined({ message: 'El ID del cliente es obligatorio' }),
    __metadata("design:type", String)
], Alquiler.prototype, "id_cliente", void 0);
__decorate([
    Expose({ name: 'id_automovil' }),
    IsDefined({ message: 'El ID del automóvil es obligatorio' }),
    __metadata("design:type", String)
], Alquiler.prototype, "id_automovil", void 0);
