import { Component, OnInit } from '@angular/core';
import {FiltracionDetail} from '@data/schema/filtracion-detail.model';
import {FiltracionDetailService} from '@data/services/api/filtracion-detail.service';

@Component({
  selector: 'app-filtraciones',
  templateUrl: './filtraciones.component.html',
  styleUrls: ['./filtraciones.component.scss']
})
export class FiltracionesComponent implements OnInit {

  constructor(public service: FiltracionDetailService) { }

  ngOnInit(): void {
    this.service.refreshList();
  }

  populateForm(selectedRecord: FiltracionDetail): void  {
    this.service.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id: number){


  }

}
