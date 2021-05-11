import { Component, Input, OnInit } from '@angular/core';
import {FiltracionDetail} from '@data/schema/filtracion-detail.model';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {FiltracionDetailService} from '@data/services/api/filtracion-detail.service';
import { IFiltraciones } from '@data/interfaces/ifiltraciones';
import { HojaControlService } from '@data/services/api/hoja-control.service';

@Component({
  selector: 'app-filtracion-detail-form',
  templateUrl: './filtracion-detail-form.component.html',
  styleUrls: ['./filtracion-detail-form.component.scss']
})
export class FiltracionDetailFormComponent implements OnInit {

  listaSelect: IFiltraciones[] = [];
  @Input() data : any;


  constructor(public service: FiltracionDetailService,
              public hjservice: HojaControlService,
              private toastr: ToastrService) { }

  ngOnInit(): void {

    this.service.obtenerListaFiltraciones().subscribe(response=>{
      this.listaSelect= response.data as IFiltraciones[] ;
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

  //#blue
  insertRecord(form: NgForm): void{

    const filtracionItem = new FiltracionDetail();
    filtracionItem.fk_hoja_control_detalle=this.service.formData.fk_hoja_control_detalle;
    filtracionItem.fk_filtracion= form.value.fk_filtracion;
    filtracionItem.cantidad=form.value.cantidad;
    filtracionItem.descripcion=form.value.descripcion;


    if (this.data.hojaControlDetalleId === undefined) {
      filtracionItem.sinHojaControlDetalle=true;
    }
    // Si es que esta indefinido lo inicializo al arreglo
    if (this.hjservice.hojaControlItems[this.data.detalleItemIndex].filtraciones_list === undefined) {
      this.hjservice.hojaControlItems[this.data.detalleItemIndex].filtraciones_list=[];
    }


    this.hjservice.hojaControlItems[this.data.detalleItemIndex].filtraciones_list?.push(filtracionItem);

    this.resetForm(form);
  }
//#blue

  updateRecord(form: NgForm) {
    const filtracionItem = new FiltracionDetail();
    filtracionItem.fk_hoja_control_detalle=this.service.formData.fk_hoja_control_detalle;
    filtracionItem.fk_filtracion= form.value.fk_filtracion;
    filtracionItem.cantidad=form.value.cantidad;
    filtracionItem.descripcion=form.value.descripcion;


    if (this.data.hojaControlDetalleId === undefined) {
      filtracionItem.sinHojaControlDetalle=true;
    }

    this.hjservice.hojaControlItems[this.data.detalleItemIndex].filtraciones_list[this.service.arrayId]=filtracionItem;


    this.resetForm(form);

  }


  resetForm(form: NgForm): void {

    form.form.reset();
    let fk_hcd= this.service.formData.fk_hoja_control_detalle;
    this.service.formData = new FiltracionDetail();
    this.service.formData.fk_hoja_control_detalle=fk_hcd;
    this.service.arrayId=-1;



  }

  onDelete(id: number){
    //TODO: Aqui debo de borrar
  }

}
