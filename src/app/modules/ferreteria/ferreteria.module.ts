import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FerreteriaRoutingModule } from './ferreteria-routing.module';
import { ListaComponent } from './lista/lista.component';
import { ItemComponent } from './item/item.component';


@NgModule({
  declarations: [ListaComponent, ItemComponent],
  imports: [
    CommonModule,
    FerreteriaRoutingModule
  ]
})
export class FerreteriaModule { }
