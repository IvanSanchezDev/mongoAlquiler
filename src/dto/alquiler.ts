import { Expose } from 'class-transformer';
import { IsDefined, IsDate, IsNumber, IsString } from 'class-validator';

export class Alquiler {
    @Expose({ name: 'fechaInicio' })
    @IsDefined({ message: 'La fecha de inicio es obligatoria' })
    @IsDate({ message: 'La fecha de inicio debe ser una fecha válida' })
    fecha_inicio: Date;

    @Expose({ name: 'fecha_fin' })
    @IsDefined({ message: 'La fecha de fin es obligatoria' })
    @IsDate({ message: 'La fecha de fin debe ser una fecha válida' })
    fecha_fin: Date;

    @Expose({ name: 'costo_total' })
    @IsDefined({ message: 'El costo total es obligatorio' })
    @IsNumber({}, { message: 'El costo total debe ser un número' })
    costo_total: number;

    @Expose({ name: 'estado' })
    @IsDefined({ message: 'El estado del alquiler es obligatorio' })
    @IsString({ message: 'El estado del alquiler debe ser un string' })
    estado: string;

    @Expose({ name: 'id_cliente' })
    @IsDefined({ message: 'El ID del cliente es obligatorio' })
    id_cliente: string;

    @Expose({ name: 'id_automovil' })
    @IsDefined({ message: 'El ID del automóvil es obligatorio' })
    id_automovil: string;

    constructor(data: Partial<Alquiler>) {
        Object.assign(this, data);
        this.fecha_inicio = new Date();
        this.fecha_fin = new Date();
        this.costo_total = 0;
        this.estado = '';
        this.id_cliente = '';
        this.id_automovil = '';
    }
}
