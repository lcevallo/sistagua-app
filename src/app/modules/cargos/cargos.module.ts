import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CargosRoutingModule } from './cargos-routing.module';
import { TipoCargoComponent } from './tipo-cargo/tipo-cargo.component';
import { CargoComponent } from './cargo/cargo.component';
import { CargosListaComponent } from './cargos-lista/cargos-lista.component';


@NgModule({
  declarations: [TipoCargoComponent, CargoComponent, CargosListaComponent],
  imports: [
    CommonModule,
    CargosRoutingModule
  ]
})
export class CargosModule { }
