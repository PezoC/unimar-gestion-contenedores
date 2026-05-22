import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contenedor } from '../models/contenedor';

@Injectable({
  providedIn: 'root'
})
export class ContenedorService {

  private api = 'http://localhost:3000/api/contenedores';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Contenedor[]> {
    return this.http.get<Contenedor[]>(this.api);
  }

  create(contenedor: Contenedor) {
    return this.http.post(this.api, contenedor);
  }

  update(id: number, contenedor: Contenedor) {
    return this.http.put(`${this.api}/${id}`, contenedor);
  }
}