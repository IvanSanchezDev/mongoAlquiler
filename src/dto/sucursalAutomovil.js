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
import { IsDefined } from 'class-validator';
export class SucursalAutomovil {
    constructor(data) {
        Object.assign(this, data);
        this.id_sucursal = '';
        this.id_automovil = '';
        this.cantidad_disponible = 0;
    }
}
__decorate([
    Expose({ name: 'idSucursal' }),
    IsDefined({ message: 'El ID de la sucursal es obligatorio' }),
    __metadata("design:type", String)
], SucursalAutomovil.prototype, "id_sucursal", void 0);
__decorate([
    Expose({ name: 'idAutomovil' }),
    IsDefined({ message: 'El ID del automóvil es obligatorio' }),
    __metadata("design:type", String)
], SucursalAutomovil.prototype, "id_automovil", void 0);
__decorate([
    Expose({ name: 'cantidadDisponible' }),
    IsDefined({ message: 'La cantidad disponible es obligatoria' }),
    __metadata("design:type", Number)
], SucursalAutomovil.prototype, "cantidad_disponible", void 0);
