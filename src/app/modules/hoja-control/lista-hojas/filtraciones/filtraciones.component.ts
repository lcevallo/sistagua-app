import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FiltracionDetail} from '@data/schema/filtracion-detail.model';
import {FiltracionDetailService} from '@data/services/api/filtracion-detail.service';

@Component({
  selector: 'app-filtraciones',
  templateUrl: './filtraciones.component.html',
  styleUrls: ['./filtraciones.component.scss']
})
export class FiltracionesComponent implements OnInit {


  /**
   *
   * @param data : Que tiene
   * detalleItemIndex: Que es el indice del array
   * hojaControlDetalleId: Que es la fk de hoja control detall item
   * hojaControlId: que es el id de toda la hoja de control
   *
   * @param dialogRef
   * @param service
   */
  //#blue
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FiltracionesComponent>,
    public service: FiltracionDetailService) { }
  ngOnInit(): void {
    this.service.formData.fk_hoja_control_detalle=this.data.hojaControlDetalleId;
    this.service.itemIndex=this.data.detalleItemIndex;
    this.service.refreshList();
  }
//#blue

  populateForm(selectedRecord: FiltracionDetail): void  {
    this.service.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id: number){


  }

}
