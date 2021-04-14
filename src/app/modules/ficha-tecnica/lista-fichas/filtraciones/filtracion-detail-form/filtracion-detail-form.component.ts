import { Component, OnInit } from '@angular/core';
import { FiltracionDetailService } from '@data/services/api/filtracion-detail.service';
import { NgForm } from '@angular/forms';
import { FiltracionDetail } from '@data/schema/filtracion-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-filtracion-detail-form',
  templateUrl: './filtracion-detail-form.component.html',
  styleUrls: ['./filtracion-detail-form.component.scss']
})
export class FiltracionDetailFormComponent implements OnInit {

  constructor(public service: FiltracionDetailService,
    private toastr:ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    if(this.service.formData.id == 0){
      this.insertRecord(form);
    }
    else{
      this.updateRecord(form);
    }

  }

  insertRecord(form: NgForm){


  }

  
  updateRecord(form: NgForm) {

  }


  resetForm(form: NgForm){

    form.form.reset();
    this.service.formData = new FiltracionDetail();
  }

  onDelete(id: number){
    //TODO: Aqui debo de borrar
  }

}
