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
import { IsDefined, IsEmail, IsString } from 'class-validator';
class Direccion {
}
__decorate([
    IsDefined({ message: 'La ciudad es obligatoria en la dirección' }),
    IsString({ message: 'La ciudad debe ser una cadena de texto' }),
    __metadata("design:type", String)
], Direccion.prototype, "ciudad", void 0);
export class Cliente {
    constructor(data) {
        Object.assign(this, data);
        this.direccion = { calle: '', ciudad: '' };
    }
}
__decorate([
    Expose({ name: 'nombre_cliente' }),
    IsDefined({ message: 'El nombre del cliente es obligatorio' }),
    __metadata("design:type", String)
], Cliente.prototype, "nombre", void 0);
__decorate([
    Expose({ name: 'apellido_cliente' }),
    IsDefined({ message: 'El apellido del cliente es obligatorio' }),
    __metadata("design:type", String)
], Cliente.prototype, "apellido", void 0);
__decorate([
    Expose({ name: 'dni_cliente' }),
    IsDefined({ message: 'El DNI del cliente es obligatorio' }),
    __metadata("design:type", Number)
], Cliente.prototype, "dni", void 0);
__decorate([
    Expose({ name: 'direccion_cliente' }),
    IsDefined({ message: 'La dirección es obligatoria' }),
    __metadata("design:type", Direccion)
], Cliente.prototype, "direccion", void 0);
__decorate([
    Expose({ name: 'telefono_cliente' }),
    IsDefined({ message: 'El teléfono es obligatorio' }),
    __metadata("design:type", Number)
], Cliente.prototype, "telefono", void 0);
__decorate([
    Expose({ name: 'email_cliente' }),
    IsDefined({ message: 'El email es obligatorio' }),
    IsEmail({}, { message: 'El email debe ser válido' }),
    __metadata("design:type", String)
], Cliente.prototype, "email", void 0);
