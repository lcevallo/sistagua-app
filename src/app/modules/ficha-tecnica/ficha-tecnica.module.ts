import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FichaTecnicaRoutingModule } from './ficha-tecnica-routing.module';
import { MaestroComponent } from './maestro/maestro.component';
import { DetalleComponent } from './detalle/detalle.component';
import { FiltracionesComponent } from './filtraciones/filtraciones.component';
import { AccesoriosComponent } from './accesorios/accesorios.component';
import {SharedModule} from '@shared/shared.module';
import { ListaFichasComponent } from './lista-fichas/lista-fichas.component';


@NgModule({
  declarations: [MaestroComponent, DetalleComponent, FiltracionesComponent, AccesoriosComponent, ListaFichasComponent],
  imports: [
    CommonModule,
    SharedModule,
    FichaTecnicaRoutingModule
  ]
})
export class FichaTecnicaModule { }
