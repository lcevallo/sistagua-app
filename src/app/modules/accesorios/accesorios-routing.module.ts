import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AccesorioComponent} from '@modules/accesorios/accesorio/accesorio.component';
import {AccesorioListaComponent} from '@modules/accesorios/accesorio-lista/accesorio-lista.component';

const routes: Routes = [
  {path: '', redirectTo: 'accesorio-lista', pathMatch: 'full'},
  {
    path: 'accesorio',
    component: AccesorioComponent
  },
  {
    path: 'accesorio-lista',
    component: AccesorioListaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccesoriosRoutingModule { }
