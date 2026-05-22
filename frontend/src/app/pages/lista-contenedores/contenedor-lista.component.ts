import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';

import { ContenedorService }
  from '../../services/contenedor.service';

import { Contenedor }
  from '../../models/contenedor';

import {
  ChangeDetectorRef
} from '@angular/core';

import {
  EventEmitter,
  Output
} from '@angular/core';

@Component({
  selector: 'app-contenedor-lista',

  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl:
    './contenedor-lista.component.html'
})

export class ContenedorListaComponent
  implements OnInit {

  contenedores: Contenedor[] = [];

  @Output()
  editarContenedor =
    new EventEmitter<Contenedor>();

  constructor(
    private service: ContenedorService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.cargarContenedores();
  }

  editar(
    contenedor: Contenedor
  ): void {

    console.log(
      'CLICK EDITAR',
      contenedor
    );

    this.editarContenedor.emit(
      contenedor
    );
  }

  cargarContenedores(): void {

    this.service.getAll().subscribe({

      next: (response) => {
        console.log('DATA OK:', response);
        this.contenedores = [...response];
        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error('ERROR API:', error);

      }

    });
  }
}