import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../usuario';
import {  Router } from '@angular/router';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.component.html',
  styleUrl: './add-usuario.component.css'
})

export class AddUsuarioComponent implements OnInit{
  formUsuario: FormGroup;
  permissoesNome: string[] = [];
  permissoesSelecionadas: boolean[] = [];

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router :Router,
    private snackBar: MatSnackBar) {
    this.formUsuario = this.fb.group({
      id: [],
      username: ['', Validators.required],
      password: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      user_permissions: []
    });
  }
  onPermissionChange(event: MatCheckboxChange, index: number) {
    this.permissoesSelecionadas[index] = event.checked;
  }

  onSubmit() {
    if (this.formUsuario.valid) {
      let novoUsuario: Usuario = this.formUsuario.value;
      novoUsuario.user_permissions = this.permissoesSelecionadas
        .map((value, index) => value ? index : -1)
        .filter(index => index !== -1)
        .map(value => value + 1);
  
      this.usuarioService.addUsuario(novoUsuario).subscribe({
        next: () => {
          this.snackBar.open('Usuário adicionado com sucesso.', 'Fechar', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
          this.router.navigate(['/usuarios']);
        },
        error: (error) => {
          this.snackBar.open('Erro ao adicionar usuário.', 'Fechar', {
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
  

  ngOnInit(): void {
     this.usuarioService.getPermissoes().subscribe(data=>{
      for (let i = 0; i < data.length; i += 4) {
        this.permissoesNome.push(data[i].name.split(' ').slice(2).join(' ').toUpperCase());
      } 
      this.permissoesSelecionadas = Array(data.length).fill(false); 
     })
  }
}
