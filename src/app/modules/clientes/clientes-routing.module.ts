import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClienteNaturalComponent} from '@modules/clientes/cliente-natural/cliente-natural.component';
import {ClientesListNaturalComponent} from '@modules/clientes/clientes-list-natural/clientes-list-natural.component';

const routes: Routes = [
  {path: '', redirectTo: 'clientes-natural-lista', pathMatch: 'full'},

  {
    path: 'cliente-natural',
    component: ClienteNaturalComponent
  },
  {
    path: 'clientes-natural-lista',
    component: ClientesListNaturalComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
