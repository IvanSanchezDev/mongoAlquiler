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
import { IsDefined, IsNumber, IsString } from 'class-validator';
class Direccion {
}
__decorate([
    IsDefined({ message: 'La ciudad es obligatoria en la dirección' }),
    IsString({ message: 'La ciudad debe ser una cadena de texto' }),
    __metadata("design:type", String)
], Direccion.prototype, "ciudad", void 0);
export class Empleado {
    constructor(data) {
        Object.assign(this, data);
        this.direccion = { ciudad: '' };
    }
}
__decorate([
    Expose({ name: 'nombre_empleado' }),
    IsDefined({ message: 'El nombre del empleado es obligatorio' }),
    IsString({ message: 'El nombre debe ser una cadena de texto' }),
    __metadata("design:type", String)
], Empleado.prototype, "nombre", void 0);
__decorate([
    Expose({ name: 'apellido_empleado' }),
    IsDefined({ message: 'El apellido del empleado es obligatorio' }),
    IsString({ message: 'El apellido debe ser una cadena de texto' }),
    __metadata("design:type", String)
], Empleado.prototype, "apellido", void 0);
__decorate([
    Expose({ name: 'dni_empleado' }),
    IsDefined({ message: 'El DNI del empleado es obligatorio' }),
    IsNumber({}, { message: 'El DNI debe ser un número' }),
    __metadata("design:type", Number)
], Empleado.prototype, "dni", void 0);
__decorate([
    Expose({ name: 'direccion_empleado' }),
    IsDefined({ message: 'La dirección es obligatoria' }),
    __metadata("design:type", Direccion)
], Empleado.prototype, "direccion", void 0);
__decorate([
    Expose({ name: 'telefono_empleado' }),
    IsDefined({ message: 'El teléfono es obligatorio' }),
    IsNumber({}, { message: 'El teléfono debe ser un número' }),
    __metadata("design:type", Number)
], Empleado.prototype, "telefono", void 0);
__decorate([
    Expose({ name: 'cargo_empleado' }),
    IsDefined({ message: 'El cargo es obligatorio' }),
    IsString({ message: 'El cargo debe ser una cadena de texto' }),
    __metadata("design:type", String)
], Empleado.prototype, "cargo", void 0);
