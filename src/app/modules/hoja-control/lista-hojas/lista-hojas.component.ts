import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {HojaControlService} from '@data/services/api/hoja-control.service';
import { IHojaControlTmp } from '@data/interfaces/i-hoja-control-tmp';


@Component({
  selector: 'app-lista-hojas',
  templateUrl: './lista-hojas.component.html',
  styleUrls: ['./lista-hojas.component.scss']
})
export class ListaHojasComponent implements OnInit {

  hojaDetalleList: IHojaControlTmp[] = [];

  constructor(
    private router: Router,
    private toastr: ToastrService,
    public service: HojaControlService
  ) { }

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList(): void {
    this.service.getHojasControlList().subscribe( res => {

      this.hojaDetalleList = res.data as IHojaControlTmp[];
    });
  }

  openForEdit(hojaControlId: number): void {
    this.router.navigate(['/hoja-de-control/hoja-control/edit/' + hojaControlId]);
  }


  onHojaControlDelete(hojaControlId: number): void {
    // TODO: por hacer borrar la ficha tecnica
  }
}
