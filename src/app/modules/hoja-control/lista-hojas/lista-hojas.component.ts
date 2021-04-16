import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {HojaControlService} from '@data/services/api/hoja-control.service';

@Component({
  selector: 'app-lista-hojas',
  templateUrl: './lista-hojas.component.html',
  styleUrls: ['./lista-hojas.component.scss']
})
export class ListaHojasComponent implements OnInit {

  hojaDetalleList = [];

  constructor(
    private router: Router,
    private toastr: ToastrService,
    public service: HojaControlService
  ) { }

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList(): void {
    this.service.getHojasControlList().then( res => {
      console.log(res);
      this.hojaDetalleList = res['fichas_tecnicas'];
    });
  }

  openForEdit(hojaControlId: number): void {
    this.router.navigate(['/hoja-de-control/hoja-control/edit/' + hojaControlId]);
  }


  onHojaControlDelete(hojaControlId: number): void {
    // TODO: por hacer borrar la ficha tecnica
  }
}
