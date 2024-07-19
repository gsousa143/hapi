import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url: string = "http://127.0.0.1:8000/api/"

  constructor(private http: HttpClient) { }
  add_usuario(usuario:Usuario){
    return this.http.post<Usuario>(`${this.url+'usuario/'}`, usuario);
  }
  get_usuarios(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`${this.url+'usuario/'}`);
  }
  get_usuario_id(id:number): Observable<Usuario>{
    return this.http.get<Usuario>(`${this.url+'usuario/'}+${id}`);
  }

  update_usuario(id:number, usuario:Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.url+'usuario/'}+${id}`,usuario);
  }

  delete_usuario(id:number): Observable<Usuario>{
    return this.http.delete<Usuario>(`${this.url+'usuario/'}+${id}`);
  }
}
