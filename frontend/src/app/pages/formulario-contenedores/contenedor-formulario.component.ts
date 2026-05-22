import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import {

  Component,

  Input,

  OnChanges,

  SimpleChanges

} from '@angular/core';

import { ContenedorService } from '../../services/contenedor.service';

import { Contenedor } from '../../models/contenedor';

import { ChangeDetectorRef } from '@angular/core';

@Component({

  selector: 'app-contenedor-formulario',

  standalone: true,

  imports: [

    CommonModule,

    FormsModule
  ],

  templateUrl: './contenedor-formulario.component.html'
})

export class ContenedorFormularioComponent implements OnChanges {

  @Input()

  contenedorModal: Contenedor | null = null;

  contenedor: Contenedor = {

    codigo_ISO: '',

    peso_vacio: 0,

    peso_bruto: 0,

    estado: 'Disponible',

    ubicacion_patio: '',

    viaje_asignado: '',

    autorizar_salida: false
  };

  errorMessage = '';

  constructor(

    private service:
      ContenedorService,

    private cdr:
      ChangeDetectorRef

  ) { }

  ngOnChanges(
    changes: SimpleChanges
  ): void {

    if (this.contenedorModal) {

      this.contenedor = {

        ...this.contenedorModal
      };

    } else {

      this.limpiarFormulario();
    }
  }

  limpiarFormulario(): void {

    this.contenedor = {

      codigo_ISO: '',

      peso_vacio: 0,

      peso_bruto: 0,

      estado: 'Disponible',

      ubicacion_patio: '',

      viaje_asignado: '',

      autorizar_salida: false
    };
  }

  // =========================
  // VALIDACIÓN ISO 6346
  // =========================

  validarISO6346(): boolean {

    const regex =
      /^[A-Z]{4}[0-9]{7}$/;

    return regex.test(
      this.contenedor.codigo_ISO
    );
  }

  // =========================
  // VALIDACIÓN ESTADO
  // =========================

  validarEstado(): boolean {

    if (

      this.contenedor.estado ===
      'Inmovilizado (Aduanas/Senasa)'

      &&

      this.contenedor.viaje_asignado

    ) {

      this.errorMessage =
        'Un contenedor inmovilizado no puede tener ubicación, viaje asignado ni salida autorizada';

      return false;
    }

    return true;
  }

  // =========================
  // GUARDAR
  // =========================

  save(): void {

    this.errorMessage = '';

    // ============================
    // CAMPOS OBLIGATORIOS
    // ============================

    if (!this.contenedor.codigo_ISO?.trim()) {

      this.errorMessage =
        'El código ISO es obligatorio';

      return;
    }

    if (

      this.contenedor.peso_vacio ===
      null ||

      this.contenedor.peso_vacio ===
      undefined ||

      this.contenedor.peso_vacio <= 0

    ) {

      this.errorMessage =
        'El peso vacío es obligatorio';

      return;
    }

    if (

      this.contenedor.peso_bruto ===
      null ||

      this.contenedor.peso_bruto ===
      undefined ||

      this.contenedor.peso_bruto <= 0

    ) {

      this.errorMessage =
        'El peso bruto es obligatorio';

      return;
    }

    if (!this.contenedor.estado) {

      this.errorMessage =
        'El estado es obligatorio';

      return;
    }

    // ===== VALIDAR ISO =====

    if (!this.validarISO6346()) {

      this.errorMessage =
        'El código ISO debe tener 4 letras y 7 números';

      return;
    }

    // ===== VALIDAR ESTADO =====

    if (!this.validarEstado()) {

      return;
    }

    // =========================
    // UPDATE
    // =========================

    if (this.contenedor.id) {

      this.service.update(

        this.contenedor.id,

        this.contenedor

      ).subscribe({

        next: () => {

          alert(
            'Contenedor actualizado correctamente'
          );

          window.location.reload();
        },

        error: (error) => {

          //console.error(error);

          this.errorMessage =

            error?.error?.message ||

            'Ocurrió un error inesperado';

          this.cdr.detectChanges();
        }
      });
    }

    // =========================
    // CREATE
    // =========================

    else {

      this.service.create(
        this.contenedor
      ).subscribe({

        next: () => {

          alert(
            'Contenedor registrado correctamente'
          );

          window.location.reload();
        },

        error: (error) => {

          //console.error(error);

          this.errorMessage =

            error?.error?.message ||

            'Ocurrió un error inesperado';

          this.cdr.detectChanges();
        }
      });
    }
  }

  onEstadoChange(): void {

    if (

      this.contenedor.estado ===
      'Inmovilizado (Aduanas/Senasa)'

    ) {

      this.contenedor.viaje_asignado = '';

      this.contenedor.ubicacion_patio = '';

      this.contenedor.autorizar_salida = false;
    }
  }
}