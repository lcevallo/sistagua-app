import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FiltracionListComponent} from '@modules/filtraciones/filtracion-list/filtracion-list.component';
import {FiltracionComponent} from '@modules/filtraciones/filtracion/filtracion.component';

const routes: Routes = [
  {path: '', redirectTo: 'filtraciones-lista', pathMatch: 'full'},
  {
    path: 'filtraciones-lista',
    component: FiltracionListComponent
  },
  {
    path: 'filtracion/:id',
    component: FiltracionComponent
  },
  {
    path: 'filtracion',
    component: FiltracionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FiltracionesRoutingModule { }
