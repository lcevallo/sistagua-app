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

  insertRecord(form: NgForm): void{


  }


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
