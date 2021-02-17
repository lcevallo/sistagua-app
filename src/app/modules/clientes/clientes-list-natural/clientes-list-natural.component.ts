import { Component, OnInit } from '@angular/core';
import {ClienteNaturalService} from '@data/services/api/cliente-natural.service';
import {IclienteNatural} from '@data/interfaces/icliente-natural';


@Component({
  selector: 'app-clientes-list-natural',
  templateUrl: './clientes-list-natural.component.html',
  styleUrls: ['./clientes-list-natural.component.scss']
})
export class ClientesListNaturalComponent implements OnInit {

  displayedColumns: string[] = ['codigo', 'ruc', 'cliente', 'correo','celular','cumple','foto','acciones'];
  //dataSource = ELEMENT_DATA;
  // tslint:disable-next-line:variable-name
  public clientes_naturales_list: IclienteNatural[] = [];

  constructor(private clienteNaturalService: ClienteNaturalService) {

  }

  ngOnInit(): void {

    this.clienteNaturalService.getAllClientesNaturales().subscribe(
      r => {
        if (!r.error) {
          console.log(r);
          this.clientes_naturales_list = r.data;
        }
        else{
          console.log("Estoy en el else");
          console.log(r.error);
        }
      }
    );
  }

  nuevoCliente() {

  }

}
