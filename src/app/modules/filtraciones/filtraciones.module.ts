import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FiltracionesRoutingModule } from './filtraciones-routing.module';
import {SharedModule} from '@shared/shared.module';
import { FiltracionComponent } from './filtracion/filtracion.component';
import { FiltracionListComponent } from './filtracion-list/filtracion-list.component';


@NgModule({
  declarations: [FiltracionComponent, FiltracionListComponent],
  imports: [
    CommonModule,
    SharedModule,
    FiltracionesRoutingModule
  ]
})
export class FiltracionesModule { }
