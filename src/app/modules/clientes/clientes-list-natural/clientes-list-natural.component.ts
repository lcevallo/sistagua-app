import { Component, OnInit, ViewChild } from '@angular/core';
import {ClienteNaturalService} from '@data/services/api/cliente-natural.service';
import {IclienteNatural} from '@data/interfaces/icliente-natural';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-clientes-list-natural',
  templateUrl: './clientes-list-natural.component.html',
  styleUrls: ['./clientes-list-natural.component.scss']
})
export class ClientesListNaturalComponent implements OnInit {

  displayedColumns: string[] = ['id','codigo', 'ruc', 'cliente', 'correo','celular','cumple','foto','acciones'];
  // tslint:disable-next-line:variable-name
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public clientes_naturales_list: IclienteNatural[] = [];
  dataSource!: MatTableDataSource<IclienteNatural>;

  constructor(private clienteNaturalService: ClienteNaturalService) {

  }

  ngOnInit(): void {


    // this.clienteNaturalService.getClientesNaturalesForStepperByIdCliente(1).subscribe(
    //   r => {
    //     if (!r.error) {
    //       console.log(r.data);
    //     }
    //     else{
    //       console.log("Estoy en el else");
    //       console.log(r.error);
    //     }
    //   }
    // )

    this.clienteNaturalService.getAllClientesNaturales().subscribe(
      r => {
        if (!r.error) {
          this.clientes_naturales_list = r.data;
          this.dataSource = new MatTableDataSource(r.data);
          this.dataSource.paginator = this.paginator;
        }
        else{
        }
      }
    );
  }

  nuevoCliente() {

  }

}
