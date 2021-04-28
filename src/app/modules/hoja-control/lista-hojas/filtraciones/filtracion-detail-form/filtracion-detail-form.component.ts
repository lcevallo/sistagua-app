import { Component, OnInit } from '@angular/core';
import {FiltracionDetail} from '@data/schema/filtracion-detail.model';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {FiltracionDetailService} from '@data/services/api/filtracion-detail.service';

@Component({
  selector: 'app-filtracion-detail-form',
  templateUrl: './filtracion-detail-form.component.html',
  styleUrls: ['./filtracion-detail-form.component.scss']
})
export class FiltracionDetailFormComponent implements OnInit {

  constructor(public service: FiltracionDetailService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
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

    console.log(filtracionItem);
    console.log(form.value);



    if (this.service.list[this.service.itemIndex]) {

      this.service.list[this.service.itemIndex].push(filtracionItem)
    }
    else{
      this.service.list[this.service.itemIndex]= [];
      this.service.list[this.service.itemIndex].push(filtracionItem)
    }
    console.log(this.service.list)


  }
//#blue

  updateRecord(form: NgForm) {

  }


  resetForm(form: NgForm): void {

    form.form.reset();
    this.service.formData = new FiltracionDetail();
  }

  onDelete(id: number){
    //TODO: Aqui debo de borrar
  }

}
