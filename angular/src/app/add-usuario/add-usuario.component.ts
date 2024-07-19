import { Component } from '@angular/core';
import { UsuarioService } from '../usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../usuario';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.component.html',
  styleUrl: './add-usuario.component.css'
})
export class AddUsuarioComponent {
  formUsuario: FormGroup;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router :Router) {
    this.formUsuario = this.fb.group({
      id: [0],
      username: ['', Validators.required],
      password: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.formUsuario.valid) {
      const novoUsuario: Usuario = this.formUsuario.value;
      console.log(novoUsuario);
      this.usuarioService.add_usuario(novoUsuario).subscribe({
        next:()=>{
          this.router.navigate(["/usuarios"])
        }
      })
    } else {
      console.log('Formulário inválido');
    }
  }
}
