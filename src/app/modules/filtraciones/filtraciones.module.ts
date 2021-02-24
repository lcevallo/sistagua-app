import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FiltracionesRoutingModule } from './filtraciones-routing.module';
import { MaterialModule } from '@material/material.module';
import {SharedModule} from '@shared/shared.module';
import { FiltracionComponent } from './filtracion/filtracion.component';
import { FiltracionListComponent } from './filtracion-list/filtracion-list.component';


@NgModule({
  declarations: [FiltracionComponent, FiltracionListComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    FiltracionesRoutingModule
  ]
})
export class FiltracionesModule { }
