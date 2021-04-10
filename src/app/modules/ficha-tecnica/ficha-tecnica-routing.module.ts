import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AccesorioComponent} from '@modules/accesorios/accesorio/accesorio.component';
import {AccesorioListaComponent} from '@modules/accesorios/accesorio-lista/accesorio-lista.component';
import {MaestroComponent} from '@modules/ficha-tecnica/lista-fichas/maestro/maestro.component';
import {ListaFichasComponent} from '@modules/ficha-tecnica/lista-fichas/lista-fichas.component';

const routes: Routes = [
  {path: '', redirectTo: 'fichas-tecnicas', pathMatch: 'full'},
  {
    path: 'ficha-tecnica',
    component: MaestroComponent
  },
  {
    path: 'ficha-tecnica/:id',
    component: MaestroComponent
  },
  {
    path: 'fichas-tecnicas',
    component: ListaFichasComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FichaTecnicaRoutingModule { }
