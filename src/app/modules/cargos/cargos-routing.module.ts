import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CargosListaComponent} from '@modules/cargos/cargos-lista/cargos-lista.component';
import {CargoComponent} from '@modules/cargos/cargo/cargo.component';
import {TipoCargoComponent} from '@modules/cargos/tipo-cargo/tipo-cargo.component';

const routes: Routes = [
  {path: '', redirectTo: 'cargos-lista', pathMatch: 'full'},
  {
    path: 'tipo-cargo',
    component: TipoCargoComponent
  },
  {
    path: 'cargo/:id',
    component: CargoComponent
  },
  {
    path: 'cargo',
    component: CargoComponent
  },
  {
    path: 'cargos-lista',
    component: CargosListaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CargosRoutingModule { }
