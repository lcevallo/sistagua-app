import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IAccesorios } from '@data/interfaces/i-accesorios';
import { AccesoriosService } from '@data/services/api/accesorios.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-accesorio-lista',
  templateUrl: './accesorio-lista.component.html',
  styleUrls: ['./accesorio-lista.component.scss']
})
export class AccesorioListaComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'codigo', 'descripcion', 'acciones'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<IAccesorios>;

  constructor(private accesorioServices: AccesoriosService) { }

  ngOnInit(): void {
    this.listar();
  }
  listar() {
    this.accesorioServices.getAllAccesorios()
      .subscribe(
        r => {
          if (!r.error) {
            console.log(r);
            this.dataSource = new MatTableDataSource(r.data);
            this.dataSource.paginator = this.paginator;
          }
          else{
            console.log("Estoy en el else");
          }
        });
  }
  buscar(buscar:string) {
    if(buscar.length > 1) {
      const regex = /^[0-9]*$/;
      const numeros = regex.test(buscar); // true, en casa de ser false, quiere decir que busca por nombre
      numeros ? buscar = `codigo=${buscar}` : buscar = `nombre=${buscar}`
      this.accesorioServices.getByNombre(buscar)
      .subscribe(  r => {
        if (!r.error) {
          this.dataSource = new MatTableDataSource(r.data);
          this.dataSource.paginator = this.paginator;
        }
        else{
          console.log(r.error);
        }
      });
    } else {
      this.listar();
    }
  }
  borrar(id: number) {
    this.accesorioServices.eliminar(id)
      .subscribe(r => {
        if (!r.error) {
          this.alertRespuesta(id, 'El Registro se Eliminó con éxito')
          this.listar();
        }
        else{
          this.alertRespuesta(0, 'El Registro se No fue Eliminado')
        }
      });
  }

  alertRespuesta(id: number, message: string) {
    if (id > 0) {
      swal.fire({
        icon: 'success',
        title: `${message}`,
        confirmButtonText: 'Ok',
      })
    } else {
      swal.fire({
        icon: 'error',
        title: `${message}`,
        confirmButtonText: 'Cerrar',
      })
    }
  }

}
