import { Expose } from 'class-transformer';
import { IsDefined, IsDate, IsString } from 'class-validator';

export class Reserva {
    @Expose({ name: 'fechaReserva' })
    @IsDefined({ message: 'La fecha de reserva es obligatoria' })
    @IsDate({ message: 'La fecha de reserva debe ser una fecha válida' })
    fecha_reserva: Date;

    @Expose({ name: 'fechaInicio' })
    @IsDefined({ message: 'La fecha de inicio es obligatoria' })
    @IsDate({ message: 'La fecha de inicio debe ser una fecha válida' })
    fecha_inicio: Date;

    @Expose({ name: 'fechaFin' })
    @IsDefined({ message: 'La fecha de fin es obligatoria' })
    @IsDate({ message: 'La fecha de fin debe ser una fecha válida' })
    fecha_fin: Date;

    @Expose({ name: 'estado' })
    @IsDefined({ message: 'El estado es obligatorio' })
    @IsString({ message: 'El estado debe ser una cadena de texto' })
    estado: string;

    @Expose({ name: 'idCliente' })
    @IsDefined({ message: 'El ID del cliente es obligatorio' })
    id_cliente: string;

    @Expose({ name: 'idAutomovil' })
    @IsDefined({ message: 'El ID del automóvil es obligatorio' })
    id_automovil: string;

    constructor(data: Partial<Reserva>) {
        Object.assign(this, data);
        this.fecha_reserva = new Date();
        this.fecha_inicio = new Date();
        this.fecha_fin = new Date();
        this.estado = '';
        this.id_cliente = '';
        this.id_automovil = '';
    }
}
