import { Component } from '@angular/core';

import { ContenedorFormularioComponent }
  from './pages/formulario-contenedores/contenedor-formulario.component';

import { ContenedorListaComponent }
  from './pages/lista-contenedores/contenedor-lista.component';

import { Contenedor }
  from './models/contenedor';

import { CommonModule }
  from '@angular/common';

@Component({
  selector: 'app-root',

  standalone: true,

  imports: [
    ContenedorFormularioComponent,
    ContenedorListaComponent,
    CommonModule
  ],

  templateUrl: './app.html'
})

export class App {

  mostrarModal = false;

  contenedorModal: Contenedor | null = null;

  nuevoContenedor(): void {

    this.contenedorModal = null;

    this.mostrarModal = true;
  }

  seleccionarContenedor(
    contenedor: Contenedor
  ): void {

    console.log(
      'ABRIR MODAL'
    );

    this.contenedorModal = { ...contenedor };

    this.mostrarModal = true;
  }


  cerrarModal(): void {

    this.mostrarModal = false;

    this.contenedorModal = null;
  }
}