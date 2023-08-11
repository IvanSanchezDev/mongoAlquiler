import { Expose, Transform } from 'class-transformer';
import { IsDefined} from 'class-validator';
export class Automovil {
    @Expose({ name: 'marca_automovil' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `la marca del automovil es obligatoria`}}})
    marca: string;

    @Expose({ name: 'modelo_automovil' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `el modelo del automovil  es obligatoria`}}})
    modelo: number;

    @Expose({ name: 'anio_automovil' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `el año del  automovil  es obligatoria`}}})
    anio: number;
    @Expose({ name: 'tipo_automovil' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `tl tipo del automovil  es obligatoria`}}})
    tipo: string;

    @Expose({ name: 'capacidad_automovil' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `la capacidad del automovil es obligatoria`}}})
    capacidad: number;

    @Expose({ name: 'preciodiario_automovil' })
    @IsDefined({message: ()=>{ throw {status: 422, message: `el precio diario del automovil  es obligatoria`}}})
    precio_diario: number;


    constructor(data:Partial<Automovil>) {
      Object.assign(this, data);
      this.marca = "";
      this.modelo = 0;
      this.anio = 0;
      this.tipo="";
      this.capacidad=0;
      this.precio_diario=0;
    }
}