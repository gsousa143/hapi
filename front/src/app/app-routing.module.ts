import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddUsuarioComponent } from './add-usuario/add-usuario.component';
import { EditUsuarioComponent } from './edit-usuario/edit-usuario.component';
import { ListUsuarioComponent } from './list-usuario/list-usuario.component';
import { ViewUsuarioComponent } from './view-usuario/view-usuario.component';


const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"add_usuario", component:AddUsuarioComponent},
  {path:"list_usuario", component:ListUsuarioComponent},
  {path:"edit_usuario/:id",component:EditUsuarioComponent},
  {path:"view_usuario/:id",component:ViewUsuarioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
