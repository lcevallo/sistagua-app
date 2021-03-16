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
    this.listar();
  }
  listar() {
    this.clienteNaturalService.getAllClientesNaturales().subscribe(
      r => {
        if (!r.error) {
          this.clientes_naturales_list = r.data;
          console.log(r.data)
          this.dataSource = new MatTableDataSource(r.data);
          this.dataSource.paginator = this.paginator;
        }
        else{
        }
      });
  }
  buscar(buscar:string) {
    if(buscar.length > 1) {
      const regex = /^[0-9]*$/;
      const numeros = regex.test(buscar); // true, en casa de ser false, quiere decir que busca por nombre
      numeros ? buscar = `ruc=${buscar}` : buscar = `apellido1=${buscar}`
      this.clienteNaturalService.getClienteByCedula(buscar)
      .subscribe(  r => {
        if (!r.error) {
          this.clientes_naturales_list = r.data;
          this.dataSource = new MatTableDataSource(r.data);
          this.dataSource.paginator = this.paginator;
        }
          else{
        }
      });
    } else {
      this.listar();
    }
  }
  estadoCliente(id: number) {
    this.clienteNaturalService.estado(id)
      .subscribe(data => {
        if (!data.error) {
          this.listar();
        }
      })
  }
}
