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
import { ClienteEmpresarialListOficinaComponent } from './cliente-empresarial-list-oficina/cliente-empresarial-list-oficina.component';
import { ClienteEmpresarialListCargosComponent } from './cliente-empresarial-list-cargos/cliente-empresarial-list-cargos.component';


@NgModule({
  declarations: [ClienteNaturalComponent, ClienteEmpresarialComponent,
    ClientesListNaturalComponent, ClientesListEmpresarialComponent,
    ModalClienteNaturalComponent,
    ClienteEmpresarialListOficinaComponent,
    ClienteEmpresarialListCargosComponent],
  imports: [
    SharedModule,
    ClientesRoutingModule

  ]
})
export class ClientesModule { }
