import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario';
import { UsuarioService } from '../usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styleUrl: './edit-usuario.component.css'
})

export class EditUsuarioComponent implements OnInit{
  formUsuario: FormGroup;
  permissoesNome: string[] = [];
  permissoesSelecionadas: boolean[] = [];


  constructor(
    private fb: FormBuilder,
    private usuarioService:UsuarioService, 
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar) {

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

  onSubmit() {
    if (this.formUsuario.valid) {
      let usuarioEditado: Usuario = this.formUsuario.value;
      usuarioEditado.user_permissions = this.permissoesSelecionadas.map((value, index) => value ? index : -1).filter(index => index !== -1).map(value=> value+1);
      this.usuarioService.updateUsuario(usuarioEditado.id, usuarioEditado).subscribe({
        next:()=>{
          this.snackBar.open('Usuário editado com sucesso.', 'Fechar', {
            duration: 3000, // Duração em milissegundos
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
          this.router.navigate(["/list_usuario"])
        },
        error: (error) => {
          this.snackBar.open('Erro ao editar usuário.', 'Fechar', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
        }
      });
    } else {
      this.snackBar.open('Formulário inválido.', 'Fechar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
    }
  }
}

