import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FichaTecnicaRoutingModule } from './ficha-tecnica-routing.module';
import { MaestroComponent } from './lista-fichas/maestro/maestro.component';
import { DetalleComponent } from './lista-fichas/detalle/detalle.component';
import { FiltracionesComponent } from './lista-fichas/filtraciones/filtraciones.component';
import { AccesoriosComponent } from './lista-fichas/accesorios/accesorios.component';
import {SharedModule} from '@shared/shared.module';
import { ListaFichasComponent } from './lista-fichas/lista-fichas.component';
import { FiltracionDetailFormComponent } from './lista-fichas/filtraciones/filtracion-detail-form/filtracion-detail-form.component';
import { AccesoriosDetailFormComponent } from './lista-fichas/accesorios/accesorios-detail-form/accesorios-detail-form.component';



@NgModule({
  declarations: [MaestroComponent, DetalleComponent, FiltracionesComponent, AccesoriosComponent, ListaFichasComponent, FiltracionDetailFormComponent, AccesoriosDetailFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    FichaTecnicaRoutingModule,

  ]
})
export class FichaTecnicaModule { }
