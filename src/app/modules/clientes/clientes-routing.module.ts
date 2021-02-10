import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClienteNaturalComponent} from '@modules/clientes/cliente-natural/cliente-natural.component';
import {ClientesListNaturalComponent} from '@modules/clientes/clientes-list-natural/clientes-list-natural.component';

const routes: Routes = [
  {
    path: '',
    component: ClienteNaturalComponent
  },
  {
    path: 'cliente-natural',
    component: ClientesListNaturalComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
