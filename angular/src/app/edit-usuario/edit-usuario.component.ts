import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario';
import { UsuarioService } from '../usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styleUrl: './edit-usuario.component.css'
})
export class EditUsuarioComponent implements OnInit{
  formUsuario: FormGroup;


  constructor(
    private fb: FormBuilder,
    private usuarioService:UsuarioService, 
    private route: ActivatedRoute,
    private router: Router) {

    this.formUsuario = this.fb.group({
      id: [null],
      username: ['', Validators.required],
      password: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]});

  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id){
      this.usuarioService.get_usuario_id(+id).subscribe(data=>{
        this.formUsuario.patchValue({
          id: data.id,
          username: data.username,
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email
        });

      });
    }
    
  }

  onSubmit() {
    if (this.formUsuario.valid) {
      const usuarioEditado: Usuario = this.formUsuario.value;
      console.log(usuarioEditado);
      this.usuarioService.update_usuario(usuarioEditado.id, usuarioEditado).subscribe({
        next:()=>{
          this.router.navigate(["/usuarios"])
        }
      });
    } else {
      console.log('Formulário inválido');
    }
  }
}

