import { Component, Input, OnInit } from '@angular/core';
import { IAccesorios } from '@data/interfaces/i-accesorios';
import {ToastrService} from 'ngx-toastr';
import { HojaControlService } from '@data/services/api/hoja-control.service';
import { NgForm } from '@angular/forms';
import { AccesorioDetailService } from '@data/services/api/accesorio-detail.service';
import { AccesorioDetail } from '@data/schema/accesorio-detail.model';

@Component({
  selector: 'app-accesorios-detail-form',
  templateUrl: './accesorios-detail-form.component.html',
  styleUrls: ['./accesorios-detail-form.component.scss']
})
export class AccesoriosDetailFormComponent implements OnInit {

  listaSelect: IAccesorios[] = [];
  @Input() data : any;

  constructor(
    public service: AccesorioDetailService,
    public hjservice: HojaControlService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.service.obtenerListaAccesorios().subscribe(response=>{
      this.listaSelect= response.data as IAccesorios[] ;
    });
  }


  onSubmit(form: NgForm){

    if(this.service.arrayId === -1){

      this.insertRecord(form);
    }
    else{

      this.updateRecord(form);
    }
  }


  resetForm(form: NgForm): void {

    form.form.reset();
    let fk_hcd= this.service.formData.fk_hoja_control_detalle;
    this.service.formData = new AccesorioDetail();
    this.service.formData.fk_hoja_control_detalle=fk_hcd;
    this.service.arrayId=-1;
  }

  insertRecord(form: NgForm){

    const accesorioItem = new AccesorioDetail();
    accesorioItem.fk_hoja_control_detalle=this.service.formData.fk_hoja_control_detalle;
    accesorioItem.fk_accesorio= form.value.fk_accesorio;
    accesorioItem.cantidad=form.value.cantidad;
    accesorioItem.descripcion=form.value.descripcion;


    if (this.data.hojaControlDetalleId === undefined) {
      accesorioItem.sinHojaControlDetalle=true;
    }
    // Si es que esta indefinido lo inicializo al arreglo
    if (this.hjservice.hojaControlItems[this.data.detalleItemIndex].accesorios_list === undefined) {
      this.hjservice.hojaControlItems[this.data.detalleItemIndex].accesorios_list=[];
    }


    this.hjservice.hojaControlItems[this.data.detalleItemIndex].accesorios_list?.push(accesorioItem);
    this.resetForm(form);
  }

  updateRecord(form: NgForm){

    const accesorioItem = new AccesorioDetail();
    accesorioItem.fk_hoja_control_detalle=this.service.formData.fk_hoja_control_detalle;
    accesorioItem.fk_accesorio= form.value.fk_accesorio;
    accesorioItem.cantidad=form.value.cantidad;
    accesorioItem.descripcion=form.value.descripcion;

    if (this.data.hojaControlDetalleId === undefined) {
      accesorioItem.sinHojaControlDetalle=true;
    }

    this.hjservice.hojaControlItems[this.data.detalleItemIndex].accesorios_list[this.service.arrayId]=accesorioItem;


    this.resetForm(form);
  }

}
