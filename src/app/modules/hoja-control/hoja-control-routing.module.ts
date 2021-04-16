import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MaestroComponent} from '@modules/hoja-control/lista-hojas/maestro/maestro.component';
import {ListaHojasComponent} from '@modules/hoja-control/lista-hojas/lista-hojas.component';

const routes: Routes = [
  {path: '', redirectTo: 'hojas-control', pathMatch: 'full'},
  {
    path: 'hojas-control',
    component: ListaHojasComponent
  },
  {
    path: 'hoja-control',
    children: [
      {
        path: '',
        component: MaestroComponent
      },
      {
        path: 'edit/:id', component: MaestroComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HojaControlRoutingModule { }
