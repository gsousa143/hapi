import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Permissao } from './permissao';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url: string = "http://127.0.0.1:8000/api/"

  constructor(private http: HttpClient) { }
  addUsuario(usuario:Usuario){
    return this.http.post<Usuario>(`${this.url+'usuario/'}`, usuario);
  }
  getUsuarios(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${this.url+'usuario/'}`);
  }
  getUsuario_id(id:number): Observable<Usuario>{
    return this.http.get<Usuario>(`${this.url+'usuario/'}+${id}`);
  }

  updateUsuario(id:number, usuario:Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.url+'usuario/'}+${id}`,usuario);
  }

  deleteUsuario(id:number): Observable<Usuario>{
    return this.http.delete<Usuario>(`${this.url+'usuario/'}+${id}`);
  }

  getPermissoes(): Observable<Permissao[]>{
    return this.http.get<Permissao[]>(`${this.url+'permissao/'}`);
  }
}
