import { Expose, Transform } from 'class-transformer';
import { IsDefined, IsEmail, IsString } from 'class-validator';

class Direccion {
    @IsDefined({ message: 'La ciudad es obligatoria en la dirección' })
    @IsString({ message: 'La ciudad debe ser una cadena de texto' })
    ciudad: string;

    calle?: string;
}

export class Cliente {
    @Expose({ name: 'nombre_cliente' })
    @IsDefined({ message: 'El nombre del cliente es obligatorio' })
    nombre: string;

    @Expose({ name: 'apellido_cliente' })
    @IsDefined({ message: 'El apellido del cliente es obligatorio' })
    apellido: string;

    @Expose({ name: 'dni_cliente' })
    @IsDefined({ message: 'El DNI del cliente es obligatorio' })
    dni: number;

    @Expose({ name: 'direccion_cliente' })
    @IsDefined({ message: 'La dirección es obligatoria' })
    direccion: Direccion;

    @Expose({ name: 'telefono_cliente' })
    @IsDefined({ message: 'El teléfono es obligatorio' })
    telefono: number;

    @Expose({ name: 'email_cliente' })
    @IsDefined({ message: 'El email es obligatorio' })
    @IsEmail({}, { message: 'El email debe ser válido' })
    email: string;

    constructor(data: Partial<Cliente>) {
        Object.assign(this, data);
        this.nombre="Cliente nuevo";
        this.dni=100;
        this.direccion = { calle: '', ciudad: '' };
    }
}
