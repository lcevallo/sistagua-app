import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {SharedModule} from '@shared/shared.module';
import {ListaHojasComponent} from '@modules/hoja-control/lista-hojas/lista-hojas.component';
import {MaestroComponent} from '@modules/hoja-control/lista-hojas/maestro/maestro.component';
import {FiltracionDetailFormComponent} from '@modules/hoja-control/lista-hojas/filtraciones/filtracion-detail-form/filtracion-detail-form.component';
import {DetalleComponent} from '@modules/hoja-control/lista-hojas/detalle/detalle.component';
import {FiltracionesComponent} from '@modules/hoja-control/lista-hojas/filtraciones/filtraciones.component';
import {AccesoriosComponent} from '@modules/hoja-control/lista-hojas/accesorios/accesorios.component';
import {AccesoriosDetailFormComponent} from '@modules/hoja-control/lista-hojas/accesorios/accesorios-detail-form/accesorios-detail-form.component';
import {HojaControlRoutingModule} from '@modules/hoja-control/hoja-control-routing.module';


@NgModule({
  declarations: [ListaHojasComponent, MaestroComponent, DetalleComponent, FiltracionesComponent, AccesoriosComponent, FiltracionDetailFormComponent, AccesoriosDetailFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    HojaControlRoutingModule
  ]
})
export class HojaControlModule { }
