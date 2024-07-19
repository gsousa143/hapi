import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-view-usuario',
  templateUrl: './view-usuario.component.html',
  styleUrl: './view-usuario.component.css'
})
export class ViewUsuarioComponent implements OnInit{
  usuarios: any | undefined


  constructor(private usuarioService: UsuarioService){}

  ngOnInit(): void {
    this.usuarioService.get_usuarios().subscribe(data=>{
      this.usuarios = data;
    });
  }

  delete_usuario(id:number){
    this.usuarioService.delete_usuario(id).subscribe(data=>{
      this.ngOnInit();
    });
  }
}
