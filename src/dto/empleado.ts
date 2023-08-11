import { Expose } from 'class-transformer';
import { IsDefined, IsNumber, IsString } from 'class-validator';

class Direccion {
    @IsDefined({ message: 'La ciudad es obligatoria en la dirección' })
    @IsString({ message: 'La ciudad debe ser una cadena de texto' })
    ciudad: string;

    calle?: string;
}

export class Empleado {
    @Expose({ name: 'nombre_empleado' })
    @IsDefined({ message: 'El nombre del empleado es obligatorio' })
    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    nombre: string;

    @Expose({ name: 'apellido_empleado' })
    @IsDefined({ message: 'El apellido del empleado es obligatorio' })
    @IsString({ message: 'El apellido debe ser una cadena de texto' })
    apellido: string;

    @Expose({ name: 'dni_empleado' })
    @IsDefined({ message: 'El DNI del empleado es obligatorio' })
    @IsNumber({}, { message: 'El DNI debe ser un número' })
    dni: number;

    @Expose({ name: 'direccion_empleado' })
    @IsDefined({ message: 'La dirección es obligatoria' })
    direccion: Direccion;

    @Expose({ name: 'telefono_empleado' })
    @IsDefined({ message: 'El teléfono es obligatorio' })
    @IsNumber({}, { message: 'El teléfono debe ser un número' })
    telefono: number;

    @Expose({ name: 'cargo_empleado' })
    @IsDefined({ message: 'El cargo es obligatorio' })
    @IsString({ message: 'El cargo debe ser una cadena de texto' })
    cargo: string;

    constructor(data: Partial<Empleado>) {
        Object.assign(this, data);
        this.direccion = { ciudad: '' };
    }
}
