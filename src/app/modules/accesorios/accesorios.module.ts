import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccesoriosRoutingModule } from './accesorios-routing.module';
import { AccesorioListaComponent } from './accesorio-lista/accesorio-lista.component';
import { AccesorioComponent } from './accesorio/accesorio.component';


@NgModule({
  declarations: [AccesorioListaComponent, AccesorioComponent],
  imports: [
    CommonModule,
    AccesoriosRoutingModule
  ]
})
export class AccesoriosModule { }
