import sql, { poolPromise } from '../config/database'; // pool.request para conexión real activa
import { Contenedor } from '../entities/contenedor.entity';

export class ContenedorRepository {

    /* Buscar todos los contenedores */
    async findAll() {
        const pool = await poolPromise;

        const result = await pool
            .request()
            .query('SELECT * FROM contenedor ORDER BY id DESC');
        return result.recordset.map(
            (row: any) => ({

                ...row,

                autorizar_salida:
                    Boolean(
                        row.autorizar_salida // para convertir 0 a false y 1 a true.
                    )
            })
        );
    }

    /* Buscar un contenedor por ID */
    async findById(id: number) {
        const pool = await poolPromise;

        const result = await pool
            .request()
            .input('id', sql.Int, id)
            .query('SELECT * FROM contenedor WHERE id = @id');

        return {

            ...result.recordset[0],

            autorizar_salida:
                Boolean(
                    result.recordset[0]
                        .autorizar_salida // para convertir 0 a false y 1 a true.
                )
        };
    }

    /* Para validar intento de duplicados por código ISO */
    async findByCodigoISO(
        codigoISO: string
    ) {

        const pool =
            await poolPromise;

        const result =
            await pool
                .request()

                .input(
                    'codigo_ISO',
                    sql.VarChar,
                    codigoISO
                )

                .query(`

                SELECT *

                FROM contenedor

                WHERE codigo_ISO =
                @codigo_ISO

            `);

        return result.recordset[0];
    }

    /* Registrar contenedor */
    async create(contenedor: Contenedor) {

        const pool = await poolPromise;

        const result = await pool
            .request()

            .input('codigo_ISO', sql.VarChar, contenedor.codigo_ISO)

            .input('peso_vacio', sql.Decimal(10, 2), contenedor.peso_vacio)

            .input('peso_bruto', sql.Decimal(10, 2), contenedor.peso_bruto)

            .input('estado', sql.VarChar, contenedor.estado)

            .input('ubicacion_patio', sql.VarChar, contenedor.ubicacion_patio)

            .input('viaje_asignado', sql.VarChar, contenedor.viaje_asignado)

            .input('autorizar_salida', sql.Bit, contenedor.autorizar_salida)

            .query(`
      INSERT INTO contenedor
      (
        codigo_ISO,
        peso_vacio,
        peso_bruto,
        estado,
        ubicacion_patio,
        viaje_asignado,
        autorizar_salida
      )

      OUTPUT INSERTED.*

      VALUES
      (
        @codigo_ISO,
        @peso_vacio,
        @peso_bruto,
        @estado,
        @ubicacion_patio,
        @viaje_asignado,
        @autorizar_salida
      )
    `);

        return result.recordset[0];
    }

    /* Actualizar contenedor */
    async update(id: number, contenedor: Contenedor) {

        const pool = await poolPromise;

        const result = await pool
            .request()

            .input('id', sql.Int, id)

            .input('codigo_ISO', sql.VarChar, contenedor.codigo_ISO)

            .input('peso_vacio', sql.Decimal(10, 2), contenedor.peso_vacio)

            .input('peso_bruto', sql.Decimal(10, 2), contenedor.peso_bruto)

            .input('estado', sql.VarChar, contenedor.estado)

            .input('ubicacion_patio', sql.VarChar, contenedor.ubicacion_patio)

            .input('viaje_asignado', sql.VarChar, contenedor.viaje_asignado)

            .input('autorizar_salida', sql.Bit, contenedor.autorizar_salida)

            .query(`
        UPDATE contenedor

        SET
            codigo_ISO = @codigo_ISO,
            peso_vacio = @peso_vacio,
            peso_bruto = @peso_bruto,
            estado = @estado,
            ubicacion_patio = @ubicacion_patio,
            viaje_asignado = @viaje_asignado,
            autorizar_salida = @autorizar_salida,
            fecha_actualizado = GETDATE()

        OUTPUT INSERTED.*

        WHERE id = @id
        `);

        return result.recordset[0];
    }
}