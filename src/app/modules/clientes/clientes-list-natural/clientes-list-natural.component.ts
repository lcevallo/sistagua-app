import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import {ClienteNaturalService} from '@data/services/api/cliente-natural.service';
import {IclienteNatural, iClienteNaturalSend, iDireccionCNSend, iParentescoCNSend} from '@data/interfaces/icliente-natural';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CiudadesService } from '@data/services/api/ciudades.service';
import { ICiudades } from '@data/interfaces/i-ciudades';
import { ParroquiasService } from '@data/services/api/parroquias.service';
import { IParroquias } from '@data/interfaces/i-parroquias';


@Component({
  selector: 'app-clientes-list-natural',
  templateUrl: './clientes-list-natural.component.html',
  styleUrls: ['./clientes-list-natural.component.scss']
})
export class ClientesListNaturalComponent implements OnInit {

  displayedColumns: string[] = ['codigo', 'ruc', 'cliente', 'correo','celular','cumple', 'publish', 'acciones'];
  // tslint:disable-next-line:variable-name
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public clientes_naturales_list: IclienteNatural[] = [];
  dataSource!: MatTableDataSource<IclienteNatural>;

  clienteNatural: iClienteNaturalSend[] = [];
  direccionesCN: iDireccionCNSend[] = [];
  parentescoCN: iParentescoCNSend[] = [];

  constructor(private clienteNaturalService: ClienteNaturalService,
              public dialog: MatDialog) {

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

  openDialog(cliente: any) {
    this.clienteNaturalService.getById(cliente.id)
        .subscribe(data => {
          console.log(data.data);
          this.clienteNatural = JSON.parse(data.data.cliente_natural) as iClienteNaturalSend[];
          console.log(this.clienteNatural);

          this.direccionesCN = JSON.parse(data.data.direcciones) as iDireccionCNSend[];

          this.parentescoCN = JSON.parse(data.data.parentesco) as iParentescoCNSend[];

          this.dialog.open(ModalClienteNatural, {
            data: {
              cliente: this.clienteNatural,
              direccion: this.direccionesCN,
              parentesco: this.parentescoCN
            }
          });
        })
  }
}

@Component({
  selector: 'modal-cliente-natural',
  templateUrl: './modal-cliente-natural.html',
})
export class ModalClienteNatural {

  ciudades: ICiudades[] = [];
  nombreCiudad: string = '';

  parroquias: IParroquias[] = [];
  nombreParroquia: string = '';
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
            private ciudadesServices: CiudadesService,
            private parroquiasServices: ParroquiasService) {
    this.getCiudad(data.direccion.fk_provincia, data.direccion.fk_canton);
    this.getParroquia(data.direccion.fk_canton, data.direccion.fk_parroquia);
  }

  getCiudad(id: number, idCiudad: number) {
    this.ciudadesServices.lista_ciudades(id)
      .subscribe( data => {
        this.ciudades = data['cantones'] as [];
        let ciudad = this.ciudades.filter(c => c.id == idCiudad);
        this.nombreCiudad = ciudad[0].canton
      });
  }

  getParroquia(id: number, idParroquia: number) {
    this.parroquiasServices.lista_parroquias(id)
      .subscribe( data => {
        this.parroquias = data['parroquias'] as [];
        let parroquia = this.parroquias.filter(c => c.id == idParroquia);
        this.nombreParroquia = parroquia[0].parroquia;
      });
  }
}
