import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario';
import { UsuarioService } from '../usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { MatCheckboxChange } from '@angular/material/checkbox';


@Component({
  selector: 'app-view-usuario',
  templateUrl: './view-usuario.component.html',
  styleUrl: './view-usuario.component.css'
})
export class ViewUsuarioComponent implements OnInit{
  formUsuario: FormGroup;
  permissoesNome: string[] = [];
  permissoesSelecionadas: boolean[] = [];


  constructor(
    private fb: FormBuilder,
    private usuarioService:UsuarioService, 
    private route: ActivatedRoute,
    private router: Router) {

    this.formUsuario = this.fb.group({
      id: [],
      username: ['', Validators.required],
      password: [''],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      user_permissions: []})
    }

    ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
      
      if (id) {
        forkJoin({
          usuario: this.usuarioService.getUsuario_id(+id),
          permissoes: this.usuarioService.getPermissoes()
        }).subscribe(({ usuario, permissoes }) => {
          this.formUsuario.patchValue({
            id: usuario.id,
            username: usuario.username,
            first_name: usuario.first_name,
            password: usuario.password,
            last_name: usuario.last_name,
            email: usuario.email,
            user_permissions: usuario.user_permissions,
          });
    

          for (let i = 0; i < permissoes.length; i += 4) {
            this.permissoesNome.push(permissoes[i].name.split(' ').slice(2).join(' ').toUpperCase());
          } 
          this.permissoesSelecionadas = Array(permissoes.length).fill(false);
    

          usuario.user_permissions.forEach((index: number) => {
            this.permissoesSelecionadas[index - 1] = true;
          });
    
        });
      }
    }

  onPermissionChange(event: MatCheckboxChange, index: number) {
    this.permissoesSelecionadas[index] = event.checked;
  }

}