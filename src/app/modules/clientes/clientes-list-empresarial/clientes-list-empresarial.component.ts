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

  displayedColumns: string[] = ['codigo', 'ruc', 'nombres', 'direccion','telefono','correo','acciones'];
  dataSource!: MatTableDataSource<IclienteEmpresarial>;
  texto_html: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  lista: IclienteEmpresarial[] = [];
  constructor(private clienteEmpresarialServices: ClienteEmpresarialService ) { }

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.clienteEmpresarialServices.getAllClientesEmpresarial().subscribe(
      r => {
        if (!r.error) {
          console.log(r.data);
          this.lista = r.data;
          this.dataSource = new MatTableDataSource(this.lista);
          this.dataSource.paginator = this.paginator;
        }
        else{
        }
      });
  }
  buscar(value:string){
    if(value.length > 1) {
      let filtrado = this.lista.filter( empresa =>
        empresa.nombres.toLowerCase().includes(value.toLowerCase()) ||
        empresa.correo.toLowerCase().includes(value.toLowerCase()) ||
        empresa.codigo.toLowerCase().includes(value.toLowerCase()) ||
        empresa.ruc.includes(value));

        this.dataSource = new MatTableDataSource(filtrado);
        this.dataSource.paginator = this.paginator;
    }else {
      this.listar();
    }
  }
  buscar2(buscar:string) {
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
    let nombre_empresa='';
    this.clienteEmpresarialServices.getById(id)
        .subscribe(data => {
          console.log(data.data);
          for (let key in data.data.cliente_empresarial) {
            let empresarial = data.data.cliente_empresarial[key];
            nombre_empresa = empresarial.nombres;
            this.texto_html +='<p style="text-align:left;margin:0">RUC: '+ empresarial.ruc +'</p>';
            this.texto_html +='<p style="text-align:left;margin:0">Código: '+ empresarial.codigo +'</p>';
            if(empresarial.telefono)
              this.texto_html +='<p style="text-align:left;margin:0">Teléfono: '+ empresarial.telefono +'</p>';
            // Use `key` and `value`
          }

          this.texto_html +='<h3 style="text-align:left;margin-top:15px;margin-left:0px;border-bottom:1px solid #c7c7c7;">Contáctos:</h3>';
          this.texto_html +='<ul>';
          for (let key in data.data.cargos) {
            let cargo = data.data.cargos[key];
            this.texto_html +='<li><p style="text-align:left;margin:0">'+ cargo.nombres +' '+cargo.apellidos +'</p>';
            this.texto_html +='<p style="text-align:left;margin:0">Cargo: '+ cargo.tipo +'</p>';
            if(cargo.celular)
              this.texto_html +='<p style="text-align:left;margin:0">Celular: '+ cargo.celular +'</p></li>';
            // Use `key` and `value`
          }
          this.texto_html +='</ul>';
          this.texto_html +='<h3 style="text-align:left;margin-top:15px;margin-left:0px;border-bottom:1px solid #c7c7c7;">Direcciones:</h3>';
          this.texto_html +='<ul>';
          for (let key in data.data.oficinas) {
            let oficina = data.data.oficinas[key];
            this.texto_html +='<li><p style="text-align:left;margin:0">Ciudad: '+ oficina.canton +' - Parroquia: '+oficina.parroquia +'</p>';
            this.texto_html +='<p style="text-align:left;margin:0">Sector: '+ oficina.sector +'</p>';
            this.texto_html +='<p style="text-align:left;margin:0">Direción: '+ oficina.direccion +'</p></li>';
          }
          this.texto_html +='</ul>';


          swal.fire({
            title: '<strong>Empresa: '+nombre_empresa+'</strong>',
            html: this.texto_html,
            showCloseButton: true,
            showCancelButton: true,
            showConfirmButton: false,
            cancelButtonText:'Cerrar'
          })


        })

  }
}
