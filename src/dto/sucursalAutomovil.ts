import { Expose, Transform } from 'class-transformer';
import { IsDefined } from 'class-validator';

export class SucursalAutomovil {
    @Expose({ name: 'idSucursal' })
    @IsDefined({ message: 'El ID de la sucursal es obligatorio' })
    id_sucursal: string;

    @Expose({ name: 'idAutomovil' })
    @IsDefined({ message: 'El ID del automóvil es obligatorio' })
    id_automovil: string;

    @Expose({ name: 'cantidadDisponible' })
    @IsDefined({ message: 'La cantidad disponible es obligatoria' })
    cantidad_disponible: number;

    constructor(data: Partial<SucursalAutomovil>) {
        Object.assign(this, data);
        this.id_sucursal = '';
        this.id_automovil = '';
        this.cantidad_disponible = 0;
    }
}
