import { ContenedorRepository } from '../repositories/contenedor.repository';
import { validarISO6346 } from '../utils/isoValidators';
import { Contenedor } from '../entities/contenedor.entity';

export class ContenedorService {

    private repository = new ContenedorRepository();

    async getAll() {
        return this.repository.findAll();
    }

    async getById(id: number) {
        return this.repository.findById(id);
    }

    async create(contenedor: Contenedor) {

        // ============================
        // CAMPOS OBLIGATORIOS
        // ============================

        if (!contenedor.codigo_ISO?.trim()) {

            throw new Error(
                'El código ISO es obligatorio'
            );
        }

        if (

            contenedor.peso_vacio ===
            null ||

            contenedor.peso_vacio ===
            undefined ||

            contenedor.peso_vacio <= 0

        ) {

            throw new Error(
                'El peso vacío es obligatorio'
            );
        }

        if (

            contenedor.peso_bruto ===
            null ||

            contenedor.peso_bruto ===
            undefined ||

            contenedor.peso_bruto <= 0

        ) {

            throw new Error(
                'El peso bruto es obligatorio'
            );
        }

        if (!contenedor.estado) {

            throw new Error(
                'El estado es obligatorio'
            );
        }

        // =========================
        // VALIDAR DUPLICADO ISO
        // =========================

        const existente = await this.repository.findByCodigoISO(contenedor.codigo_ISO);

        if (existente) {

            throw new Error(

                'El código ISO ya existe'
            );
        }

        // =================================
        // VALIDACIONES DE REGLAS DE NEGOCIO
        // =================================

        if (!validarISO6346(contenedor.codigo_ISO)) {
            throw new Error('Formato ISO 6346 inválido');
        }

        if (contenedor.peso_bruto <= contenedor.peso_vacio) {
            throw new Error('El peso bruto debe ser mayor que el peso vacio (tara)');
        }

        return this.repository.create(contenedor);
    }

    async update(id: number, contenedor: Contenedor) {

        // ============================
        // CAMPOS OBLIGATORIOS
        // ============================

        if (!contenedor.codigo_ISO?.trim()) {

            throw new Error(
                'El código ISO es obligatorio'
            );
        }

        if (

            contenedor.peso_vacio ===
            null ||

            contenedor.peso_vacio ===
            undefined ||

            contenedor.peso_vacio <= 0

        ) {

            throw new Error(
                'El peso vacío es obligatorio'
            );
        }

        if (

            contenedor.peso_bruto ===
            null ||

            contenedor.peso_bruto ===
            undefined ||

            contenedor.peso_bruto <= 0

        ) {

            throw new Error(
                'El peso bruto es obligatorio'
            );
        }

        if (!contenedor.estado) {

            throw new Error(
                'El estado es obligatorio'
            );
        }
        
        // =========================
        // VALIDAR DUPLICADO ISO
        // =========================
        const existente = await this.repository.findByCodigoISO(contenedor.codigo_ISO);

        if (

            existente &&

            existente.id !== id

        ) {

            throw new Error(

                'El código ISO ya existe'
            );
        }

        const contenedorActual = await this.repository.findById(id);

        if (!contenedorActual) {
            throw new Error('Contenedor no encontrado');
        }

        if (!validarISO6346(contenedor.codigo_ISO)) {
            throw new Error('Formato ISO 6346 inválido');
        }

        if (contenedor.peso_bruto <= contenedor.peso_vacio) {
            throw new Error('El peso bruto debe ser mayor que el peso vacio');
        }

        const inmovilizado = contenedor.estado === 'Inmovilizado (Aduanas/Senasa)';

        if (inmovilizado) {

            if (contenedor.ubicacion_patio || contenedor.viaje_asignado || contenedor.autorizar_salida) {
                throw new Error(
                    'Un contenedor inmovilizado no puede tener ubicación, viaje asignado ni salida autorizada'
                );
            }
        }

        return this.repository.update(id, contenedor);
    }
}