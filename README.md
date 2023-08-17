
# Alquiler  Autos

## Pasos instalacion:

    1. Descargue o clone el repositorio
    2. Ejecutar la bd esta en la direccion src/database/schemas.mongodb
    3. Ejecutar el siguiente comando para instalar las dependencias necesarias para que funcione => npm i
    4. configurar archivo .env en la raiz del proyecto y  como esta en el .envexample
    5. ejecutar el proyecto => npm run dev
    6. Comando para compilar archivos typ escript => npm run tsc
    7.Generar token correspondientes
    8. Probar EndPoints


## Token

1. Primero debe generar el token de acceso a los diferentes endpoints => http://127.0.0.1:1234/token/:coleccion

	**coleccion:** corresponde al nombre del recurso a la cual desee acceder en este caso existen 6: ['cliente', 'alquiler', 'automovil', 'empleado', 'reserva', 'sucursalAutomovil']

	**Ejemplo:** entonces quedaria asi para acceder a los recursos de cliente: http://127.0.0.1:1234/token/cliente



2. Copiar el token generado y pegarlo en los headers con el nombre Authorization

	**Ejemplo:** Authorization: codigojwtCopiado


## EndPoints

- _Todos los EndPoints son de tipo GET_


1. **Traer clientes =>** http://localhost:1234/api/cliente/clientes

2. **Obtener todos los automóviles disponibles para alquiler =>** http://localhost:1234/api/automovil/automovilesDisponibles

3. **Listar todos los alquileres activos junto con los datos de los clientes relacionados =>** http://localhost:1234/api/alquiler/alquileresActivos

4. **Mostrar todas las reservas pendientes con los datos del cliente y el automóvil reservado =>** http://localhost:1234/api/reserva/reservasPendientes

5. **Obtener los detalles del alquiler con el ID_Alquiler específico =>** http://localhost:1234/api/alquiler/detallesAlquiler/:id
    
    **ejemplo:** http://localhost:1234/api/alquiler/detallesAlquiler/64d3800748bc011e293a5ddf

6.  **Listar los empleados con el cargo de "Vendedor". =>** http://localhost:1234/api/empleado/empleadosVendedor

7. **Mostrar la cantidad total de automóviles disponibles en cada sucursal =>**http://localhost:1234/api/automovil/automovilesDisponibles

8.  **Obtener el costo total de un alquiler específico. =>** http://localhost:1234/api/alquiler/costoAlquiler/:id

    **ejemplo:** http://localhost:1234/api/alquiler/costoAlquiler/64d3800748bc011e293a5ddf

9. **Listar los clientes con el DNI específico. =>** http://localhost:1234/api/cliente/cliente/:dni

    **ejemplo:** http://localhost:1234/api/cliente/cliente/100554231

10. **Mostrar todos los automóviles con una capacidad mayor a 5 personas=>** http://localhost:1234/api/automovil/automovilesCapacidad

11. **Obtener los detalles del alquiler que tiene fecha de inicio especifica=>**http://localhost:1234/api/alquiler/detallesAlquiler?fecha=2023-08-05

12. **Listar las reservas pendientes realizadas por un cliente específico =>** http://localhost:1234/api/reserva/reservasPendientes/:idCliente
    
    **ejemplo:**http://localhost:1234/api/reserva/reservasPendientes/64d37fdcca4cbf857a9a3946

13. **Mostrar los empleados con cargo de "Gerente" o "Asistente"=>** http://localhost:1234/api/empleado/empleadosGerenteorAsistente

14. **Obtener los datos de los clientes que realizaron al menos un alquiler =>** http://localhost:1234/api/cliente/clientesAlMenosUnAlquiler

15. **Listar todos los automóviles ordenados por marca y modelo =>** http://localhost:1234/api/automovil/automovilesOrdenados

16. **Mostrar la cantidad total de automóviles en cada sucursal junto con su dirección =>** http://localhost:1234/api/sucursalAutomovil/totalAutomoviles

17. **Obtener la cantidad total de alquileres registrados en la base de datos. =>** http://localhost:1234/api/alquiler/totalAlquileres

18. http://localhost:1234/api/alquiler/alquileres?fechaInicio=?&fechaFin=?

19. **Mostrar los automóviles con capacidad igual a 5 personas y que estén disponibles =>**http://localhost:1234/api/alquiler/automovilesCapacidadDisponibles

20. **Obtener los datos del cliente que realizó la reserva =>** http://localhost:1234/api/reserva/infoCliente

