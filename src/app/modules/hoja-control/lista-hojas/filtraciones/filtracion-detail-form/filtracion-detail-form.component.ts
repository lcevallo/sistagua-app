import { Component, OnInit } from '@angular/core';
import {FiltracionDetail} from '@data/schema/filtracion-detail.model';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {FiltracionDetailService} from '@data/services/api/filtracion-detail.service';
import { IFiltraciones } from '@data/interfaces/ifiltraciones';

@Component({
  selector: 'app-filtracion-detail-form',
  templateUrl: './filtracion-detail-form.component.html',
  styleUrls: ['./filtracion-detail-form.component.scss']
})
export class FiltracionDetailFormComponent implements OnInit {

  listaSelect: IFiltraciones[] = [];

  constructor(public service: FiltracionDetailService,
              private toastr: ToastrService) { }

  ngOnInit(): void {

    this.service.obtenerListaFiltraciones().subscribe(response=>{
      this.listaSelect= response.data as IFiltraciones[] ;
    });

  }

  onSubmit(form: NgForm){
    console.log(form.value);
    if(this.service.formData.id === 0){
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


    if (this.service.formData.fk_hoja_control_detalle === undefined) {

      filtracionItem.fk_hoja_control_detalle=this.service.itemIndex;
      filtracionItem.sinHojaControlDetalle=true;
      if (this.service.list[this.service.itemIndex] === undefined) {
        this.service.list[this.service.itemIndex]=[];
      }
      this.service.list[this.service.itemIndex].push(filtracionItem);

    }
    else{

      this.service.itemIndex=this.service.formData.fk_hoja_control_detalle-1;

      if (this.service.list[this.service.itemIndex] === undefined) {
        this.service.list[this.service.itemIndex]= [];
      }

      this.service.list[this.service.itemIndex].push(filtracionItem);

    }

    this.resetForm(form);
  }
//#blue

  updateRecord(form: NgForm) {

  }


  resetForm(form: NgForm): void {

    form.form.reset();
    console.log(form.value);
    let fk_hcd= this.service.formData.fk_hoja_control_detalle;
    this.service.formData = new FiltracionDetail();
    this.service.formData.fk_hoja_control_detalle=fk_hcd;
  }

  onDelete(id: number){
    //TODO: Aqui debo de borrar
  }

}
