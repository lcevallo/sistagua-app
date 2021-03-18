import { NgModule } from '@angular/core';

import { ClientesRoutingModule } from './clientes-routing.module';
import {SharedModule} from '@shared/shared.module';
import {ClienteNaturalComponent} from '@modules/clientes/cliente-natural/cliente-natural.component';
import {ClienteEmpresarialComponent} from '@modules/clientes/cliente-empresarial/cliente-empresarial.component';
import {
  ClientesListNaturalComponent,
  ModalClienteNaturalComponent
} from '@modules/clientes/clientes-list-natural/clientes-list-natural.component';
import {ClientesListEmpresarialComponent} from '@modules/clientes/clientes-list-empresarial/clientes-list-empresarial.component';


@NgModule({
  declarations: [ClienteNaturalComponent, ClienteEmpresarialComponent,
    ClientesListNaturalComponent, ClientesListEmpresarialComponent,
    ModalClienteNaturalComponent],
  imports: [
    SharedModule,
    ClientesRoutingModule,

  ]
})
export class ClientesModule { }
