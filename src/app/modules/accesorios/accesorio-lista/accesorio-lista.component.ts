import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IAccesorios } from '@data/interfaces/i-accesorios';
import { AccesoriosService } from '@data/services/api/accesorios.service';

@Component({
  selector: 'app-accesorio-lista',
  templateUrl: './accesorio-lista.component.html',
  styleUrls: ['./accesorio-lista.component.scss']
})
export class AccesorioListaComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'descripcion', 'acciones'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource!: MatTableDataSource<IAccesorios>;

  constructor(private accesorioServices: AccesoriosService) { }

  ngOnInit(): void {
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
            console.log(r.error);
          }
        });
  }
  nuevo() {}
}
