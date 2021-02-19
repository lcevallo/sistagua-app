import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccesoriosRoutingModule } from './accesorios-routing.module';
import { AccesorioListaComponent } from './accesorio-lista/accesorio-lista.component';
import { AccesorioComponent } from './accesorio/accesorio.component';
import { MaterialModule } from '@material/material.module';

@NgModule({
  declarations: [AccesorioListaComponent, AccesorioComponent],
  imports: [
    CommonModule,
    AccesoriosRoutingModule,
    MaterialModule
  ]
})
export class AccesoriosModule { }
