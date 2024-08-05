import { Component } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { Usuario } from '../usuario';
import { MatTableDataSource } from '@angular/material/table';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-list-usuario',
  templateUrl: './list-usuario.component.html',
  styleUrl: './list-usuario.component.css'
})
export class ListUsuarioComponent implements OnInit{
  usuarios: Usuario[] = []
  permissoesNome: string[] = [];
  permissoesSelecionadas: boolean[] = [];
  displayedColumns: string[] = ['id', 'username', 'email', 'name','actions'];
  dataSource = new MatTableDataSource<Usuario>();


  constructor(private usuarioService: UsuarioService){}

  ngOnInit(): void {
    this.usuarioService.getUsuarios().subscribe(data=>{
      this.usuarios = data;
    });
    
  }

  deleteUsuario(id:number){
    this.usuarioService.deleteUsuario(id).subscribe(data=>{
      this.ngOnInit();
    });
  }
}