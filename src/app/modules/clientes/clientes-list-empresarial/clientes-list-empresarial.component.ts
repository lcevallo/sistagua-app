import { IclienteEmpresarial } from '@data/interfaces/icliente-empresarial';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-clientes-list-empresarial',
  templateUrl: './clientes-list-empresarial.component.html',
  styleUrls: ['./clientes-list-empresarial.component.scss']
})
export class ClientesListEmpresarialComponent implements OnInit {

  displayedColumns: string[] = ['id','codigo', 'ruc', 'cliente', 'correo','celular','cumple','foto','acciones'];
  dataSource!: MatTableDataSource<IclienteEmpresarial>;
  constructor() { }

  ngOnInit(): void {
  }

}
