import { IclienteEmpresarial } from '@data/interfaces/icliente-empresarial';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ClienteEmpresarialService } from '@data/services/api/cliente-empresarial.service';
import { MatPaginator } from '@angular/material/paginator';
import swal from 'sweetalert2';

@Component({
  selector: 'app-clientes-list-empresarial',
  templateUrl: './clientes-list-empresarial.component.html',
  styleUrls: ['./clientes-list-empresarial.component.scss']
})
export class ClientesListEmpresarialComponent implements OnInit {

  displayedColumns: string[] = ['id','codigo', 'ruc', 'nombres', 'direccion','telefono','correo','acciones'];
  dataSource!: MatTableDataSource<IclienteEmpresarial>;
  texto_html: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private clienteEmpresarialServices: ClienteEmpresarialService ) { }

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.clienteEmpresarialServices.getAllClientesEmpresarial().subscribe(
      r => {
        if (!r.error) {
          console.log(r.data);
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
      numeros ? buscar = `ruc=${buscar}` : buscar = `nombres=${buscar}`
      this.clienteEmpresarialServices.getClienteByRuc(buscar)
      .subscribe(  r => {
        if (!r.error) {
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

  ver(id: number) {
    this.texto_html = '';
    this.clienteEmpresarialServices.getById(id)
        .subscribe(data => {
          console.log(data.data.cliente_empresarial);
          for (let key in data.data.cliente_empresarial) {
            let empresarial = data.data.cliente_empresarial[key];
            this.texto_html +='<ul><li>'+ empresarial.nombres +'</li>';
            this.texto_html +='<li>'+ empresarial.ruc +'</li></ul>';
            // Use `key` and `value`
          }

          swal.fire({
            title: '<strong>Cliente Empresarial</strong>',
            html: this.texto_html,
            showCloseButton: true,
            showCancelButton: true,
            showConfirmButton: false,
            cancelButtonText:'Cerrar'
          })


        })

  }
}
