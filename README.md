
# Alquiler  Autos

## Pasos instalacion:
    1. Descargue o clone el repositorio
    2. Ejecutar la bd esta en la direccion src/database/schemas.mongodb
    3. Ejecutar el siguiente comando para instalar las dependencias necesarias para que funcione => npm i
    4. configurar archivo .env en la raiz del proyecto y  como esta en el .envexample
    5. ejecutar el proyecto => npm run dev
    6. Comando para compilar archivos typ escript => npm run tsc
    7. Probar EndPoints


## EndPoints


1. Traer clientes
http://localhost:1234/api/cliente/clientes

2. Obtener todos los automóviles disponibles para alquiler
http://localhost:1234/api/automovil/automovilesDisponibles

3. Listar todos los alquileres activos junto con los datos de los clientes relacionados.
http://localhost:1234/api/alquiler/alquileresActivos

4. Mostrar todas las reservas pendientes con los datos del cliente y el automóvil reservado.
http://localhost:1234/api/reserva/reservasPendientes

5. Obtener los detalles del alquiler con el ID_Alquiler específico.
http://localhost:1234/api/alquiler/detallesAlquiler/:id
http://localhost:1234/api/alquiler/detallesAlquiler/64d3800748bc011e293a5ddf

6.  Listar los empleados con el cargo de "Vendedor".
http://localhost:1234/api/empleado/empleadosVendedor

7. Mostrar la cantidad total de automóviles disponibles en cada
sucursal.
http://localhost:1234/api/automovil/automovilesDisponibles

8.  Obtener el costo total de un alquiler específico.
http://localhost:1234/api/alquiler/costoAlquiler/:id
http://localhost:1234/api/alquiler/costoAlquiler/64d3800748bc011e293a5ddf


9. Listar los clientes con el DNI específico.
http://localhost:1234/api/cliente/cliente/:dni
http://localhost:1234/api/cliente/cliente/100554231

10. http://localhost:1234/api/automovil/automovilesCapacidad

11. http://localhost:1234/api/alquiler/detallesAlquiler?fecha=2023-08-05

12. http://localhost:1234/api/reserva/reservasPendientes/:idCliente
http://localhost:1234/api/reserva/reservasPendientes/64d37fdcca4cbf857a9a3946

13. http://localhost:1234/api/empleado/empleadosGerenteorAsistente

14. Obtener los datos de los clientes que realizaron al menos un
alquiler.
http://localhost:1234/api/cliente/clientesAlMenosUnAlquiler

15. Listar todos los automóviles ordenados por marca y modelo
http://localhost:1234/api/automovil/automovilesOrdenados

16. http://localhost:1234/api/sucursalAutomovil/totalAutomoviles

17. Obtener la cantidad total de alquileres registrados en la base de
datos.
http://localhost:1234/api/alquiler/totalAlquileres

18. http://localhost:1234/api/alquiler/alquileres?fechaInicio=?&fechaFin=?