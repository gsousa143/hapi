import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddUsuarioComponent } from './add-usuario/add-usuario.component';
import { ViewUsuarioComponent } from './view-usuario/view-usuario.component';
import { EditUsuarioComponent } from './edit-usuario/edit-usuario.component';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"add_usuario", component:AddUsuarioComponent},
  {path:"usuarios", component:ViewUsuarioComponent},
  {path:"usuario/:id",component:EditUsuarioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
